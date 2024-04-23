import { EACH_IS_ANIMATED, EACH_IS_CONTROLLED } from '../../constants.js';
import { run_all } from '../common.js';
import {
	AWAIT_BLOCK,
	DYNAMIC_COMPONENT_BLOCK,
	EACH_BLOCK,
	EACH_ITEM_BLOCK,
	IF_BLOCK,
	KEY_BLOCK,
	ROOT_BLOCK
} from './block.js';
import { destroy_each_item_block, get_first_element } from './each.js';
import { append_child } from './operations.js';
import { empty } from './render.js';
import {
	current_block,
	current_effect,
	destroy_signal,
	effect,
	execute_effect,
	managed_effect,
	managed_pre_effect,
	mark_subtree_inert,
	schedule_task,
	untrack
} from './runtime.js';
import { raf } from './timing.js';

const active_tick_animations = new Set();
const DELAY_NEXT_TICK = Number.MIN_SAFE_INTEGER;

/** @type {undefined | number} */
let active_tick_ref = undefined;

/**
 * @template T
 * @param {string} type
 * @param {T} [detail]
 * @param {any}params_0
 * @returns {Event}
 */
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
	const e = document.createEvent('CustomEvent');
	e.initCustomEvent(type, bubbles, cancelable, detail);
	return e;
}

/**
 * @param {HTMLElement} dom
 * @param {'introstart' | 'introend' | 'outrostart' | 'outroend'} type
 * @returns {void}
 */
function dispatch_event(dom, type) {
	dom.dispatchEvent(custom_event(type));
}

/**
 * @param {string} style
 * @returns {string}
 */
function css_style_from_camel_case(style) {
	const parts = style.split('-');
	if (parts.length === 1) return parts[0];
	return (
		parts[0] +
		parts
			.slice(1)
			.map(/** @param {any} word */ (word) => word[0].toUpperCase() + word.slice(1))
			.join('')
	);
}

/**
 * @param {string} css
 * @returns {Keyframe}
 */
function css_to_keyframe(css) {
	/** @type {Keyframe} */
	const keyframe = {};
	const parts = css.split(';');
	for (const part of parts) {
		const [property, value] = part.split(':');
		if (!property || value === undefined) break;

		const formatted_property = css_style_from_camel_case(property.trim());
		keyframe[formatted_property] = value.trim();
	}
	return keyframe;
}

class TickAnimation {
	/** @type {null | (() => void)} */
	onfinish;

	/** @type {(t: number, u: number) => string} */
	#tick_fn;

	/** @type {number} */
	#duration;

	/** @type {number} */
	#current;

	/** @type {number} */
	#delay;

	/** @type {number} */
	#previous;

	/** @type {boolean} */
	paused;

	/** @type {boolean} */
	#reversed;

	/** @type {number} */
	#delay_current;

	/** @type {boolean} */
	#delayed_reverse;

	/**
	 * @param {(t: number, u: number) => string} tick_fn
	 * @param {number} duration
	 * @param {number} delay
	 * @param {boolean} out
	 */
	constructor(tick_fn, duration, delay, out) {
		this.#duration = duration;
		this.#delay = delay;
		this.paused = false;
		this.#tick_fn = tick_fn;
		this.#reversed = out;
		this.#delay_current = delay;
		this.#current = out ? duration : 0;
		this.#previous = 0;
		this.#delayed_reverse = false;
		this.onfinish = null;
		if (this.#delay) {
			if (!out) {
				this.#tick_fn(0, 1);
			}
		}
	}

	pause() {
		this.paused = true;
	}

	play() {
		this.paused = false;
		if (!active_tick_animations.has(this)) {
			this.#previous = raf.now();
			if (active_tick_ref === undefined) {
				active_tick_ref = raf.tick(handle_raf);
			}
			active_tick_animations.add(this);
		}
	}

	#reverse() {
		this.#reversed = !this.#reversed;
		if (this.paused) {
			if (this.#current === 0) {
				this.#current = this.#duration;
			}
			this.play();
		}
	}

	reverse() {
		if (this.#delay === 0) {
			this.#reverse();
		} else {
			this.#delay_current = this.#delay;
			this.#delayed_reverse = true;
		}
	}

	cancel() {
		active_tick_animations.delete(this);
		const current = this.#current / this.#duration;
		if (current > 0 && current < 1) {
			const t = this.#reversed ? 1 : 0;
			this.#tick_fn(t, 1 - t);
		}
	}

	finish() {
		active_tick_animations.delete(this);
		if (this.onfinish) {
			this.onfinish();
		}
	}

	/** @param {number} time */
	_update(time) {
		let diff = time - this.#previous;
		this.#previous = time;
		if (this.#delay_current !== 0) {
			const is_delayed = this.#delay_current === DELAY_NEXT_TICK;
			let cancel = !this.#delayed_reverse;
			this.#delay_current -= diff;
			if (this.#delay_current < 0 || is_delayed || (this.#delay_current === 0 && this.#reversed)) {
				const delay_diff = is_delayed ? 0 : -this.#delay_current;
				this.#delay_current = 0;

				if (this.#delayed_reverse) {
					this.#delayed_reverse = false;
					this.#reverse();
				} else if (delay_diff !== 0 || this.#reversed) {
					diff = delay_diff;
				}
				cancel = false;
			} else if (this.#delay_current === 0) {
				this.#delay_current = DELAY_NEXT_TICK;
			}
			if (cancel) {
				return;
			}
		}
		this.#current += this.#reversed ? -diff : diff;
		let t = this.#current / this.#duration;

		if (t < 0) {
			t = 0;
		} else if (t > 1) {
			t = 1;
		}

		if ((this.#reversed && t <= 0) || (!this.#reversed && t >= 1)) {
			t = this.#reversed ? 0 : 1;
			if (this.#delay_current === 0) {
				active_tick_animations.delete(this);
				if (this.onfinish) {
					this.paused = true;
					this.onfinish();
				}
			}
		}
		this.#tick_fn(t, 1 - t);
	}
}

/** @param {number} time */
function handle_raf(time) {
	for (const animation of active_tick_animations) {
		if (!animation.paused) {
			animation._update(time);
		}
	}
	if (active_tick_animations.size !== 0) {
		active_tick_ref = raf.tick(handle_raf);
	} else {
		active_tick_ref = undefined;
	}
}

/**
 * @param {HTMLElement} dom
 * @param {() => import('./types.js').TransitionPayload} init
 * @param {'in' | 'out' | 'both' | 'key'} direction
 * @param {import('./types.js').EffectSignal} effect
 * @returns {import('./types.js').Transition}
 */
function create_transition(dom, init, direction, effect) {
	let curr_direction = 'in';

	/** @type {Array<() => void>} */
	let subs = [];

	/** @type {null | Animation | TickAnimation} */
	let animation = null;
	let cancelled = false;

	const create_animation = () => {
		let payload = /** @type {import('./types.js').TransitionPayload} */ (transition.p);
		if (typeof payload === 'function') {
			// @ts-ignore
			payload = payload({ direction: curr_direction });
		}
		const duration = payload.duration ?? 300;
		const delay = payload.delay ?? 0;
		const css_fn = payload.css;
		const tick_fn = payload.tick;

		/** @param {number} t */
		const linear = (t) => t;
		const easing_fn = payload.easing || linear;

		/** @type {Keyframe[]} */
		const keyframes = [];

		if (typeof tick_fn === 'function') {
			animation = new TickAnimation(tick_fn, duration, delay, direction === 'out');
		} else {
			if (typeof css_fn === 'function') {
				// We need at least two frames
				const frame_time = 16.666;
				const max_duration = Math.max(duration, frame_time);
				// Have a keyframe every fame for 60 FPS
				for (let i = 0; i <= max_duration; i += frame_time) {
					let time;
					if (i + frame_time > max_duration) {
						time = 1;
					} else if (i === 0) {
						time = 0;
					} else {
						time = i / max_duration;
					}
					const t = easing_fn(time);
					keyframes.push(css_to_keyframe(css_fn(t, 1 - t)));
				}
				if (direction === 'out') {
					keyframes.reverse();
				}
			}
			animation = dom.animate(keyframes, {
				duration,
				endDelay: delay,
				delay,
				fill: 'both'
			});
		}
		animation.pause();

		animation.onfinish = () => {
			const is_outro = curr_direction === 'out';
			/** @type {Animation | TickAnimation} */ (animation).cancel();
			if (is_outro) {
				run_all(subs);
				subs = [];
			}
			dispatch_event(dom, is_outro ? 'outroend' : 'introend');
		};
	};

	/** @type {import('./types.js').Transition} */
	const transition = {
		e: effect,
		i: init,
		// payload
		p: null,

		// finished
		/** @param {() => void} fn */
		f(fn) {
			subs.push(fn);
		},
		in() {
			const needs_reverse = curr_direction !== 'in';
			curr_direction = 'in';
			if (animation === null || cancelled) {
				cancelled = false;
				create_animation();
			}
			dispatch_event(dom, 'introstart');
			if (needs_reverse) {
				/** @type {Animation | TickAnimation} */ (animation).reverse();
			}
			/** @type {Animation | TickAnimation} */ (animation).play();
		},
		// out
		o() {
			const needs_reverse = direction === 'both' && curr_direction !== 'out';
			curr_direction = 'out';
			if (animation === null || cancelled) {
				cancelled = false;
				create_animation();
			}
			dispatch_event(dom, 'outrostart');
			if (needs_reverse) {
				/** @type {Animation | TickAnimation} */ (animation).reverse();
			} else {
				/** @type {Animation | TickAnimation} */ (animation).play();
			}
		},
		// cancel
		c() {
			if (animation !== null) {
				/** @type {Animation | TickAnimation} */ (animation).cancel();
			}
			cancelled = true;
		},
		// cleanup
		x() {
			run_all(subs);
			subs = [];
		},
		r: direction,
		d: dom
	};
	return transition;
}

/**
 * @param {import('./types.js').Block} block
 * @returns {boolean}
 */
function is_transition_block(block) {
	const type = block.t;
	return (
		type === IF_BLOCK ||
		type === EACH_ITEM_BLOCK ||
		type === KEY_BLOCK ||
		type === AWAIT_BLOCK ||
		type === DYNAMIC_COMPONENT_BLOCK ||
		(type === EACH_BLOCK && block.v.length === 0)
	);
}

/**
 * @template P
 * @param {HTMLElement} dom
 * @param {() => import('./types.js').TransitionFn<P | undefined> | import('./types.js').AnimateFn<P | undefined>} get_transition_fn
 * @param {(() => P) | null} props_fn
 * @param {'in' | 'out' | 'both' | 'key'} direction
 * @param {boolean} global
 * @returns {void}
 */
export function bind_transition(dom, get_transition_fn, props_fn, direction, global) {
	const transition_effect = /** @type {import('./types.js').EffectSignal} */ (current_effect);
	const block = current_block;
	const props = props_fn === null ? {} : props_fn();

	let can_show_intro_on_mount = true;
	let can_apply_lazy_transitions = false;

	/** @type {import('./types.js').Block | null} */
	let transition_block = block;
	while (transition_block !== null) {
		if (is_transition_block(transition_block)) {
			if (transition_block.t === EACH_ITEM_BLOCK) {
				// Lazily apply the each block transition
				transition_block.r = each_item_transition;
				transition_block.a = each_item_animate;
				transition_block = transition_block.p;
			} else if (transition_block.t === AWAIT_BLOCK && transition_block.n /* pending */) {
				can_show_intro_on_mount = false;
			} else if (transition_block.t === IF_BLOCK) {
				transition_block.r = if_block_transition;
			}
			if (!can_apply_lazy_transitions && can_show_intro_on_mount) {
				can_show_intro_on_mount = transition_block.e === null;
			}
			if (!can_show_intro_on_mount || !global) {
				can_apply_lazy_transitions = true;
			}
		} else if (
			!can_apply_lazy_transitions &&
			transition_block.t === ROOT_BLOCK &&
			(transition_block.e !== null || transition_block.i)
		) {
			can_show_intro_on_mount = false;
		}
		transition_block = transition_block.p;
	}

	/** @type {import('./types.js').Transition} */
	let transition;

	effect(() => {
		if (transition !== undefined) {
			// Destroy any existing transitions first
			transition.x();
		}
		const transition_fn = get_transition_fn();
		/** @param {DOMRect} [from] */
		const init = (from) =>
			untrack(() =>
				direction === 'key'
					? /** @type {import('./types.js').AnimateFn<any>} */ (transition_fn)(
							dom,
							{ from: /** @type {DOMRect} */ (from), to: dom.getBoundingClientRect() },
							props,
							{}
					  )
					: /** @type {import('./types.js').TransitionFn<any>} */ (transition_fn)(dom, props, {
							direction
					  })
			);

		transition = create_transition(dom, init, direction, transition_effect);
		const is_intro = direction === 'in';
		const show_intro = !can_show_intro_on_mount && (is_intro || direction === 'both');

		if (show_intro) {
			transition.p = transition.i();
		}

		const effect = managed_pre_effect(() => {
			destroy_signal(effect);
			dom.inert = false;

			if (show_intro) {
				transition.in();
			}

			/** @type {import('./types.js').Block | null} */
			let transition_block = block;
			while (!is_intro && transition_block !== null) {
				const parent = transition_block.p;
				if (is_transition_block(transition_block)) {
					if (transition_block.r !== null) {
						transition_block.r(transition);
					}
					if (
						parent === null ||
						(!global && (transition_block.t !== IF_BLOCK || parent.t !== IF_BLOCK || parent.v))
					) {
						break;
					}
				}
				transition_block = parent;
			}
		}, false);
	});

	if (direction === 'key') {
		effect(() => {
			return () => {
				transition.x();
			};
		});
	}
}

/**
 * @param {Set<import('./types.js').Transition>} transitions
 * @param {'in' | 'out' | 'key'} target_direction
 * @param {DOMRect} [from]
 * @returns {void}
 */
export function trigger_transitions(transitions, target_direction, from) {
	/** @type {Array<() => void>} */
	const outros = [];
	for (const transition of transitions) {
		const direction = transition.r;
		if (target_direction === 'in') {
			if (direction === 'in' || direction === 'both') {
				transition.in();
			} else {
				transition.c();
			}
			transition.d.inert = false;
			mark_subtree_inert(transition.e, false);
		} else if (target_direction === 'key') {
			if (direction === 'key') {
				transition.p = transition.i(/** @type {DOMRect} */ (from));
				transition.in();
			}
		} else {
			if (direction === 'out' || direction === 'both') {
				transition.p = transition.i();
				outros.push(transition.o);
			}
			transition.d.inert = true;
			mark_subtree_inert(transition.e, true);
		}
	}
	if (outros.length > 0) {
		// Defer the outros to a microtask
		const e = managed_pre_effect(() => {
			destroy_signal(e);
			const e2 = managed_effect(() => {
				destroy_signal(e2);
				run_all(outros);
			});
		}, false);
	}
}

/**
 * @this {import('./types.js').IfBlock}
 * @param {import('./types.js').Transition} transition
 * @returns {void}
 */
function if_block_transition(transition) {
	const block = this;
	// block.value === true
	if (block.v) {
		let consequent_transitions = block.c;
		if (consequent_transitions === null) {
			consequent_transitions = block.c = new Set();
		}
		consequent_transitions.add(transition);
		transition.f(() => {
			const c = /** @type {Set<import('./types.js').Transition>} */ (consequent_transitions);
			c.delete(transition);
			if (c.size === 0) {
				execute_effect(/** @type {import('./types.js').EffectSignal} */ (block.ce));
			}
		});
	} else {
		let alternate_transitions = block.a;
		if (alternate_transitions === null) {
			alternate_transitions = block.a = new Set();
		}
		alternate_transitions.add(transition);
		transition.f(() => {
			const a = /** @type {Set<import('./types.js').Transition>} */ (alternate_transitions);
			a.delete(transition);
			if (a.size === 0) {
				execute_effect(/** @type {import('./types.js').EffectSignal} */ (block.ae));
			}
		});
	}
}

/**
 * @this {import('./types.js').EachItemBlock}
 * @param {import('./types.js').Transition} transition
 * @returns {void}
 */
function each_item_transition(transition) {
	const block = this;
	const each_block = block.p;
	const is_controlled = (each_block.f & EACH_IS_CONTROLLED) !== 0;
	// Disable optimization
	if (is_controlled) {
		const anchor = empty();
		each_block.f ^= EACH_IS_CONTROLLED;
		append_child(/** @type {Element} */ (each_block.a), anchor);
		each_block.a = anchor;
	}
	if (transition.r === 'key' && (each_block.f & EACH_IS_ANIMATED) === 0) {
		each_block.f |= EACH_IS_ANIMATED;
	}
	let transitions = block.s;
	if (transitions === null) {
		block.s = transitions = new Set();
	}
	transition.f(() => {
		if (transitions !== null) {
			transitions.delete(transition);
			if (transition.r !== 'key') {
				for (let other of transitions) {
					if (other.r === 'key' || other.r === 'in') {
						transitions.delete(other);
					}
				}
				if (transitions.size === 0) {
					block.s = null;
					destroy_each_item_block(block, null, true);
				}
			}
		}
	});
	transitions.add(transition);
}

/**
 *
 * @param {import('./types.js').EachItemBlock} block
 * @param {Set<import('./types.js').Transition>} transitions
 * @param {number} index
 * @param {boolean} index_is_reactive
 */
function each_item_animate(block, transitions, index, index_is_reactive) {
	let prev_index = block.i;
	if (index_is_reactive) {
		prev_index = /** @type {import('./types.js').Signal<number>} */ (prev_index).v;
	}
	const items = block.p.v;
	if (prev_index !== index && /** @type {number} */ (index) < items.length) {
		const from_dom = /** @type {Element} */ (get_first_element(block));
		const from = from_dom.getBoundingClientRect();
		// Cancel any existing key transitions
		for (const transition of transitions) {
			if (transition.r === 'key') {
				transition.c();
			}
		}
		schedule_task(() => {
			trigger_transitions(transitions, 'key', from);
		});
	}
}
