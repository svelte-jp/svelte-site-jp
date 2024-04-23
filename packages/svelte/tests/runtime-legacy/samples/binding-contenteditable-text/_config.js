import { ok, test } from '../../test';

export default test({
	get props() {
		return { name: 'world' };
	},

	html: `
		<editor contenteditable="true">world</editor>
		<p>hello world</p>
	`,

	async test({ assert, component, target, window }) {
		const el = target.querySelector('editor');
		ok(el);
		assert.equal(el.textContent, 'world');

		const event = new window.Event('input');

		el.textContent = 'everybody';
		await el.dispatchEvent(event);

		assert.htmlEqual(
			target.innerHTML,
			`
			<editor contenteditable="true">everybody</editor>
			<p>hello everybody</p>
		`
		);

		component.name = 'goodbye';
		assert.equal(el.textContent, 'goodbye');
		assert.htmlEqual(
			target.innerHTML,
			`
			<editor contenteditable="true">goodbye</editor>
			<p>hello goodbye</p>
		`
		);
	}
});
