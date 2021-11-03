import Node from './shared/Node';
import PendingBlock from './PendingBlock';
import ThenBlock from './ThenBlock';
import CatchBlock from './CatchBlock';
import Expression from './shared/Expression';
import Component from '../Component';
import TemplateScope from './shared/TemplateScope';
import { TemplateNode } from '../../interfaces';
import { Context, unpack_destructuring } from './shared/Context';
import { Node as ESTreeNode } from 'estree';

export default class AwaitBlock extends Node {
	type: 'AwaitBlock';
	expression: Expression;

	then_contexts: Context[];
	catch_contexts: Context[];

	then_node: ESTreeNode | null;
	catch_node: ESTreeNode | null;

	pending: PendingBlock;
	then: ThenBlock;
	catch: CatchBlock;

	constructor(component: Component, parent: Node, scope: TemplateScope, info: TemplateNode) {
		super(component, parent, scope, info);

		this.expression = new Expression(component, this, scope, info.expression);

		this.then_node = info.value;
		this.catch_node = info.error;

		if (this.then_node) {
			this.then_contexts = [];
			unpack_destructuring(this.then_contexts, info.value);
		}

		if (this.catch_node) {
			this.catch_contexts = [];
			unpack_destructuring(this.catch_contexts, info.error);
		}

		this.pending = new PendingBlock(component, this, scope, info.pending);
		this.then = new ThenBlock(component, this, scope, info.then);
		this.catch = new CatchBlock(component, this, scope, info.catch);
	}
}
