import * as b from '../../../utils/builders.js';
import { extract_paths, is_simple_expression } from '../../../utils/ast.js';
import { error } from '../../../errors.js';
import {
	PROPS_IS_LAZY_INITIAL,
	PROPS_IS_IMMUTABLE,
	PROPS_IS_RUNES,
	PROPS_IS_UPDATED
} from '../../../../constants.js';

/**
 * @template {import('./types').ClientTransformState} State
 * @param {import('estree').AssignmentExpression} node
 * @param {import('zimmerframe').Context<import('#compiler').SvelteNode, State>} context
 * @returns
 */
export function get_assignment_value(node, { state, visit }) {
	if (node.left.type === 'Identifier') {
		const operator = node.operator;
		return operator === '='
			? /** @type {import('estree').Expression} */ (visit(node.right))
			: // turn something like x += 1 into x = x + 1
			  b.binary(
					/** @type {import('estree').BinaryOperator} */ (operator.slice(0, -1)),
					serialize_get_binding(node.left, state),
					/** @type {import('estree').Expression} */ (visit(node.right))
			  );
	} else if (
		node.left.type === 'MemberExpression' &&
		node.left.object.type === 'ThisExpression' &&
		node.left.property.type === 'PrivateIdentifier' &&
		state.private_state.has(node.left.property.name)
	) {
		const operator = node.operator;
		return operator === '='
			? /** @type {import('estree').Expression} */ (visit(node.right))
			: // turn something like x += 1 into x = x + 1
			  b.binary(
					/** @type {import('estree').BinaryOperator} */ (operator.slice(0, -1)),
					/** @type {import('estree').Expression} */ (visit(node.left)),
					/** @type {import('estree').Expression} */ (visit(node.right))
			  );
	} else {
		return /** @type {import('estree').Expression} */ (visit(node.right));
	}
}

/**
 * @param {import('estree').Identifier} node
 * @param {import('./types').ClientTransformState} state
 * @returns {import('estree').Expression}
 */
export function serialize_get_binding(node, state) {
	const binding = state.scope.get(node.name);

	if (binding === null || node === binding.node) {
		// No associated binding or the declaration itself which shouldn't be transformed
		return node;
	}

	if (binding.kind === 'store_sub') {
		return b.call(node);
	}

	if (binding.expression) {
		return binding.expression;
	}

	if (binding.kind === 'prop') {
		if (binding.node.name === '$$props') {
			// Special case for $$props which only exists in the old world
			// TODO this probably shouldn't have a 'prop' binding kind
			return node;
		}

		if (
			state.analysis.accessors ||
			(state.analysis.immutable ? binding.reassigned : binding.mutated) ||
			binding.initial
		) {
			return b.call(node);
		}

		if (binding.prop_alias) {
			return b.member(b.id('$$props'), b.id(binding.prop_alias));
		}
		return b.member(b.id('$$props'), node);
	}

	if (binding.kind === 'legacy_reactive_import') {
		return b.call('$$_import_' + node.name);
	}

	if (
		(binding.kind === 'state' &&
			(!state.analysis.immutable || state.analysis.accessors || binding.reassigned)) ||
		binding.kind === 'derived' ||
		binding.kind === 'legacy_reactive'
	) {
		return b.call('$.get', node);
	}

	return node;
}

/**
 * @template {import('./types').ClientTransformState} State
 * @param {import('estree').AssignmentExpression} node
 * @param {import('zimmerframe').Context<import('#compiler').SvelteNode, State>} context
 * @param {() => any} fallback
 * @returns {import('estree').Expression}
 */
export function serialize_set_binding(node, context, fallback) {
	const { state, visit } = context;

	if (
		node.left.type === 'ArrayPattern' ||
		node.left.type === 'ObjectPattern' ||
		node.left.type === 'RestElement'
	) {
		// Turn assignment into an IIFE, so that `$.set` calls etc don't produce invalid code
		const tmp_id = context.state.scope.generate('tmp');

		/** @type {import('estree').AssignmentExpression[]} */
		const original_assignments = [];

		/** @type {import('estree').Expression[]} */
		const assignments = [];

		const paths = extract_paths(node.left);

		for (const path of paths) {
			const value = path.expression?.(b.id(tmp_id));
			const assignment = b.assignment('=', path.node, value);
			original_assignments.push(assignment);
			assignments.push(serialize_set_binding(assignment, context, () => assignment));
		}

		if (assignments.every((assignment, i) => assignment === original_assignments[i])) {
			// No change to output -> nothing to transform -> we can keep the original assignment
			return fallback();
		}

		return b.call(
			b.thunk(
				b.block([
					b.const(tmp_id, /** @type {import('estree').Expression} */ (visit(node.right))),
					b.stmt(b.sequence(assignments)),
					// return because it could be used in a nested expression where the value is needed.
					// example: { foo: ({ bar } = { bar: 1 })}
					b.return(b.id(tmp_id))
				])
			)
		);
	}

	if (node.left.type !== 'Identifier' && node.left.type !== 'MemberExpression') {
		error(node, 'INTERNAL', `Unexpected assignment type ${node.left.type}`);
	}

	let left = node.left;

	// Handle class private/public state assignment cases
	while (left.type === 'MemberExpression') {
		if (
			left.object.type === 'ThisExpression' &&
			left.property.type === 'PrivateIdentifier' &&
			context.state.private_state.has(left.property.name)
		) {
			const value = get_assignment_value(node, context);
			if (state.in_constructor) {
				// See if we should wrap value in $.proxy
				if (context.state.analysis.runes && should_proxy(value)) {
					const assignment = fallback();
					if (assignment.type === 'AssignmentExpression') {
						assignment.right = b.call('$.proxy', value);
						return assignment;
					}
				}
			} else {
				return b.call(
					'$.set',
					left,
					context.state.analysis.runes && should_proxy(value) ? b.call('$.proxy', value) : value
				);
			}
		} else if (
			left.object.type === 'ThisExpression' &&
			left.property.type === 'Identifier' &&
			context.state.public_state.has(left.property.name) &&
			state.in_constructor
		) {
			const value = get_assignment_value(node, context);
			// See if we should wrap value in $.proxy
			if (context.state.analysis.runes && should_proxy(value)) {
				const assignment = fallback();
				if (assignment.type === 'AssignmentExpression') {
					assignment.right = b.call('$.proxy', value);
					return assignment;
				}
			}
		}
		// @ts-expect-error
		left = left.object;
	}

	if (left.type !== 'Identifier') {
		return fallback();
	}

	const binding = state.scope.get(left.name);

	if (!binding) return fallback();

	if (binding.mutation !== null) {
		return binding.mutation(node, context);
	}

	if (binding.kind === 'legacy_reactive_import') {
		return b.call(
			'$$_import_' + binding.node.name,
			b.assignment(
				node.operator,
				/** @type {import('estree').Pattern} */ (visit(node.left)),
				/** @type {import('estree').Expression} */ (visit(node.right))
			)
		);
	}

	const is_store = binding.kind === 'store_sub';
	const left_name = is_store ? left.name.slice(1) : left.name;

	if (
		binding.kind !== 'state' &&
		binding.kind !== 'prop' &&
		binding.kind !== 'each' &&
		binding.kind !== 'legacy_reactive' &&
		!is_store
	) {
		// TODO error if it's a computed (or rest prop)? or does that already happen elsewhere?
		return fallback();
	}

	const value = get_assignment_value(node, context);

	const serialize = () => {
		if (left === node.left) {
			if (binding.kind === 'prop') {
				return b.call(left, value);
			} else if (is_store) {
				return b.call('$.store_set', serialize_get_binding(b.id(left_name), state), value);
			} else {
				return b.call(
					'$.set',
					b.id(left_name),
					context.state.analysis.runes && should_proxy(value) ? b.call('$.proxy', value) : value
				);
			}
		} else {
			if (is_store) {
				return b.call(
					'$.mutate_store',
					serialize_get_binding(b.id(left_name), state),
					b.assignment(
						node.operator,
						/** @type {import('estree').Pattern} */ (visit(node.left)),
						value
					),
					b.call('$' + left_name)
				);
			} else if (!state.analysis.runes) {
				if (binding.kind === 'prop') {
					return b.call(
						left,
						b.assignment(
							node.operator,
							/** @type {import('estree').Pattern} */ (visit(node.left)),
							value
						),
						b.literal(true)
					);
				} else {
					return b.call(
						'$.mutate',
						b.id(left_name),
						b.assignment(
							node.operator,
							/** @type {import('estree').Pattern} */ (visit(node.left)),
							value
						)
					);
				}
			} else {
				return b.assignment(
					node.operator,
					/** @type {import('estree').Pattern} */ (visit(node.left)),
					/** @type {import('estree').Expression} */ (visit(node.right))
				);
			}
		}
	};

	if (value.type === 'BinaryExpression' && /** @type {any} */ (value.operator) === '??') {
		return b.logical('??', serialize_get_binding(b.id(left_name), state), serialize());
	}

	return serialize();
}

/**
 * @param {import('estree').ArrowFunctionExpression | import('estree').FunctionExpression} node
 * @param {import('./types').ComponentContext} context
 */
export const function_visitor = (node, context) => {
	const metadata = node.metadata;

	let state = context.state;

	if (node.type === 'FunctionExpression') {
		const parent = /** @type {import('estree').Node} */ (context.path.at(-1));
		const in_constructor = parent.type === 'MethodDefinition' && parent.kind === 'constructor';

		state = { ...context.state, in_constructor };
	} else {
		state = { ...context.state, in_constructor: false };
	}

	if (metadata?.hoistable === true) {
		const params = serialize_hoistable_params(node, context);

		return /** @type {import('estree').FunctionExpression} */ ({
			...node,
			params,
			body: context.visit(node.body, state)
		});
	}

	context.next(state);
};

/**
 * @param {import('estree').FunctionDeclaration | import('estree').FunctionExpression | import('estree').ArrowFunctionExpression} node
 * @param {import('./types').ComponentContext} context
 * @returns {import('estree').Pattern[]}
 */
function get_hoistable_params(node, context) {
	const scope = context.state.scope;

	/** @type {import('estree').Pattern[]} */
	const params = [];
	let added_props = false;

	for (const [reference] of scope.references) {
		const binding = scope.get(reference);

		if (binding !== null && !scope.declarations.has(reference) && binding.initial !== node) {
			if (binding.kind === 'store_sub') {
				// We need both the subscription for getting the value and the store for updating
				params.push(b.id(binding.node.name.slice(1)));
				params.push(b.id(binding.node.name));
			} else if (
				// If we are referencing a simple $$props value, then we need to reference the object property instead
				binding.kind === 'prop' &&
				!binding.reassigned &&
				binding.initial === null &&
				!context.state.analysis.accessors &&
				context.state.analysis.runes
			) {
				// Handle $$props.something use-cases
				if (!added_props) {
					added_props = true;
					params.push(b.id('$$props'));
				}
			} else {
				// create a copy to remove start/end tags which would mess up source maps
				params.push(b.id(binding.node.name));
			}
		}
	}
	return params;
}

/**
 * @param {import('estree').FunctionDeclaration | import('estree').FunctionExpression | import('estree').ArrowFunctionExpression} node
 * @param {import('./types').ComponentContext} context
 * @returns {import('estree').Pattern[]}
 */
export function serialize_hoistable_params(node, context) {
	const hoistable_params = get_hoistable_params(node, context);
	node.metadata.hoistable_params = hoistable_params;

	/** @type {import('estree').Pattern[]} */
	const params = [];

	if (node.params.length === 0) {
		if (hoistable_params.length > 0) {
			// For the event object
			params.push(b.id('_'));
		}
	} else {
		for (const param of node.params) {
			params.push(/** @type {import('estree').Pattern} */ (context.visit(param)));
		}
	}

	params.push(...hoistable_params);
	return params;
}

/**
 * @param {import('#compiler').Binding} binding
 * @param {import('./types').ComponentClientTransformState} state
 * @param {string} name
 * @param {import('estree').Expression | null} [initial]
 * @returns
 */
export function get_prop_source(binding, state, name, initial) {
	/** @type {import('estree').Expression[]} */
	const args = [b.id('$$props'), b.literal(name)];

	let flags = 0;

	if (state.analysis.immutable) {
		flags |= PROPS_IS_IMMUTABLE;
	}

	if (state.analysis.runes) {
		flags |= PROPS_IS_RUNES;
	}

	if (
		state.analysis.accessors ||
		(state.analysis.immutable ? binding.reassigned : binding.mutated)
	) {
		flags |= PROPS_IS_UPDATED;
	}

	/** @type {import('estree').Expression | undefined} */
	let arg;

	if (initial) {
		// To avoid eagerly evaluating the right-hand-side, we wrap it in a thunk if necessary
		if (is_simple_expression(initial)) {
			arg = initial;
		} else {
			if (
				initial.type === 'CallExpression' &&
				initial.callee.type === 'Identifier' &&
				initial.arguments.length === 0
			) {
				arg = initial.callee;
			} else {
				arg = b.thunk(initial);
			}

			flags |= PROPS_IS_LAZY_INITIAL;
		}
	}

	if (flags || arg) {
		args.push(b.literal(flags));
		if (arg) args.push(arg);
	}

	return b.call('$.prop', ...args);
}

/**
 * Creates the output for a state declaration.
 * @param {import('estree').VariableDeclarator} declarator
 * @param {import('../../scope').Scope} scope
 * @param {import('estree').Expression} value
 */
export function create_state_declarators(declarator, scope, value) {
	// in the simple `let count = $state(0)` case, we rewrite `$state` as `$.source`
	if (declarator.id.type === 'Identifier') {
		return [b.declarator(declarator.id, b.call('$.mutable_source', value))];
	}

	const tmp = scope.generate('tmp');
	const paths = extract_paths(declarator.id);
	return [
		b.declarator(b.id(tmp), value), // TODO inject declarator for opts, so we can use it below
		...paths.map((path) => {
			const value = path.expression?.(b.id(tmp));
			const binding = scope.get(/** @type {import('estree').Identifier} */ (path.node).name);
			return b.declarator(
				path.node,
				binding?.kind === 'state' ? b.call('$.mutable_source', value) : value
			);
		})
	];
}

/** @param {import('estree').Expression} node */
export function should_proxy(node) {
	if (
		!node ||
		node.type === 'Literal' ||
		node.type === 'ArrowFunctionExpression' ||
		node.type === 'FunctionExpression' ||
		(node.type === 'Identifier' && node.name === 'undefined')
	) {
		return false;
	}

	return true;
}
