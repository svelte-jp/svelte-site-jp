import { error } from './errors.js';

/**
 * @template [Input=any]
 * @template [Output=Input]
 * @typedef {(input: Input, keypath: string) => Required<Output>} Validator
 */

const common = {
	filename: string(undefined),

	dev: boolean(false),

	generate: validator('client', (input, keypath) => {
		if (input === 'dom' || input === 'ssr') {
			warn(
				'`generate: "dom"` and `generate: "ssr"` options have been renamed to "client" and "server" respectively'
			);
			return input === 'dom' ? 'client' : 'server';
		}

		// TODO deprecate `false` in favour of `analyze`/`analyzeModule` https://github.com/sveltejs/svelte-octane/issues/655
		if (input !== 'client' && input !== 'server' && input !== false) {
			throw_error(`${keypath} must be "client", "server" or false`);
		}

		return input;
	})
};

export const validate_module_options =
	/** @type {Validator<import('#compiler').ModuleCompileOptions, import('#compiler').ValidatedModuleCompileOptions>} */ (
		object({
			...common
		})
	);

export const validate_component_options =
	/** @type {Validator<import('#compiler').CompileOptions, import('#compiler').ValidatedCompileOptions>} */ (
		object({
			...common,

			accessors: boolean(false),

			css: validator('external', (input) => {
				if (input === true || input === false) {
					throw_error(
						'The boolean options have been removed from the css option. Use "external" instead of false and "injected" instead of true'
					);
				}
				if (input === 'none') {
					throw_error(
						'css: "none" is no longer a valid option. If this was crucial for you, please open an issue on GitHub with your use case.'
					);
				}

				if (input !== 'external' && input !== 'injected') {
					throw_error(`css should be either "external" (default, recommended) or "injected"`);
				}

				return input;
			}),

			cssHash: fun(({ css, hash }) => {
				return `svelte-${hash(css)}`;
			}),

			// TODO this is a sourcemap option, would be good to put under a sourcemap namespace
			cssOutputFilename: string(undefined),

			customElement: boolean(false),

			discloseVersion: boolean(true),

			immutable: deprecate(
				'The immutable option has been deprecated. It has no effect in runes mode.',
				boolean(false)
			),

			legacy: object({
				componentApi: boolean(false)
			}),

			loopGuardTimeout: warn_removed('The loopGuardTimeout option has been removed.'),

			name: string(undefined),

			namespace: list(['html', 'svg', 'foreign']),

			// TODO this is a sourcemap option, would be good to put under a sourcemap namespace
			outputFilename: string(undefined),

			preserveComments: boolean(false),

			preserveWhitespace: boolean(false),

			runes: boolean(undefined),

			sourcemap: validator(undefined, (input, keypath) => {
				// TODO
				return input;
			}),

			enableSourcemap: validator(undefined, (input, keypath) => {
				// TODO decide if we want to keep this
				return input;
			}),

			hydratable: warn_removed(
				'The hydratable option has been removed. Svelte components are always hydratable now.'
			),
			format: removed(
				'The format option has been removed in Svelte 4, the compiler only outputs ESM now. Remove "format" from your compiler options. ' +
					'If you did not set this yourself, bump the version of your bundler plugin (vite-plugin-svelte/rollup-plugin-svelte/svelte-loader)'
			),
			tag: removed(
				'The tag option has been removed in Svelte 5. Use `<svelte:options customElement="tag-name" />` inside the component instead. ' +
					'If that does not solve your use case, please open an issue on GitHub with details.'
			),
			sveltePath: removed(
				'The sveltePath option has been removed in Svelte 5. ' +
					'If this option was crucial for you, please open an issue on GitHub with your use case.'
			),
			// These two were primarily created for svelte-preprocess (https://github.com/sveltejs/svelte/pull/6194),
			// but with new TypeScript compilation modes strictly separating types it's not necessary anymore
			errorMode: removed(
				'The errorMode option has been removed. If you are using this through svelte-preprocess with TypeScript, ' +
					'use the https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax setting instead'
			),
			varsReport: removed(
				'The vars option has been removed. If you are using this through svelte-preprocess with TypeScript, ' +
					'use the https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax setting instead'
			)
		})
	);

/**
 * @param {string} msg
 * @returns {Validator}
 */
function removed(msg) {
	return (input) => {
		if (input !== undefined) {
			error(null, 'removed-compiler-option', msg);
		}
		return /** @type {any} */ (undefined);
	};
}

const warned = new Set();

/** @param {string} message */
function warn(message) {
	if (!warned.has(message)) {
		warned.add(message);
		// eslint-disable-next-line no-console
		console.warn(message);
	}
}

/**
 * @param {string} message
 * @returns {Validator}
 */
function warn_removed(message) {
	return (input) => {
		if (input !== undefined) warn(message);
		return /** @type {any} */ (undefined);
	};
}

/**
 * @param {string} message
 * @param {Validator} validator
 * @returns {Validator}
 */
function deprecate(message, validator) {
	return (input, keypath) => {
		if (input !== undefined) warn(message);
		return validator(input, keypath);
	};
}

/**
 * @param {Record<string, Validator>} children
 * @param {boolean} [allow_unknown]
 * @returns {Validator}
 */
function object(children, allow_unknown = false) {
	return (input, keypath) => {
		/** @type {Record<string, any>} */
		const output = {};

		if ((input && typeof input !== 'object') || Array.isArray(input)) {
			throw_error(`${keypath} should be an object`);
		}

		for (const key in input) {
			if (!(key in children)) {
				if (allow_unknown) {
					output[key] = input[key];
				} else {
					error(
						null,
						'invalid-compiler-option',
						`Unexpected option ${keypath ? `${keypath}.${key}` : key}`
					);
				}
			}
		}

		for (const key in children) {
			const validator = children[key];
			output[key] = validator(input && input[key], keypath ? `${keypath}.${key}` : key);
		}

		return output;
	};
}

/**
 * @param {any} fallback
 * @param {(value: any, keypath: string) => any} fn
 * @returns {Validator}
 */
function validator(fallback, fn) {
	return (input, keypath) => {
		return input === undefined ? fallback : fn(input, keypath);
	};
}

/**
 * @param {number} fallback
 * @returns {Validator}
 */
function number(fallback) {
	return validator(fallback, (input, keypath) => {
		if (typeof input !== 'number') {
			throw_error(`${keypath} should be a number, if specified`);
		}
		return input;
	});
}

/**
 * @param {string | undefined} fallback
 * @param {boolean} allow_empty
 * @returns {Validator}
 */
function string(fallback, allow_empty = true) {
	return validator(fallback, (input, keypath) => {
		if (typeof input !== 'string') {
			throw_error(`${keypath} should be a string, if specified`);
		}

		if (!allow_empty && input === '') {
			throw_error(`${keypath} cannot be empty`);
		}

		return input;
	});
}

/**
 * @param {boolean | undefined} fallback
 * @returns {Validator}
 */
function boolean(fallback) {
	return validator(fallback, (input, keypath) => {
		if (typeof input !== 'boolean') {
			throw_error(`${keypath} should be true or false, if specified`);
		}
		return input;
	});
}

/**
 * @param {Array<boolean | string | number>} options
 * @returns {Validator}
 */
function list(options, fallback = options[0]) {
	return validator(fallback, (input, keypath) => {
		if (!options.includes(input)) {
			// prettier-ignore
			const msg = options.length > 2
				? `${keypath} should be one of ${options.slice(0, -1).map(input => `"${input}"`).join(', ')} or "${options[options.length - 1]}"`
				: `${keypath} should be either "${options[0]}" or "${options[1]}"`;

			throw_error(msg);
		}
		return input;
	});
}

/**
 * @param {(...args: any) => any} fallback
 * @returns {Validator}
 */
function fun(fallback) {
	return validator(fallback, (input, keypath) => {
		if (typeof input !== 'function') {
			throw_error(`${keypath} should be a function, if specified`);
		}
		return input;
	});
}

/** @param {string} msg */
function throw_error(msg) {
	error(null, 'invalid-compiler-option', msg);
}
