import { DEV } from 'esm-env';
import { source, set } from '../internal/client/reactivity/sources.js';
import { get } from '../internal/client/runtime.js';
import { map } from './utils.js';

var read_methods = ['forEach', 'isDisjointFrom', 'isSubsetOf', 'isSupersetOf'];
var set_like_methods = ['difference', 'intersection', 'symmetricDifference', 'union'];

var inited = false;

/**
 * @template T
 * @extends {Set<T>}
 */
export class ReactiveSet extends Set {
	/** @type {Map<T, import('#client').Source<boolean>>} */
	#sources = new Map();
	#version = source(0);
	#size = source(0);

	/**
	 * @param {Iterable<T> | null | undefined} [value]
	 */
	constructor(value) {
		super();

		// If the value is invalid then the native exception will fire here
		if (DEV) new Set(value);

		if (value) {
			var sources = this.#sources;

			for (var element of value) {
				sources.set(element, source(true));
			}

			this.#size.v = sources.size;
		}

		if (!inited) this.#init();
	}

	// We init as part of the first instance so that we can treeshake this class
	#init() {
		inited = true;

		var proto = ReactiveSet.prototype;
		var set_proto = Set.prototype;

		for (const method of read_methods) {
			// @ts-ignore
			proto[method] = function (...v) {
				get(this.#version);
				// We don't populate the underlying Set, so we need to create a clone using
				// our internal values and then pass that to the method.
				var clone = new Set(this.values());
				// @ts-ignore
				return set_proto[method].apply(clone, v);
			};
		}

		for (const method of set_like_methods) {
			// @ts-ignore
			proto[method] = function (...v) {
				get(this.#version);
				// We don't populate the underlying Set, so we need to create a clone using
				// our internal values and then pass that to the method.
				var clone = new Set(this.values());
				// @ts-ignore
				var set = /** @type {Set<T>} */ (set_proto[method].apply(clone, v));
				return new ReactiveSet(set);
			};
		}
	}

	#increment_version() {
		set(this.#version, this.#version.v + 1);
	}

	/** @param {T} value */
	has(value) {
		var s = this.#sources.get(value);

		if (s === undefined) {
			// We should always track the version in case
			// the Set ever gets this value in the future.
			get(this.#version);

			return false;
		}

		return get(s);
	}

	/** @param {T} value */
	add(value) {
		var sources = this.#sources;

		if (!sources.has(value)) {
			sources.set(value, source(true));
			set(this.#size, sources.size);
			this.#increment_version();
		}

		return this;
	}

	/** @param {T} value */
	delete(value) {
		var sources = this.#sources;
		var s = sources.get(value);

		if (s !== undefined) {
			var removed = sources.delete(value);
			set(this.#size, sources.size);
			set(s, false);
			this.#increment_version();
			return removed;
		}

		return false;
	}

	clear() {
		var sources = this.#sources;

		if (sources.size !== 0) {
			set(this.#size, 0);
			for (var s of sources.values()) {
				set(s, false);
			}
			this.#increment_version();
		}

		sources.clear();
	}

	keys() {
		get(this.#version);
		return map(this.#sources.keys(), (key) => key, 'Set Iterator');
	}

	values() {
		return this.keys();
	}

	entries() {
		return map(this.keys(), (key) => /** @type {[T, T]} */ ([key, key]), 'Set Iterator');
	}

	[Symbol.iterator]() {
		return this.keys();
	}

	get size() {
		return get(this.#size);
	}
}
