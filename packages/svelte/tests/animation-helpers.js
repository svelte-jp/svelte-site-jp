import { raf as svelte_raf } from 'svelte/internal/client';

export const raf = {
	animations: new Set(),
	ticks: new Set(),
	tick,
	time: 0,
	reset() {
		this.time = 0;
		this.animations.clear();
		this.ticks.clear();

		svelte_raf.tick = (f) => {
			raf.ticks.add(f);
		};
		svelte_raf.now = () => raf.time;
		svelte_raf.tasks.clear();
	}
};

/**
 * @param {number} time
 */
function tick(time) {
	raf.time = time;
	for (const animation of raf.animations) {
		animation._update();
	}
	for (const tick of raf.ticks) {
		tick(raf.time);
	}
}

class Animation {
	#target;
	#keyframes;
	#duration;

	#offset = raf.time;

	#finished = () => {};
	#cancelled = () => {};

	currentTime = 0;
	startTime = 0;

	/**
	 * @param {HTMLElement} target
	 * @param {Keyframe[]} keyframes
	 * @param {{ duration: number }} options // TODO add delay
	 */
	constructor(target, keyframes, { duration }) {
		this.#target = target;
		this.#keyframes = keyframes;
		this.#duration = duration;

		// Promise-like semantics, but call callbacks immediately on raf.tick
		this.finished = {
			/** @param {() => void} callback */
			then: (callback) => {
				this.#finished = callback;

				return {
					/** @param {() => void} callback */
					catch: (callback) => {
						this.#cancelled = callback;
					}
				};
			}
		};

		this._update();
	}

	_update() {
		this.currentTime = raf.time - this.#offset;
		const target_frame = this.currentTime / this.#duration;
		this.#apply_keyframe(target_frame);

		if (this.currentTime >= this.#duration) {
			this.#finished();
			raf.animations.delete(this);
		}
	}

	/**
	 * @param {number} t
	 */
	#apply_keyframe(t) {
		const n = Math.min(1, Math.max(0, t)) * (this.#keyframes.length - 1);

		const lower = this.#keyframes[Math.floor(n)];
		const upper = this.#keyframes[Math.ceil(n)];

		let frame = lower;
		if (lower !== upper) {
			frame = {};

			for (const key in lower) {
				frame[key] = interpolate(
					/** @type {string} */ (lower[key]),
					/** @type {string} */ (upper[key]),
					n % 1
				);
			}
		}

		for (let prop in frame) {
			// @ts-ignore
			this.#target.style[prop] = frame[prop];
		}

		if (this.currentTime >= this.#duration) {
			this.currentTime = this.#duration;
			for (let prop in frame) {
				// @ts-ignore
				this.#target.style[prop] = null;
			}
		}
	}

	cancel() {
		if (this.currentTime > 0 && this.currentTime < this.#duration) {
			this.#apply_keyframe(0);
		}
		// @ts-ignore
		this.currentTime = null;
		// @ts-ignore
		this.startTime = null;
		this.#cancelled();
		raf.animations.delete(this);
	}
}

/**
 * @param {string} a
 * @param {string} b
 * @param {number} p
 */
function interpolate(a, b, p) {
	if (a === b) return a;

	const fallback = p < 0.5 ? a : b;

	const a_match = a.match(/[\d.]+|[^\d.]+/g);
	const b_match = b.match(/[\d.]+|[^\d.]+/g);

	if (!a_match || !b_match) return fallback;
	if (a_match.length !== b_match.length) return fallback;

	let result = '';

	for (let i = 0; i < a_match.length; i += 2) {
		const a_num = parseFloat(a_match[i]);
		const b_num = parseFloat(b_match[i]);
		result += a_num + (b_num - a_num) * p;

		if (a_match[i + 1] !== b_match[i + 1]) {
			// bail
			return fallback;
		}

		result += a_match[i + 1] ?? '';
	}

	return result;
}

/**
 * @param {Keyframe[]} keyframes
 * @param {{duration: number}} options
 * @returns {globalThis.Animation}
 */
HTMLElement.prototype.animate = function (keyframes, options) {
	const animation = new Animation(this, keyframes, options);
	raf.animations.add(animation);
	// @ts-ignore
	return animation;
};
