import { walk as zimmerframe_walk } from 'zimmerframe';
import { convert } from './legacy.js';
import { parse as parse_acorn } from './phases/1-parse/acorn.js';
import { parse as _parse } from './phases/1-parse/index.js';
import { remove_typescript_nodes } from './phases/1-parse/remove_typescript_nodes.js';
import { analyze_component, analyze_module } from './phases/2-analyze/index.js';
import { transform_component, transform_module } from './phases/3-transform/index.js';
import { validate_component_options, validate_module_options } from './validate-options.js';
import * as state from './state.js';
export { default as preprocess } from './preprocess/index.js';

/**
 * `compile` converts your `.svelte` source code into a JavaScript module that exports a component
 *
 * https://svelte.dev/docs/svelte-compiler#svelte-compile
 * @param {string} source The component source code
 * @param {import('#compiler').CompileOptions} options The compiler options
 * @returns {import('#compiler').CompileResult}
 */
export function compile(source, options) {
	const validated = validate_component_options(options, '');
	state.reset(source, validated);

	let parsed = _parse(source);

	const { customElement: customElementOptions, ...parsed_options } = parsed.options || {};

	/** @type {import('#compiler').ValidatedCompileOptions} */
	const combined_options = {
		...validated,
		...parsed_options,
		customElementOptions
	};

	if (parsed.metadata.ts) {
		parsed = {
			...parsed,
			fragment: parsed.fragment && remove_typescript_nodes(parsed.fragment),
			instance: parsed.instance && remove_typescript_nodes(parsed.instance),
			module: parsed.module && remove_typescript_nodes(parsed.module)
		};
	}

	const analysis = analyze_component(parsed, source, combined_options);
	const result = transform_component(analysis, source, combined_options);
	result.ast = to_public_ast(source, parsed, options.modernAst);
	return result;
}

/**
 * `compileModule` takes your JavaScript source code containing runes, and turns it into a JavaScript module.
 *
 * https://svelte.dev/docs/svelte-compiler#svelte-compile
 * @param {string} source The component source code
 * @param {import('#compiler').ModuleCompileOptions} options
 * @returns {import('#compiler').CompileResult}
 */
export function compileModule(source, options) {
	const validated = validate_module_options(options, '');
	state.reset(source, validated);

	const analysis = analyze_module(parse_acorn(source, false), validated);
	return transform_module(analysis, source, validated);
}

/**
 * The parse function parses a component, returning only its abstract syntax tree.
 *
 * The `modern` option (`false` by default in Svelte 5) makes the parser return a modern AST instead of the legacy AST.
 * `modern` will become `true` by default in Svelte 6, and the option will be removed in Svelte 7.
 *
 * https://svelte.dev/docs/svelte-compiler#svelte-parse
 * @overload
 * @param {string} source
 * @param {{ filename?: string; modern: true }} options
 * @returns {import('#compiler').Root}
 */

/**
 * The parse function parses a component, returning only its abstract syntax tree.
 *
 * The `modern` option (`false` by default in Svelte 5) makes the parser return a modern AST instead of the legacy AST.
 * `modern` will become `true` by default in Svelte 6, and the option will be removed in Svelte 7.
 *
 * https://svelte.dev/docs/svelte-compiler#svelte-parse
 * @overload
 * @param {string} source
 * @param {{ filename?: string; modern?: false }} [options]
 * @returns {import('./types/legacy-nodes.js').LegacyRoot}
 */

/**
 * The parse function parses a component, returning only its abstract syntax tree.
 *
 * The `modern` option (`false` by default in Svelte 5) makes the parser return a modern AST instead of the legacy AST.
 * `modern` will become `true` by default in Svelte 6, and the option will be removed in Svelte 7.
 *
 * https://svelte.dev/docs/svelte-compiler#svelte-parse
 * @param {string} source
 * @param {{ filename?: string; rootDir?: string; modern?: boolean }} [options]
 * @returns {import('#compiler').Root | import('./types/legacy-nodes.js').LegacyRoot}
 */
export function parse(source, { filename, rootDir, modern } = {}) {
	state.reset(source, { filename, rootDir }); // TODO it's weird to require filename/rootDir here. reconsider the API

	const ast = _parse(source);
	return to_public_ast(source, ast, modern);
}

/**
 * @param {string} source
 * @param {import('#compiler').Root} ast
 * @param {boolean | undefined} modern
 */
function to_public_ast(source, ast, modern) {
	if (modern) {
		// remove things that we don't want to treat as public API
		return zimmerframe_walk(ast, null, {
			_(node, { next }) {
				// @ts-ignore
				delete node.parent;
				// @ts-ignore
				delete node.metadata;
				next();
			}
		});
	}

	return convert(source, ast);
}

/**
 * @deprecated Replace this with `import { walk } from 'estree-walker'`
 * @returns {never}
 */
export function walk() {
	throw new Error(
		`'svelte/compiler' no longer exports a \`walk\` utility — please import it directly from 'estree-walker' instead`
	);
}

export { CompileError } from './errors.js';
export { VERSION } from '../version.js';
export { migrate } from './migrate/index.js';
