import { DEV } from 'esm-env';
import { subscribe_to_store } from '../../store/utils.js';
import { EMPTY_FUNC, run_all } from '../common.js';
import { get_descriptor, get_descriptors, is_array } from './utils.js';
import {
	PROPS_IS_LAZY_INITIAL,
	PROPS_IS_IMMUTABLE,
	PROPS_IS_RUNES,
	PROPS_IS_UPDATED
} from '../../constants.js';
import { readonly } from './proxy/readonly.js';
import { proxy, unstate } from './proxy/proxy.js';

export const SOURCE = 1;
export const DERIVED = 1 << 1;
export const EFFECT = 1 << 2;
export const PRE_EFFECT = 1 << 3;
export const RENDER_EFFECT = 1 << 4;
const MANAGED = 1 << 6;
const UNOWNED = 1 << 7;
export const CLEAN = 1 << 8;
export const DIRTY = 1 << 9;
export const MAYBE_DIRTY = 1 << 10;
export const INERT = 1 << 11;
export const DESTROYED = 1 << 12;

const IS_EFFECT = EFFECT | PRE_EFFECT | RENDER_EFFECT;

const FLUSH_MICROTASK = 0;
const FLUSH_SYNC = 1;

export const UNINITIALIZED = Symbol();
export const LAZY_PROPERTY = Symbol();

// Used for controlling the flush of effects.
let current_scheduler_mode = FLUSH_MICROTASK;
// Used for handling scheduling
let is_micro_task_queued = false;
let is_task_queued = false;
// Used for $inspect
export let is_batching_effect = false;

// Handle effect queues

/** @type {import('./types.js').EffectSignal[]} */
let current_queued_pre_and_render_effects = [];

/** @type {import('./types.js').EffectSignal[]} */
let current_queued_effects = [];

/** @type {Array<() => void>} */
let current_queued_tasks = [];
let flush_count = 0;
// Handle signal reactivity tree dependencies and consumer

/** @type {null | import('./types.js').ComputationSignal} */
let current_consumer = null;

/** @type {null | import('./types.js').EffectSignal} */
export let current_effect = null;

/** @type {null | import('./types.js').Signal[]} */
let current_dependencies = null;
let current_dependencies_index = 0;
/** @type {null | import('./types.js').Signal[]} */
let current_untracked_writes = null;
/** @type {null | import('./types.js').Signal} */
let last_inspected_signal = null;
/** If `true`, `get`ting the signal should not register it as a dependency */
export let current_untracking = false;
/** Exists to opt out of the mutation validation for stores which may be set for the first time during a derivation */
let ignore_mutation_validation = false;

// If we are working with a get() chain that has no active container,
// to prevent memory leaks, we skip adding the consumer.
let current_skip_consumer = false;
// Handle collecting all signals which are read during a specific time frame
let is_signals_recorded = false;
let captured_signals = new Set();

/** @type {Function | null} */
let inspect_fn = null;

/** @type {Array<import('./types.js').SourceSignal & import('./types.js').SourceSignalDebug>} */
let inspect_captured_signals = [];

// Handle rendering tree blocks and anchors
/** @type {null | import('./types.js').Block} */
export let current_block = null;
// Handling runtime component context

/** @type {import('./types.js').ComponentContext | null} */
export let current_component_context = null;
export let is_ssr = false;

export let updating_derived = false;

/**
 * @param {boolean} ssr
 * @returns {void}
 */
export function set_is_ssr(ssr) {
	is_ssr = ssr;
}

/**
 * @param {null | import('./types.js').ComponentContext} context
 * @returns {boolean}
 */
function is_runes(context) {
	const component_context = context || current_component_context;
	return component_context !== null && component_context.r;
}

/**
 * @param {import("./proxy/proxy.js").StateObject} target
 * @param {string | symbol} prop
 * @param {any} receiver
 */
export function batch_inspect(target, prop, receiver) {
	const value = Reflect.get(target, prop, receiver);
	return function () {
		const previously_batching_effect = is_batching_effect;
		is_batching_effect = true;
		try {
			return Reflect.apply(value, receiver, arguments);
		} finally {
			is_batching_effect = previously_batching_effect;
			if (last_inspected_signal !== null) {
				// @ts-expect-error
				for (const fn of last_inspected_signal.inspect) fn();
				last_inspected_signal = null;
			}
		}
	};
}

/**
 * @param {null | import('./types.js').ComponentContext} context_stack_item
 * @returns {void}
 */
export function set_current_component_context(context_stack_item) {
	current_component_context = context_stack_item;
}

/**
 * @param {unknown} a
 * @param {unknown} b
 * @returns {boolean}
 */
export function default_equals(a, b) {
	return a === b;
}

/**
 * @template V
 * @param {import('./types.js').SignalFlags} flags
 * @param {V} value
 * @returns {import('./types.js').SourceSignal<V> | import('./types.js').SourceSignal<V> & import('./types.js').SourceSignalDebug}
 */
function create_source_signal(flags, value) {
	if (DEV) {
		return {
			// consumers
			c: null,
			// equals
			e: default_equals,
			// flags
			f: flags,
			// value
			v: value,
			// context: We can remove this if we get rid of beforeUpdate/afterUpdate
			x: null,
			// this is for DEV only
			inspect: new Set()
		};
	}
	return {
		// consumers
		c: null,
		// equals
		e: default_equals,
		// flags
		f: flags,
		// value
		v: value,
		// context: We can remove this if we get rid of beforeUpdate/afterUpdate
		x: null
	};
}

/**
 * @template V
 * @param {import('./types.js').SignalFlags} flags
 * @param {V} value
 * @param {import('./types.js').Block | null} block
 * @returns {import('./types.js').ComputationSignal<V> | import('./types.js').ComputationSignal<V> & import('./types.js').SourceSignalDebug}
 */
function create_computation_signal(flags, value, block) {
	if (DEV) {
		return {
			// block
			b: block,
			// consumers
			c: null,
			// destroy
			d: null,
			// equals
			e: null,
			// flags
			f: flags,
			// init
			i: null,
			// references
			r: null,
			// value
			v: value,
			// context: We can remove this if we get rid of beforeUpdate/afterUpdate
			x: null,
			// destroy
			y: null,
			// this is for DEV only
			inspect: new Set()
		};
	}

	return {
		// block
		b: block,
		// consumers
		c: null,
		// destroy
		d: null,
		// equals
		e: null,
		// flags
		f: flags,
		// init
		i: null,
		// references
		r: null,
		// value
		v: value,
		// context: We can remove this if we get rid of beforeUpdate/afterUpdate
		x: null,
		// destroy
		y: null
	};
}

/**
 * @param {import('./types.js').ComputationSignal} target_signal
 * @param {import('./types.js').ComputationSignal} ref_signal
 * @returns {void}
 */
function push_reference(target_signal, ref_signal) {
	const references = target_signal.r;
	if (references === null) {
		target_signal.r = [ref_signal];
	} else {
		references.push(ref_signal);
	}
}

/**
 * @template V
 * @param {import('./types.js').Signal<V>} signal
 * @returns {boolean}
 */
function is_signal_dirty(signal) {
	const flags = signal.f;
	if ((flags & DIRTY) !== 0 || signal.v === UNINITIALIZED) {
		return true;
	}
	if ((flags & MAYBE_DIRTY) !== 0) {
		const dependencies = /** @type {import('./types.js').ComputationSignal<V>} **/ (signal).d;
		if (dependencies !== null) {
			const length = dependencies.length;
			let i;
			for (i = 0; i < length; i++) {
				const dependency = dependencies[i];

				if ((dependency.f & MAYBE_DIRTY) !== 0 && !is_signal_dirty(dependency)) {
					set_signal_status(dependency, CLEAN);
					continue;
				}
				// The flags can be marked as dirty from the above is_signal_dirty call.
				if ((dependency.f & DIRTY) !== 0) {
					if ((dependency.f & DERIVED) !== 0) {
						update_derived(
							/** @type {import('./types.js').ComputationSignal<V>} **/ (dependency),
							true
						);
						// Might have been mutated from above get.
						if ((signal.f & DIRTY) !== 0) {
							return true;
						}
					} else {
						return true;
					}
				}
			}
		}
	}
	return false;
}

/**
 * @template V
 * @param {import('./types.js').ComputationSignal<V>} signal
 * @returns {V}
 */
function execute_signal_fn(signal) {
	const init = signal.i;
	const previous_dependencies = current_dependencies;
	const previous_dependencies_index = current_dependencies_index;
	const previous_untracked_writes = current_untracked_writes;
	const previous_consumer = current_consumer;
	const previous_block = current_block;
	const previous_component_context = current_component_context;
	const previous_skip_consumer = current_skip_consumer;
	const is_render_effect = (signal.f & RENDER_EFFECT) !== 0;
	const previous_untracking = current_untracking;
	current_dependencies = /** @type {null | import('./types.js').Signal[]} */ (null);
	current_dependencies_index = 0;
	current_untracked_writes = null;
	current_consumer = signal;
	current_block = signal.b;
	current_component_context = signal.x;
	current_skip_consumer = current_effect === null && (signal.f & UNOWNED) !== 0;
	current_untracking = false;

	// Render effects are invoked when the UI is about to be updated - run beforeUpdate at that point
	if (is_render_effect && current_component_context?.u != null) {
		// update_callbacks.execute()
		current_component_context.u.e();
	}

	try {
		let res;
		if (is_render_effect) {
			res = /** @type {(block: import('./types.js').Block) => V} */ (init)(
				/** @type {import('./types.js').Block} */ (signal.b)
			);
		} else {
			res = /** @type {() => V} */ (init)();
		}
		let dependencies = /** @type {import('./types.js').Signal<unknown>[]} **/ (signal.d);

		if (current_dependencies !== null) {
			let i;
			remove_consumer(signal, current_dependencies_index, false);

			if (dependencies !== null && current_dependencies_index > 0) {
				dependencies.length = current_dependencies_index + current_dependencies.length;
				for (i = 0; i < current_dependencies.length; i++) {
					dependencies[current_dependencies_index + i] = current_dependencies[i];
				}
			} else {
				signal.d = /** @type {import('./types.js').Signal<V>[]} **/ (
					dependencies = current_dependencies
				);
			}

			if (!current_skip_consumer) {
				for (i = current_dependencies_index; i < dependencies.length; i++) {
					const dependency = dependencies[i];

					if (dependency.c === null) {
						dependency.c = [signal];
					} else {
						dependency.c.push(signal);
					}
				}
			}
		} else if (dependencies !== null && current_dependencies_index < dependencies.length) {
			remove_consumer(signal, current_dependencies_index, false);
			dependencies.length = current_dependencies_index;
		}
		return res;
	} finally {
		current_dependencies = previous_dependencies;
		current_dependencies_index = previous_dependencies_index;
		current_untracked_writes = previous_untracked_writes;
		current_consumer = previous_consumer;
		current_block = previous_block;
		current_component_context = previous_component_context;
		current_skip_consumer = previous_skip_consumer;
		current_untracking = previous_untracking;
	}
}

/**
 * @template V
 * @param {import('./types.js').ComputationSignal<V>} signal
 * @param {number} start_index
 * @param {boolean} remove_unowned
 * @returns {void}
 */
function remove_consumer(signal, start_index, remove_unowned) {
	const dependencies = signal.d;
	if (dependencies !== null) {
		let i;
		for (i = start_index; i < dependencies.length; i++) {
			const dependency = dependencies[i];
			const consumers = dependency.c;
			let consumers_length = 0;
			if (consumers !== null) {
				consumers_length = consumers.length - 1;
				const index = consumers.indexOf(signal);
				if (index !== -1) {
					if (consumers_length === 0) {
						dependency.c = null;
					} else {
						// Swap with last element and then remove.
						consumers[index] = consumers[consumers_length];
						consumers.pop();
					}
				}
			}
			if (remove_unowned && consumers_length === 0 && (dependency.f & UNOWNED) !== 0) {
				// If the signal is unowned then we need to make sure to change it to dirty.
				set_signal_status(dependency, DIRTY);
				remove_consumer(
					/** @type {import('./types.js').ComputationSignal<V>} **/ (dependency),
					0,
					true
				);
			}
		}
	}
}

/**
 * @template V
 * @param {import('./types.js').ComputationSignal<V>} signal
 * @returns {void}
 */
function destroy_references(signal) {
	const references = signal.r;
	signal.r = null;
	if (references !== null) {
		let i;
		for (i = 0; i < references.length; i++) {
			const reference = references[i];
			if ((reference.f & IS_EFFECT) !== 0) {
				destroy_signal(reference);
			} else {
				remove_consumer(reference, 0, true);
				reference.d = null;
			}
		}
	}
}

/**
 * @param {import('./types.js').Block} block
 * @param {unknown} error
 * @returns {void}
 */
function report_error(block, error) {
	/** @type {import('./types.js').Block | null} */
	let current_block = block;

	if (current_block !== null) {
		throw error;
	}
}

/**
 * @param {import('./types.js').EffectSignal} signal
 * @returns {void}
 */
export function execute_effect(signal) {
	if ((signal.f & DESTROYED) !== 0) {
		return;
	}
	const teardown = signal.v;
	const previous_effect = current_effect;
	current_effect = signal;

	try {
		destroy_references(signal);
		if (teardown !== null) {
			teardown();
		}
		const possible_teardown = execute_signal_fn(signal);
		if (typeof possible_teardown === 'function') {
			signal.v = possible_teardown;
		}
	} catch (error) {
		const block = signal.b;
		if (block !== null) {
			report_error(block, error);
		} else {
			throw error;
		}
	} finally {
		current_effect = previous_effect;
	}
	const component_context = signal.x;
	if (
		is_runes(component_context) && // Don't rerun pre effects more than once to accomodate for "$: only runs once" behavior
		(signal.f & PRE_EFFECT) !== 0 &&
		current_queued_pre_and_render_effects.length > 0
	) {
		flush_local_pre_effects(component_context);
	}
}

function infinite_loop_guard() {
	if (flush_count > 100) {
		throw new Error(
			'ERR_SVELTE_TOO_MANY_UPDATES' +
				(DEV
					? ': Maximum update depth exceeded. This can happen when a reactive block or effect ' +
					  'repeatedly sets a new value. Svelte limits the number of nested updates to prevent infinite loops.'
					: '')
		);
	}
	flush_count++;
}

/**
 * @param {Array<import('./types.js').EffectSignal>} effects
 * @returns {void}
 */
function flush_queued_effects(effects) {
	const length = effects.length;
	if (length > 0) {
		infinite_loop_guard();
		let i;
		for (i = 0; i < length; i++) {
			const signal = effects[i];
			const flags = signal.f;
			if ((flags & (DESTROYED | INERT)) === 0) {
				if (is_signal_dirty(signal)) {
					set_signal_status(signal, CLEAN);
					execute_effect(signal);
				} else if ((flags & MAYBE_DIRTY) !== 0) {
					set_signal_status(signal, CLEAN);
				}
			}
		}
		effects.length = 0;
	}
}

function process_microtask() {
	is_micro_task_queued = false;
	if (flush_count > 101) {
		return;
	}
	const previous_queued_pre_and_render_effects = current_queued_pre_and_render_effects;
	const previous_queued_effects = current_queued_effects;
	current_queued_pre_and_render_effects = [];
	current_queued_effects = [];
	flush_queued_effects(previous_queued_pre_and_render_effects);
	flush_queued_effects(previous_queued_effects);
	if (!is_micro_task_queued) {
		flush_count = 0;
	}
}

/**
 * @param {import('./types.js').EffectSignal} signal
 * @param {boolean} sync
 * @returns {void}
 */
export function schedule_effect(signal, sync) {
	const flags = signal.f;
	if (sync) {
		execute_effect(signal);
		set_signal_status(signal, CLEAN);
	} else {
		if (current_scheduler_mode === FLUSH_MICROTASK) {
			if (!is_micro_task_queued) {
				is_micro_task_queued = true;
				queueMicrotask(process_microtask);
			}
		}
		if ((flags & EFFECT) !== 0) {
			current_queued_effects.push(signal);
		} else {
			current_queued_pre_and_render_effects.push(signal);
		}
	}
}

function process_task() {
	is_task_queued = false;
	const tasks = current_queued_tasks.slice();
	current_queued_tasks = [];
	run_all(tasks);
}

/**
 * @param {() => void} fn
 * @returns {void}
 */
export function schedule_task(fn) {
	if (!is_task_queued) {
		is_task_queued = true;
		setTimeout(process_task, 0);
	}
	current_queued_tasks.push(fn);
}

/**
 * @returns {void}
 */
export function flush_local_render_effects() {
	const effects = [];
	for (let i = 0; i < current_queued_pre_and_render_effects.length; i++) {
		const effect = current_queued_pre_and_render_effects[i];
		if ((effect.f & RENDER_EFFECT) !== 0 && effect.x === current_component_context) {
			effects.push(effect);
			current_queued_pre_and_render_effects.splice(i, 1);
			i--;
		}
	}
	flush_queued_effects(effects);
}

/**
 * @param {null | import('./types.js').ComponentContext} context
 * @returns {void}
 */
export function flush_local_pre_effects(context) {
	const effects = [];
	for (let i = 0; i < current_queued_pre_and_render_effects.length; i++) {
		const effect = current_queued_pre_and_render_effects[i];
		if ((effect.f & PRE_EFFECT) !== 0 && effect.x === context) {
			effects.push(effect);
			current_queued_pre_and_render_effects.splice(i, 1);
			i--;
		}
	}
	flush_queued_effects(effects);
}

/**
 * Synchronously flushes any pending state changes and those that result from it.
 * @param {() => void} [fn]
 * @returns {void}
 */
export function flushSync(fn) {
	const previous_scheduler_mode = current_scheduler_mode;
	const previous_queued_pre_and_render_effects = current_queued_pre_and_render_effects;
	const previous_queued_effects = current_queued_effects;
	try {
		infinite_loop_guard();
		/** @type {import('./types.js').EffectSignal[]} */
		const pre_and_render_effects = [];

		/** @type {import('./types.js').EffectSignal[]} */
		const effects = [];
		current_scheduler_mode = FLUSH_SYNC;
		current_queued_pre_and_render_effects = pre_and_render_effects;
		current_queued_effects = effects;
		flush_queued_effects(previous_queued_pre_and_render_effects);
		flush_queued_effects(previous_queued_effects);
		if (fn !== undefined) {
			fn();
		}
		if (current_queued_pre_and_render_effects.length > 0 || effects.length > 0) {
			flushSync();
		}
		if (is_task_queued) {
			process_task();
		}
		flush_count = 0;
	} finally {
		current_scheduler_mode = previous_scheduler_mode;
		current_queued_pre_and_render_effects = previous_queued_pre_and_render_effects;
		current_queued_effects = previous_queued_effects;
	}
}

/**
 * Returns a promise that resolves once any pending state changes have been applied.
 * @returns {Promise<void>}
 */
export async function tick() {
	await Promise.resolve();
	// By calling flushSync we guarantee that any pending state changes are applied after one tick.
	// TODO look into whether we can make flushing subsequent updates synchronously in the future.
	flushSync();
}

/**
 * @template V
 * @param {import('./types.js').ComputationSignal<V>} signal
 * @param {boolean} force_schedule
 * @returns {void}
 */
function update_derived(signal, force_schedule) {
	const previous_updating_derived = updating_derived;
	updating_derived = true;
	const value = execute_signal_fn(signal);
	updating_derived = previous_updating_derived;
	const status =
		current_skip_consumer || (current_effect === null && (signal.f & UNOWNED) !== 0)
			? DIRTY
			: CLEAN;
	set_signal_status(signal, status);
	const equals = /** @type {import('./types.js').EqualsFunctions} */ (signal.e);
	if (!equals(value, signal.v)) {
		signal.v = value;
		mark_signal_consumers(signal, DIRTY, force_schedule);

		// @ts-expect-error
		if (DEV && signal.inspect && force_schedule) {
			// @ts-expect-error
			for (const fn of signal.inspect) fn();
		}
	}
}

/**
 * Gets the current value of a store. If the store isn't subscribed to yet, it will create a proxy
 * signal that will be updated when the store is. The store references container is needed to
 * track reassignments to stores and to track the correct component context.
 * @template V
 * @param {import('./types.js').Store<V> | null | undefined} store
 * @param {string} store_name
 * @param {import('./types.js').StoreReferencesContainer} stores
 * @returns {V}
 */
export function store_get(store, store_name, stores) {
	/** @type {import('./types.js').StoreReferencesContainer[''] | undefined} */
	let entry = stores[store_name];
	const is_new = entry === undefined;

	if (is_new) {
		entry = {
			store: null,
			last_value: null,
			value: mutable_source(UNINITIALIZED),
			unsubscribe: EMPTY_FUNC
		};
		// TODO: can we remove this code? it was refactored out when we split up source/comptued signals
		// push_destroy_fn(entry.value, () => {
		// 	/** @type {import('./types.js').StoreReferencesContainer['']} */ (entry).last_value =
		// 		/** @type {import('./types.js').StoreReferencesContainer['']} */ (entry).value.value;
		// });
		stores[store_name] = entry;
	}

	if (is_new || entry.store !== store) {
		entry.unsubscribe();
		entry.store = store ?? null;
		entry.unsubscribe = connect_store_to_signal(store, entry.value);
	}

	const value = get(entry.value);
	// This could happen if the store was cleaned up because the component was destroyed and there's a leak on the user side.
	// In that case we don't want to fail with a cryptic Symbol error, but rather return the last value we got.
	return value === UNINITIALIZED ? entry.last_value : value;
}

/**
 * @template V
 * @param {import('./types.js').Store<V> | null | undefined} store
 * @param {import('./types.js').SourceSignal<V>} source
 */
function connect_store_to_signal(store, source) {
	if (store == null) {
		set(source, undefined);
		return EMPTY_FUNC;
	}

	/** @param {V} v */
	const run = (v) => {
		ignore_mutation_validation = true;
		set(source, v);
		ignore_mutation_validation = false;
	};
	return subscribe_to_store(store, run);
}

/**
 * Sets the new value of a store and returns that value.
 * @template V
 * @param {import('./types.js').Store<V>} store
 * @param {V} value
 * @returns {V}
 */
export function store_set(store, value) {
	store.set(value);
	return value;
}

/**
 * Unsubscribes from all auto-subscribed stores on destroy
 * @param {import('./types.js').StoreReferencesContainer} stores
 */
export function unsubscribe_on_destroy(stores) {
	onDestroy(() => {
		let store_name;
		for (store_name in stores) {
			const ref = stores[store_name];
			ref.unsubscribe();
			// TODO: can we remove this code? it was refactored out when we split up source/comptued signals
			// destroy_signal(ref.value);
		}
	});
}

/**
 * @template V
 * @param {import('./types.js').Signal<V>} signal
 * @returns {V}
 */
export function get(signal) {
	// @ts-expect-error
	if (DEV && signal.inspect && inspect_fn) {
		// @ts-expect-error
		signal.inspect.add(inspect_fn);
		// @ts-expect-error
		inspect_captured_signals.push(signal);
	}

	const flags = signal.f;
	if ((flags & DESTROYED) !== 0) {
		return signal.v;
	}

	if (is_signals_recorded) {
		captured_signals.add(signal);
	}

	// Register the dependency on the current consumer signal.
	if (current_consumer !== null && (current_consumer.f & MANAGED) === 0 && !current_untracking) {
		const unowned = (current_consumer.f & UNOWNED) !== 0;
		const dependencies = current_consumer.d;
		if (
			current_dependencies === null &&
			dependencies !== null &&
			dependencies[current_dependencies_index] === signal &&
			!(unowned && current_effect !== null)
		) {
			current_dependencies_index++;
		} else if (current_dependencies === null) {
			current_dependencies = [signal];
		} else if (signal !== current_dependencies[current_dependencies.length - 1]) {
			current_dependencies.push(signal);
		}
		if (
			current_untracked_writes !== null &&
			current_effect !== null &&
			(current_effect.f & CLEAN) !== 0 &&
			current_untracked_writes.includes(signal)
		) {
			set_signal_status(current_effect, DIRTY);
			schedule_effect(current_effect, false);
		}
	}

	if ((flags & DERIVED) !== 0 && is_signal_dirty(signal)) {
		if (DEV) {
			// we want to avoid tracking indirect dependencies
			const previous_inspect_fn = inspect_fn;
			inspect_fn = null;
			update_derived(/** @type {import('./types.js').ComputationSignal<V>} **/ (signal), false);
			inspect_fn = previous_inspect_fn;
		} else {
			update_derived(/** @type {import('./types.js').ComputationSignal<V>} **/ (signal), false);
		}
	}
	return signal.v;
}

/**
 * @template V
 * @param {import('./types.js').Signal<V>} signal
 * @param {V} value
 * @returns {V}
 */
export function set(signal, value) {
	set_signal_value(signal, value);
	return value;
}

/**
 * @template V
 * @param {import('./types.js').Signal<V>} signal
 * @param {V} value
 * @returns {void}
 */
export function set_sync(signal, value) {
	flushSync(() => set(signal, value));
}

/**
 * Invokes a function and captures all signals that are read during the invocation,
 * then invalidates them.
 * @param {() => any} fn
 */
export function invalidate_inner_signals(fn) {
	var previous_is_signals_recorded = is_signals_recorded;
	var previous_captured_signals = captured_signals;
	is_signals_recorded = true;
	captured_signals = new Set();
	var captured = captured_signals;
	var signal;
	try {
		untrack(fn);
	} finally {
		is_signals_recorded = previous_is_signals_recorded;
		if (is_signals_recorded) {
			for (signal of captured_signals) {
				previous_captured_signals.add(signal);
			}
		}
		captured_signals = previous_captured_signals;
	}
	for (signal of captured) {
		mutate(signal, null /* doesnt matter */);
	}
}

/**
 * @template V
 * @param {import('./types.js').Signal<V>} source
 * @param {V} value
 */
export function mutate(source, value) {
	set_signal_value(
		source,
		untrack(() => get(source))
	);
	return value;
}

/**
 * Updates a store with a new value.
 * @param {import('./types.js').Store<V>} store  the store to update
 * @param {any} expression  the expression that mutates the store
 * @param {V} new_value  the new store value
 * @template V
 */
export function mutate_store(store, expression, new_value) {
	store.set(new_value);
	return expression;
}

/**
 * @param {import('./types.js').ComputationSignal} signal
 * @param {boolean} inert
 * @returns {void}
 */
export function mark_subtree_inert(signal, inert) {
	const flags = signal.f;
	const is_already_inert = (flags & INERT) !== 0;
	if (is_already_inert !== inert) {
		signal.f ^= INERT;
		if (!inert && (flags & IS_EFFECT) !== 0 && (flags & CLEAN) === 0) {
			schedule_effect(/** @type {import('./types.js').EffectSignal} */ (signal), false);
		}
	}
	const references = signal.r;
	if (references !== null) {
		let i;
		for (i = 0; i < references.length; i++) {
			mark_subtree_inert(references[i], inert);
		}
	}
}

/**
 * @template V
 * @param {import('./types.js').Signal<V>} signal
 * @param {number} to_status
 * @param {boolean} force_schedule
 * @returns {void}
 */
function mark_signal_consumers(signal, to_status, force_schedule) {
	const runes = is_runes(signal.x);
	const consumers = signal.c;
	if (consumers !== null) {
		const length = consumers.length;
		let i;
		for (i = 0; i < length; i++) {
			const consumer = consumers[i];
			const flags = consumer.f;
			const unowned = (flags & UNOWNED) !== 0;
			const dirty = (flags & DIRTY) !== 0;
			// We skip any effects that are already dirty (but not unowned). Additionally, we also
			// skip if the consumer is the same as the current effect (except if we're not in runes or we
			// are in force schedule mode).
			if ((dirty && !unowned) || ((!force_schedule || !runes) && consumer === current_effect)) {
				continue;
			}
			set_signal_status(consumer, to_status);
			// If the signal is not clean, then skip over it – with the exception of unowned signals that
			// are already dirty. Unowned signals might be dirty because they are not captured as part of an
			// effect.
			if ((flags & CLEAN) !== 0 || (dirty && unowned)) {
				if ((consumer.f & IS_EFFECT) !== 0) {
					schedule_effect(/** @type {import('./types.js').EffectSignal} */ (consumer), false);
				} else {
					mark_signal_consumers(consumer, MAYBE_DIRTY, force_schedule);
				}
			}
		}
	}
}

/**
 * @template V
 * @param {import('./types.js').Signal<V>} signal
 * @param {V} value
 * @returns {void}
 */
export function set_signal_value(signal, value) {
	if (
		!current_untracking &&
		!ignore_mutation_validation &&
		current_consumer !== null &&
		is_runes(signal.x) &&
		(current_consumer.f & DERIVED) !== 0
	) {
		throw new Error(
			'ERR_SVELTE_UNSAFE_MUTATION' +
				(DEV
					? ": Unsafe mutations during Svelte's render or derived phase are not permitted in runes mode. " +
					  'This can lead to unexpected errors and possibly cause infinite loops.\n\nIf this mutation is not meant ' +
					  'to be reactive do not use the "$state" rune for that declaration.'
					: '')
		);
	}
	if (
		(signal.f & SOURCE) !== 0 &&
		!(/** @type {import('./types.js').EqualsFunctions} */ (signal.e)(value, signal.v))
	) {
		const component_context = signal.x;
		signal.v = value;
		// If the current signal is running for the first time, it won't have any
		// consumers as we only allocate and assign the consumers after the signal
		// has fully executed. So in the case of ensuring it registers the consumer
		// properly for itself, we need to ensure the current effect actually gets
		// scheduled. i.e:
		//
		// $effect(() => x++)
		//
		if (
			is_runes(component_context) &&
			current_effect !== null &&
			current_effect.c === null &&
			(current_effect.f & CLEAN) !== 0
		) {
			if (current_dependencies !== null && current_dependencies.includes(signal)) {
				set_signal_status(current_effect, DIRTY);
				schedule_effect(current_effect, false);
			} else {
				if (current_untracked_writes === null) {
					current_untracked_writes = [signal];
				} else {
					current_untracked_writes.push(signal);
				}
			}
		}
		mark_signal_consumers(signal, DIRTY, true);
		// If we have afterUpdates locally on the component, but we're within a render effect
		// then we will need to manually invoke the beforeUpdate/afterUpdate logic.
		// TODO: should we put this being a is_runes check and only run it in non-runes mode?
		if (current_effect === null && current_queued_pre_and_render_effects.length === 0) {
			const update_callbacks = component_context?.u;
			if (update_callbacks != null) {
				run_all(update_callbacks.b);
				const managed = managed_effect(() => {
					destroy_signal(managed);
					run_all(update_callbacks.a);
				});
			}
		}

		// @ts-expect-error
		if (DEV && signal.inspect) {
			if (is_batching_effect) {
				last_inspected_signal = signal;
			} else {
				// @ts-expect-error
				for (const fn of signal.inspect) fn();
			}
		}
	}
}

/**
 * @template V
 * @param {import('./types.js').ComputationSignal<V>} signal
 * @returns {void}
 */
export function destroy_signal(signal) {
	const teardown = /** @type {null | (() => void)} */ (signal.v);
	const destroy = signal.y;
	const flags = signal.f;
	destroy_references(signal);
	remove_consumer(signal, 0, true);
	signal.i =
		signal.r =
		signal.y =
		signal.x =
		signal.b =
		// @ts-expect-error - this is fine, since we're assigning to null to clear out a destroyed signal
		signal.v =
		signal.d =
		signal.c =
			null;
	set_signal_status(signal, DESTROYED);
	if (destroy !== null) {
		if (is_array(destroy)) {
			run_all(destroy);
		} else {
			destroy();
		}
	}
	if (teardown !== null && (flags & IS_EFFECT) !== 0) {
		teardown();
	}
}

/**
 * @template V
 * @param {() => V} init
 * @returns {import('./types.js').ComputationSignal<V>}
 */
/*#__NO_SIDE_EFFECTS__*/
export function derived(init) {
	const is_unowned = current_effect === null;
	const flags = is_unowned ? DERIVED | UNOWNED : DERIVED;
	const signal = /** @type {import('./types.js').ComputationSignal<V>} */ (
		create_computation_signal(flags | CLEAN, UNINITIALIZED, current_block)
	);
	signal.i = init;
	signal.x = current_component_context;
	signal.e = default_equals;
	if (!is_unowned) {
		push_reference(/** @type {import('./types.js').EffectSignal} */ (current_effect), signal);
	}
	return signal;
}

/**
 * @template V
 * @param {V} initial_value
 * @returns {import('./types.js').SourceSignal<V>}
 */
/*#__NO_SIDE_EFFECTS__*/
export function source(initial_value) {
	const source = create_source_signal(SOURCE | CLEAN, initial_value);
	source.x = current_component_context;
	return source;
}

/**
 * @template V
 * @param {V} initial_value
 * @returns {import('./types.js').SourceSignal<V>}
 */
/*#__NO_SIDE_EFFECTS__*/
export function mutable_source(initial_value) {
	const s = source(initial_value);
	s.e = safe_equal;
	return s;
}

/**
 * Use `untrack` to prevent something from being treated as an `$effect`/`$derived` dependency.
 *
 * https://svelte-5-preview.vercel.app/docs/functions#untrack
 * @template T
 * @param {() => T} fn
 * @returns {T}
 */
export function untrack(fn) {
	const previous_untracking = current_untracking;
	try {
		current_untracking = true;
		return fn();
	} finally {
		current_untracking = previous_untracking;
	}
}

/**
 * @param {import('./types.js').EffectType} type
 * @param {(() => void | (() => void)) | ((b: import('./types.js').Block) => void | (() => void))} init
 * @param {boolean} sync
 * @param {null | import('./types.js').Block} block
 * @param {boolean} schedule
 * @returns {import('./types.js').EffectSignal}
 */
function internal_create_effect(type, init, sync, block, schedule) {
	const signal = create_computation_signal(type | DIRTY, null, block);
	signal.i = init;
	signal.x = current_component_context;
	if (schedule) {
		schedule_effect(signal, sync);
	}
	if (current_effect !== null && (type & MANAGED) === 0) {
		push_reference(current_effect, signal);
	}
	return signal;
}

/**
 * @returns {boolean}
 */
export function effect_active() {
	return current_effect ? (current_effect.f & MANAGED) === 0 : false;
}

/**
 * @param {() => void | (() => void)} init
 * @returns {import('./types.js').EffectSignal}
 */
export function user_effect(init) {
	if (current_effect === null) {
		throw new Error(
			'ERR_SVELTE_ORPHAN_EFFECT' +
				(DEV ? ': The Svelte $effect rune can only be used during component initialisation.' : '')
		);
	}
	const apply_component_effect_heuristics =
		current_effect.f & RENDER_EFFECT &&
		current_component_context !== null &&
		!current_component_context.m;
	const effect = internal_create_effect(
		EFFECT,
		init,
		false,
		current_block,
		!apply_component_effect_heuristics
	);
	if (apply_component_effect_heuristics) {
		let effects = /** @type {import('./types.js').ComponentContext} */ (current_component_context)
			.e;
		if (effects === null) {
			effects = /** @type {import('./types.js').ComponentContext} */ (current_component_context).e =
				[];
		}
		effects.push(effect);
	}
	return effect;
}

/**
 * @param {() => void | (() => void)} init
 * @returns {() => void}
 */
export function user_root_effect(init) {
	const effect = managed_render_effect(init);
	return () => {
		destroy_signal(effect);
	};
}

/**
 * @param {() => void | (() => void)} init
 * @returns {import('./types.js').EffectSignal}
 */
export function effect(init) {
	return internal_create_effect(EFFECT, init, false, current_block, true);
}

/**
 * @param {() => void | (() => void)} init
 * @returns {import('./types.js').EffectSignal}
 */
export function managed_effect(init) {
	return internal_create_effect(EFFECT | MANAGED, init, false, current_block, true);
}

/**
 * @param {() => void | (() => void)} init
 * @param {boolean} sync
 * @returns {import('./types.js').EffectSignal}
 */
export function managed_pre_effect(init, sync) {
	return internal_create_effect(PRE_EFFECT | MANAGED, init, sync, current_block, true);
}

/**
 * @param {() => void | (() => void)} init
 * @returns {import('./types.js').EffectSignal}
 */
export function pre_effect(init) {
	if (current_effect === null) {
		throw new Error(
			'ERR_SVELTE_ORPHAN_EFFECT' +
				(DEV
					? ': The Svelte $effect.pre rune can only be used during component initialisation.'
					: '')
		);
	}
	const sync = current_effect !== null && (current_effect.f & RENDER_EFFECT) !== 0;
	return internal_create_effect(
		PRE_EFFECT,
		() => {
			const val = init();
			flush_local_render_effects();
			return val;
		},
		sync,
		current_block,
		true
	);
}

/**
 * This effect is used to ensure binding are kept in sync. We use a pre effect to ensure we run before the
 * bindings which are in later effects. However, we don't use a pre_effect directly as we don't want to flush anything.
 *
 * @param {() => void | (() => void)} init
 * @returns {import('./types.js').EffectSignal}
 */
export function invalidate_effect(init) {
	return internal_create_effect(PRE_EFFECT, init, true, current_block, true);
}

/**
 * @template {import('./types.js').Block} B
 * @param {(block: B) => void | (() => void)} init
 * @param {any} block
 * @param {any} managed
 * @param {any} sync
 * @returns {import('./types.js').EffectSignal}
 */
export function render_effect(init, block = current_block, managed = false, sync = true) {
	let flags = RENDER_EFFECT;
	if (managed) {
		flags |= MANAGED;
	}
	return internal_create_effect(flags, /** @type {any} */ (init), sync, block, true);
}

/**
 * @template {import('./types.js').Block} B
 * @param {(block: B) => void | (() => void)} init
 * @param {any} block
 * @param {any} sync
 * @returns {import('./types.js').EffectSignal}
 */
export function managed_render_effect(init, block = current_block, sync = true) {
	const flags = RENDER_EFFECT | MANAGED;
	return internal_create_effect(flags, /** @type {any} */ (init), sync, block, true);
}

/**
 * @template V
 * @param {import('./types.js').ComputationSignal<V>} signal
 * @param {() => void} destroy_fn
 * @returns {void}
 */
export function push_destroy_fn(signal, destroy_fn) {
	let destroy = signal.y;
	if (destroy === null) {
		signal.y = destroy_fn;
	} else if (is_array(destroy)) {
		destroy.push(destroy_fn);
	} else {
		signal.y = [destroy, destroy_fn];
	}
}

const STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
/**
 * @template V
 * @param {import('./types.js').Signal<V>} signal
 * @param {number} status
 * @returns {void}
 */
export function set_signal_status(signal, status) {
	signal.f = (signal.f & STATUS_MASK) | status;
}

/**
 * @template V
 * @param {V | import('./types.js').Signal<V>} val
 * @returns {val is import('./types.js').Signal<V>}
 */
export function is_signal(val) {
	return (
		typeof val === 'object' &&
		val !== null &&
		typeof (/** @type {import('./types.js').Signal<V>} */ (val).f) === 'number'
	);
}

/**
 * @template O
 * @template P
 * @param {any} val
 * @returns {val is import('./types.js').LazyProperty<O, P>}
 */
export function is_lazy_property(val) {
	return (
		typeof val === 'object' &&
		val !== null &&
		/** @type {import('./types.js').LazyProperty<O, P>} */ (val).t === LAZY_PROPERTY
	);
}

/**
 * @template V
 * @param {unknown} val
 * @returns {val is import('./types.js').Store<V>}
 */
export function is_store(val) {
	return (
		typeof val === 'object' &&
		val !== null &&
		typeof (/** @type {import('./types.js').Store<V>} */ (val).subscribe) === 'function'
	);
}

/**
 * This function is responsible for synchronizing a possibly bound prop with the inner component state.
 * It is used whenever the compiler sees that the component writes to the prop, or when it has a default prop_value.
 * @template V
 * @param {Record<string, unknown>} props
 * @param {string} key
 * @param {number} flags
 * @param {V | (() => V)} [initial]
 * @returns {(() => V | ((arg: V) => V) | ((arg: V, mutation: boolean) => V))}
 */
export function prop(props, key, flags, initial) {
	var immutable = (flags & PROPS_IS_IMMUTABLE) !== 0;
	var runes = (flags & PROPS_IS_RUNES) !== 0;

	var setter = get_descriptor(props, key)?.set;
	if (DEV && setter && runes && initial !== undefined) {
		// TODO consolidate all these random runtime errors
		throw new Error('Cannot use fallback values with bind:');
	}

	var prop_value = /** @type {V} */ (props[key]);

	if (prop_value === undefined && initial !== undefined) {
		// @ts-expect-error would need a cumbersome method overload to type this
		if ((flags & PROPS_IS_LAZY_INITIAL) !== 0) initial = initial();

		if (DEV && runes) {
			initial = readonly(proxy(/** @type {any} */ (initial)));
		}

		prop_value = /** @type {V} */ (initial);

		if (setter) setter(prop_value);
	}

	var getter = () => {
		var value = /** @type {V} */ (props[key]);
		if (value !== undefined) initial = undefined;
		return value === undefined ? /** @type {V} */ (initial) : value;
	};

	// easy mode — prop is never written to
	if ((flags & PROPS_IS_UPDATED) === 0) {
		return getter;
	}

	// intermediate mode — prop is written to, but the parent component had
	// `bind:foo` which means we can just call `$$props.foo = value` directly
	if (setter) {
		return function (/** @type {V} */ value) {
			if (arguments.length === 1) {
				/** @type {Function} */ (setter)(value);
				return value;
			} else {
				return getter();
			}
		};
	}

	// hard mode. this is where it gets ugly — the value in the child should
	// synchronize with the parent, but it should also be possible to temporarily
	// set the value to something else locally.
	var from_child = false;
	var was_from_child = false;

	// The derived returns the current value. The underlying mutable
	// source is written to from various places to persist this value.
	var inner_current_value = mutable_source(prop_value);
	var current_value = derived(() => {
		var parent_value = getter();
		var child_value = get(inner_current_value);

		if (from_child) {
			from_child = false;
			was_from_child = true;
			return child_value;
		}

		was_from_child = false;
		return (inner_current_value.v = parent_value);
	});

	if (!immutable) current_value.e = safe_equal;

	return function (/** @type {V} */ value, mutation = false) {
		var current = get(current_value);

		// legacy nonsense — need to ensure the source is invalidated when necessary
		if (is_signals_recorded) {
			// set this so that we don't reset to the parent value if `d`
			// is invalidated because of `invalidate_inner_signals` (rather
			// than because the parent or child value changed)
			from_child = was_from_child;
			// invoke getters so that signals are picked up by `invalidate_inner_signals`
			getter();
			get(inner_current_value);
		}

		if (arguments.length > 0) {
			if (mutation || (immutable ? value !== current : safe_not_equal(value, current))) {
				from_child = true;
				set(inner_current_value, mutation ? current : value);
				get(current_value); // force a synchronisation immediately
			}

			return value;
		}

		return current;
	};
}

/**
 * @param {unknown} a
 * @param {unknown} b
 * @returns {boolean}
 */
export function safe_not_equal(a, b) {
	// eslint-disable-next-line eqeqeq
	return a != a
		? // eslint-disable-next-line eqeqeq
		  b == b
		: a !== b || (a !== null && typeof a === 'object') || typeof a === 'function';
}

/**
 * @param {unknown} a
 * @param {unknown} b
 * @returns {boolean}
 */
export function safe_equal(a, b) {
	return !safe_not_equal(a, b);
}

/** @returns {Map<unknown, unknown>} */
export function get_or_init_context_map() {
	const component_context = current_component_context;
	if (component_context === null) {
		throw new Error(
			'ERR_SVELTE_ORPHAN_CONTEXT' +
				(DEV ? 'Context can only be used during component initialisation.' : '')
		);
	}
	let context_map = component_context.c;
	if (context_map === null) {
		const parent_context = get_parent_context(component_context);
		context_map = component_context.c = new Map(parent_context || undefined);
	}
	return context_map;
}

/**
 * @param {import('./types.js').ComponentContext} component_context
 * @returns {Map<unknown, unknown> | null}
 */
function get_parent_context(component_context) {
	let parent = component_context.p;
	while (parent !== null) {
		const context_map = parent.c;
		if (context_map !== null) {
			return context_map;
		}
		parent = parent.p;
	}
	return null;
}

/**
 * @this {any}
 * @param {Record<string, unknown>} $$props
 * @param {Event} event
 * @returns {void}
 */
export function bubble_event($$props, event) {
	var events = /** @type {Record<string, Function[] | Function>} */ ($$props.$$events)?.[
		event.type
	];
	var callbacks = is_array(events) ? events.slice() : events == null ? [] : [events];
	for (var fn of callbacks) {
		// Preserve "this" context
		fn.call(this, event);
	}
}

/**
 * @param {import('./types.js').Signal<number>} signal
 * @param {1 | -1} [d]
 * @returns {number}
 */
export function update(signal, d = 1) {
	const value = get(signal);
	set_signal_value(signal, value + d);
	return value;
}

/**
 * @param {((value?: number) => number)} fn
 * @param {1 | -1} [d]
 * @returns {number}
 */
export function update_prop(fn, d = 1) {
	const value = fn();
	fn(value + d);
	return value;
}

/**
 * @param {import('./types.js').Store<number>} store
 * @param {number} store_value
 * @param {1 | -1} [d]
 * @returns {number}
 */
export function update_store(store, store_value, d = 1) {
	store.set(store_value + d);
	return store_value;
}

/**
 * @param {import('./types.js').Signal<number>} signal
 * @param {1 | -1} [d]
 * @returns {number}
 */
export function update_pre(signal, d = 1) {
	const value = get(signal) + d;
	set_signal_value(signal, value);
	return value;
}

/**
 * @param {((value?: number) => number)} fn
 * @param {1 | -1} [d]
 * @returns {number}
 */
export function update_pre_prop(fn, d = 1) {
	const value = fn() + d;
	fn(value);
	return value;
}

/**
 * @param {import('./types.js').Store<number>} store
 * @param {number} store_value
 * @param {1 | -1} [d]
 * @returns {number}
 */
export function update_pre_store(store, store_value, d = 1) {
	const value = store_value + d;
	store.set(value);
	return value;
}

/**
 * Under some circumstances, imports may be reactive in legacy mode. In that case,
 * they should be using `reactive_import` as part of the transformation
 * @param {() => any} fn
 */
export function reactive_import(fn) {
	const s = source(0);
	return function () {
		if (arguments.length === 1) {
			set(s, get(s) + 1);
			return arguments[0];
		} else {
			get(s);
			return fn();
		}
	};
}

/**
 * @param {Record<string, unknown>} obj
 * @param {string[]} keys
 * @returns {Record<string, unknown>}
 */
export function exclude_from_object(obj, keys) {
	obj = { ...obj };
	let key;
	for (key of keys) {
		delete obj[key];
	}
	return obj;
}

/**
 * @template V
 * @param {V} value
 * @param {V} fallback
 * @returns {V}
 */
export function value_or_fallback(value, fallback) {
	return value === undefined ? fallback : value;
}

/**
 * Schedules a callback to run immediately before the component is unmounted.
 *
 * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
 * only one that runs inside a server-side component.
 *
 * https://svelte.dev/docs/svelte#ondestroy
 * @param {() => any} fn
 * @returns {void}
 */
export function onDestroy(fn) {
	if (!is_ssr) {
		user_effect(() => () => untrack(fn));
	}
}

/**
 * @param {Record<string, unknown>} props
 * @param {any} runes
 * @returns {void}
 */
export function push(props, runes = false) {
	current_component_context = {
		// accessors
		a: null,
		// context
		c: null,
		// effects
		e: null,
		// mounted
		m: false,
		// parent
		p: current_component_context,
		// props
		s: props,
		// runes
		r: runes,
		// update_callbacks
		u: null
	};
}

/**
 * @param {Record<string, any>} [accessors]
 * @returns {void}
 */
export function pop(accessors) {
	const context_stack_item = current_component_context;
	if (context_stack_item !== null) {
		if (accessors !== undefined) {
			context_stack_item.a = accessors;
		}
		const effects = context_stack_item.e;
		if (effects !== null) {
			context_stack_item.e = null;
			for (let i = 0; i < effects.length; i++) {
				schedule_effect(effects[i], false);
			}
		}
		current_component_context = context_stack_item.p;
		context_stack_item.m = true;
	}
}

/**
 * @param {any} value
 * @param {Set<any>} visited
 * @returns {void}
 */
function deep_read(value, visited = new Set()) {
	if (typeof value === 'object' && value !== null && !visited.has(value)) {
		visited.add(value);
		for (let key in value) {
			deep_read(value[key], visited);
		}
		const proto = Object.getPrototypeOf(value);
		if (
			proto !== Object.prototype &&
			proto !== Array.prototype &&
			proto !== Map.prototype &&
			proto !== Set.prototype &&
			proto !== Date.prototype
		) {
			const descriptors = get_descriptors(proto);
			for (let key in descriptors) {
				const get = descriptors[key].get;
				if (get) {
					get.call(value);
				}
			}
		}
	}
}

// TODO remove in a few versions, before 5.0 at the latest
let warned_inspect_changed = false;

/**
 * @param {() => any[]} get_value
 * @param {Function} [inspect]
 */
// eslint-disable-next-line no-console
export function inspect(get_value, inspect = console.log) {
	let initial = true;

	pre_effect(() => {
		const fn = () => {
			const value = get_value().map(unstate);
			if (value.length === 2 && typeof value[1] === 'function' && !warned_inspect_changed) {
				// eslint-disable-next-line no-console
				console.warn(
					'$inspect() API has changed. See https://svelte-5-preview.vercel.app/docs/runes#$inspect for more information.'
				);
				warned_inspect_changed = true;
			}
			inspect(initial ? 'init' : 'update', ...value);
		};

		inspect_fn = fn;
		const value = get_value();
		deep_read(value);
		inspect_fn = null;

		const signals = inspect_captured_signals.slice();
		inspect_captured_signals = [];

		if (initial) {
			fn();
			initial = false;
		}

		return () => {
			for (const s of signals) {
				s.inspect.delete(fn);
			}
		};
	});
}

/**
 * @template O
 * @template P
 * @param {O} o
 * @param {P} p
 * @returns {import('./types.js').LazyProperty<O, P>}
 */
export function lazy_property(o, p) {
	return {
		o,
		p,
		t: LAZY_PROPERTY
	};
}

/**
 * @template V
 * @param {V} value
 * @returns {import('./types.js').UnwrappedSignal<V>}
 */
export function unwrap(value) {
	if (is_signal(value)) {
		// @ts-ignore
		return get(value);
	}
	if (is_lazy_property(value)) {
		return value.o[value.p];
	}
	// @ts-ignore
	return value;
}

if (DEV) {
	/** @param {string} rune */
	function throw_rune_error(rune) {
		if (!(rune in globalThis)) {
			// @ts-ignore
			globalThis[rune] = () => {
				// TODO if people start adjusting the "this can contain runes" config through v-p-s more, adjust this message
				throw new Error(`${rune} is only available inside .svelte and .svelte.js/ts files`);
			};
		}
	}

	throw_rune_error('$state');
	throw_rune_error('$effect');
	throw_rune_error('$derived');
	throw_rune_error('$inspect');
	throw_rune_error('$props');
}
