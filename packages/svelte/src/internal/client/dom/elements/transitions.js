import { noop } from '../../../shared/utils.js';
import { effect } from '../../reactivity/effects.js';
import { current_effect, untrack } from '../../runtime.js';
import { raf } from '../../timing.js';
import { loop } from '../../loop.js';
import { should_intro } from '../../render.js';
import { is_function } from '../../utils.js';
import { current_each_item } from '../blocks/each.js';
import { TRANSITION_GLOBAL, TRANSITION_IN, TRANSITION_OUT } from '../../../../constants.js';
import { BLOCK_EFFECT, EFFECT_RAN, EFFECT_TRANSPARENT } from '../../constants.js';

/**
 * @param {Element} element
 * @param {'introstart' | 'introend' | 'outrostart' | 'outroend'} type
 * @returns {void}
 */
function dispatch_event(element, type) {
	element.dispatchEvent(new CustomEvent(type));
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

/** @param {number} t */
const linear = (t) => t;

/**
 * Called inside keyed `{#each ...}` blocks (as `$.animation(...)`). This creates an animation manager
 * and attaches it to the block, so that moves can be animated following reconciliation.
 * @template P
 * @param {Element} element
 * @param {() => import('#client').AnimateFn<P | undefined>} get_fn
 * @param {(() => P) | null} get_params
 */
export function animation(element, get_fn, get_params) {
	var item = /** @type {import('#client').EachItem} */ (current_each_item);

	/** @type {DOMRect} */
	var from;

	/** @type {DOMRect} */
	var to;

	/** @type {import('#client').Animation | undefined} */
	var animation;

	/** @type {null | { position: string, width: string, height: string }} */
	var original_styles = null;

	item.a ??= {
		element,
		measure() {
			from = this.element.getBoundingClientRect();
		},
		apply() {
			animation?.abort();

			to = this.element.getBoundingClientRect();

			if (
				from.left !== to.left ||
				from.right !== to.right ||
				from.top !== to.top ||
				from.bottom !== to.bottom
			) {
				const options = get_fn()(this.element, { from, to }, get_params?.());

				animation = animate(this.element, options, undefined, 1, () => {
					animation?.abort();
					animation = undefined;
				});
			}
		},
		fix() {
			var computed_style = getComputedStyle(element);

			if (computed_style.position !== 'absolute' && computed_style.position !== 'fixed') {
				var style = /** @type {HTMLElement | SVGElement} */ (element).style;

				original_styles = {
					position: style.position,
					width: style.width,
					height: style.height
				};

				style.position = 'absolute';
				style.width = computed_style.width;
				style.height = computed_style.height;
				var to = element.getBoundingClientRect();

				if (from.left !== to.left || from.top !== to.top) {
					var transform = `translate(${from.left - to.left}px, ${from.top - to.top}px)`;
					style.transform = style.transform ? `${style.transform} ${transform}` : transform;
				}
			}
		},
		unfix() {
			if (original_styles) {
				var style = /** @type {HTMLElement | SVGElement} */ (element).style;

				style.position = original_styles.position;
				style.width = original_styles.width;
				style.height = original_styles.height;
			}
		}
	};

	// in the case of a `<svelte:element>`, it's possible for `$.animation(...)` to be called
	// when an animation manager already exists, if the tag changes. in that case, we need to
	// swap out the element rather than creating a new manager, in case it happened at the same
	// moment as a reconciliation
	item.a.element = element;
}

/**
 * Called inside block effects as `$.transition(...)`. This creates a transition manager and
 * attaches it to the current effect — later, inside `pause_effect` and `resume_effect`, we
 * use this to create `intro` and `outro` transitions.
 * @template P
 * @param {number} flags
 * @param {HTMLElement} element
 * @param {() => import('#client').TransitionFn<P | undefined>} get_fn
 * @param {(() => P) | null} get_params
 * @returns {void}
 */
export function transition(flags, element, get_fn, get_params) {
	var is_intro = (flags & TRANSITION_IN) !== 0;
	var is_outro = (flags & TRANSITION_OUT) !== 0;
	var is_global = (flags & TRANSITION_GLOBAL) !== 0;

	/** @type {'in' | 'out' | 'both'} */
	var direction = is_intro && is_outro ? 'both' : is_intro ? 'in' : 'out';

	/** @type {import('#client').AnimationConfig | ((opts: { direction: 'in' | 'out' }) => import('#client').AnimationConfig) | undefined} */
	var current_options;

	var inert = element.inert;

	/** @type {import('#client').Animation | undefined} */
	var intro;

	/** @type {import('#client').Animation | undefined} */
	var outro;

	/** @type {(() => void) | undefined} */
	var reset;

	function get_options() {
		// If a transition is still ongoing, we use the existing options rather than generating
		// new ones. This ensures that reversible transitions reverse smoothly, rather than
		// jumping to a new spot because (for example) a different `duration` was used
		return (current_options ??= get_fn()(element, get_params?.(), { direction }));
	}

	/** @type {import('#client').TransitionManager} */
	var transition = {
		is_global,
		in() {
			element.inert = inert;

			if (is_intro) {
				dispatch_event(element, 'introstart');
				intro = animate(element, get_options(), outro, 1, () => {
					dispatch_event(element, 'introend');
					intro = current_options = undefined;
				});
			} else {
				outro?.abort();
				reset?.();
			}
		},
		out(fn) {
			if (is_outro) {
				element.inert = true;

				dispatch_event(element, 'outrostart');
				outro = animate(element, get_options(), intro, 0, () => {
					dispatch_event(element, 'outroend');
					outro = current_options = undefined;
					fn?.();
				});

				// TODO arguably the outro should never null itself out until _all_ outros for this effect have completed...
				// in that case we wouldn't need to store `reset` separately
				reset = outro.reset;
			} else {
				fn?.();
			}
		},
		stop: () => {
			intro?.abort();
			outro?.abort();
		}
	};

	var e = /** @type {import('#client').Effect} */ (current_effect);

	(e.transitions ??= []).push(transition);

	// if this is a local transition, we only want to run it if the parent (branch) effect's
	// parent (block) effect is where the state change happened. we can determine that by
	// looking at whether the block effect is currently initializing
	if (is_intro && should_intro) {
		let run = is_global;

		if (!run) {
			var block = /** @type {import('#client').Effect | null} */ (e.parent);

			// skip over transparent blocks (e.g. snippets, else-if blocks)
			while (block && (block.f & EFFECT_TRANSPARENT) !== 0) {
				while ((block = block.parent)) {
					if ((block.f & BLOCK_EFFECT) !== 0) break;
				}
			}

			run = !block || (block.f & EFFECT_RAN) !== 0;
		}

		if (run) {
			effect(() => {
				untrack(() => transition.in());
			});
		}
	}
}

/**
 * Animates an element, according to the provided configuration
 * @param {Element} element
 * @param {import('#client').AnimationConfig | ((opts: { direction: 'in' | 'out' }) => import('#client').AnimationConfig)} options
 * @param {import('#client').Animation | undefined} counterpart The corresponding intro/outro to this outro/intro
 * @param {number} t2 The target `t` value — `1` for intro, `0` for outro
 * @param {(() => void) | undefined} callback
 * @returns {import('#client').Animation}
 */
function animate(element, options, counterpart, t2, callback) {
	if (is_function(options)) {
		// In the case of a deferred transition (such as `crossfade`), `option` will be
		// a function rather than an `AnimationConfig`. We need to call this function
		// once DOM has been updated...
		/** @type {import('#client').Animation} */
		var a;

		effect(() => {
			var o = untrack(() => options({ direction: t2 === 1 ? 'in' : 'out' }));
			a = animate(element, o, counterpart, t2, callback);
		});

		// ...but we want to do so without using `async`/`await` everywhere, so
		// we return a facade that allows everything to remain synchronous
		return {
			abort: () => a.abort(),
			deactivate: () => a.deactivate(),
			reset: () => a.reset(),
			t: (now) => a.t(now)
		};
	}

	counterpart?.deactivate();

	if (!options?.duration) {
		callback?.();
		return {
			abort: noop,
			deactivate: noop,
			reset: noop,
			t: () => t2
		};
	}

	var { delay = 0, duration, css, tick, easing = linear } = options;

	var start = raf.now() + delay;
	var t1 = counterpart?.t(start) ?? 1 - t2;
	var delta = t2 - t1;

	duration *= Math.abs(delta);
	var end = start + duration;

	/** @type {Animation} */
	var animation;

	/** @type {import('#client').Task} */
	var task;

	if (css) {
		// WAAPI
		var keyframes = [];
		var n = Math.ceil(duration / (1000 / 60)); // `n` must be an integer, or we risk missing the `t2` value

		for (var i = 0; i <= n; i += 1) {
			var t = t1 + delta * easing(i / n);
			var styles = css(t, 1 - t);
			keyframes.push(css_to_keyframe(styles));
		}

		animation = element.animate(keyframes, {
			delay,
			duration,
			easing: 'linear',
			fill: 'forwards'
		});

		animation.finished
			.then(() => {
				callback?.();

				if (t2 === 1) {
					animation.cancel();
				}
			})
			.catch((e) => {
				// Error for DOMException: The user aborted a request. This results in two things:
				// - startTime is `null`
				// - currentTime is `null`
				// We can't use the existence of an AbortError as this error and error code is shared
				// with other Web APIs such as fetch().

				if (animation.startTime !== null && animation.currentTime !== null) {
					throw e;
				}
			});
	} else {
		// Timer
		if (t1 === 0) {
			tick?.(0, 1); // TODO put in nested effect, to avoid interleaved reads/writes?
		}

		task = loop((now) => {
			if (now >= end) {
				tick?.(t2, 1 - t2);
				callback?.();
				return false;
			}

			if (now >= start) {
				var p = t1 + delta * easing((now - start) / duration);
				tick?.(p, 1 - p);
			}

			return true;
		});
	}

	return {
		abort: () => {
			animation?.cancel();
			task?.abort();
		},
		deactivate: () => {
			callback = undefined;
		},
		reset: () => {
			if (t2 === 0) {
				tick?.(1, 0);
			}
		},
		t: (now) => {
			var t = t1 + delta * easing((now - start) / duration);
			return Math.min(1, Math.max(0, t));
		}
	};
}
