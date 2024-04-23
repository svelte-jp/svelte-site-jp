import { is_hoistable_function } from '../../utils.js';
import * as b from '../../../../utils/builders.js';
import { extract_paths } from '../../../../utils/ast.js';
import { create_state_declarators, get_prop_source, serialize_get_binding } from '../utils.js';

/** @type {import('../types.js').ComponentVisitors} */
export const javascript_visitors_legacy = {
	VariableDeclaration(node, { state, visit }) {
		/** @type {import('estree').VariableDeclarator[]} */
		const declarations = [];

		for (const declarator of node.declarations) {
			const bindings = /** @type {import('#compiler').Binding[]} */ (
				state.scope.get_bindings(declarator)
			);
			const has_state = bindings.some((binding) => binding.kind === 'state');
			const has_props = bindings.some((binding) => binding.kind === 'prop');

			if (!has_state && !has_props) {
				const init = declarator.init;
				if (init != null && is_hoistable_function(init)) {
					const hoistable_function = visit(init);
					state.hoisted.push(
						b.declaration(
							'const',
							declarator.id,
							/** @type {import('estree').Expression} */ (hoistable_function)
						)
					);
					continue;
				}
				declarations.push(/** @type {import('estree').VariableDeclarator} */ (visit(declarator)));
				continue;
			}

			if (has_props) {
				if (declarator.id.type !== 'Identifier') {
					// Turn export let into props. It's really really weird because export let { x: foo, z: [bar]} = ..
					// means that foo and bar are the props (i.e. the leafs are the prop names), not x and z.
					const tmp = state.scope.generate('tmp');
					const paths = extract_paths(declarator.id);
					declarations.push(
						b.declarator(
							b.id(tmp),
							/** @type {import('estree').Expression} */ (
								visit(/** @type {import('estree').Expression} */ (declarator.init))
							)
						)
					);
					for (const path of paths) {
						const name = /** @type {import('estree').Identifier} */ (path.node).name;
						const binding = /** @type {import('#compiler').Binding} */ (state.scope.get(name));
						const value = path.expression?.(b.id(tmp));
						declarations.push(
							b.declarator(
								path.node,
								binding.kind === 'prop'
									? get_prop_source(binding, state, binding.prop_alias ?? name, value)
									: value
							)
						);
					}
					continue;
				}

				const binding = /** @type {import('#compiler').Binding} */ (
					state.scope.get(declarator.id.name)
				);

				if (
					state.analysis.accessors ||
					(state.analysis.immutable ? binding.reassigned : binding.mutated) ||
					declarator.init
				) {
					declarations.push(
						b.declarator(
							declarator.id,
							get_prop_source(
								binding,
								state,
								binding.prop_alias ?? declarator.id.name,
								declarator.init &&
									/** @type {import('estree').Expression} */ (visit(declarator.init))
							)
						)
					);
				}

				continue;
			}

			declarations.push(
				...create_state_declarators(
					declarator,
					state.scope,
					/** @type {import('estree').Expression} */ (declarator.init && visit(declarator.init))
				)
			);
		}

		if (declarations.length === 0) {
			return b.empty;
		}

		return {
			...node,
			declarations
		};
	},
	LabeledStatement(node, context) {
		if (context.path.length > 1 || node.label.name !== '$') {
			context.next();
			return;
		}

		const state = context.state;
		// To recreate Svelte 4 behaviour, we track the dependencies
		// the compiler can 'see', but we untrack the effect itself
		const reactive_stmt = /** @type {import('#compiler').ReactiveStatement} */ (
			state.analysis.reactive_statements.get(node)
		);

		if (!reactive_stmt) return; // not the instance context

		const { dependencies } = reactive_stmt;

		let serialized_body = /** @type {import('estree').Statement} */ (context.visit(node.body));

		if (serialized_body.type !== 'BlockStatement') {
			serialized_body = b.block([serialized_body]);
		}

		const body = serialized_body.body;
		const new_body = [];

		/** @type {import('estree').Expression[]} */
		const sequence = [];
		for (const binding of dependencies) {
			if (binding.kind === 'normal') continue;

			const name = binding.node.name;
			let serialized = serialize_get_binding(b.id(name), state);

			if (name === '$$props' || name === '$$restProps') {
				serialized = b.call('$.access_props', serialized);
			}

			sequence.push(serialized);
		}

		if (sequence.length > 0) {
			new_body.push(b.stmt(b.sequence(sequence)));
		}

		new_body.push(b.stmt(b.call('$.untrack', b.thunk(b.block(body)))));

		serialized_body.body = new_body;

		// these statements will be topologically ordered later
		state.legacy_reactive_statements.set(
			node,
			b.stmt(b.call('$.pre_effect', b.thunk(serialized_body)))
		);

		return b.empty;
	},
	BreakStatement(node, context) {
		if (!node.label || node.label.name !== '$') return;

		const in_reactive_statement =
			context.path[1].type === 'LabeledStatement' && context.path[1].label.name === '$';
		if (in_reactive_statement) {
			return b.return();
		}
	}
};
