import { add_snippet_symbol } from '../../../shared/validate.js';
import { EFFECT_TRANSPARENT } from '../../constants.js';
import { branch, block, destroy_effect } from '../../reactivity/effects.js';
import {
	current_component_context,
	dev_current_component_function,
	set_dev_current_component_function
} from '../../runtime.js';

/**
 * @template {(node: import('#client').TemplateNode, ...args: any[]) => import('#client').Dom} SnippetFn
 * @param {() => SnippetFn | null | undefined} get_snippet
 * @param {import('#client').TemplateNode} node
 * @param {(() => any)[]} args
 * @returns {void}
 */
export function snippet(get_snippet, node, ...args) {
	/** @type {SnippetFn | null | undefined} */
	var snippet;

	/** @type {import('#client').Effect | null} */
	var snippet_effect;

	block(() => {
		if (snippet === (snippet = get_snippet())) return;

		if (snippet_effect) {
			destroy_effect(snippet_effect);
			snippet_effect = null;
		}

		if (snippet) {
			snippet_effect = branch(() => /** @type {SnippetFn} */ (snippet)(node, ...args));
		}
	}, EFFECT_TRANSPARENT);
}

/**
 * In development, wrap the snippet function so that it passes validation, and so that the
 * correct component context is set for ownership checks
 * @param {(node: import('#client').TemplateNode, ...args: any[]) => import('#client').Dom} fn
 * @returns
 */
export function wrap_snippet(fn) {
	let component = /** @type {import('#client').ComponentContext} */ (current_component_context);

	return add_snippet_symbol(
		(/** @type {import('#client').TemplateNode} */ node, /** @type {any[]} */ ...args) => {
			var previous_component_function = dev_current_component_function;
			set_dev_current_component_function(component.function);

			try {
				return fn(node, ...args);
			} finally {
				set_dev_current_component_function(previous_component_function);
			}
		}
	);
}
