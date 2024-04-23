import { ok, test } from '../../test';

export default test({
	get props() {
		return { value: '' };
	},

	html: `
		<input>
		<p></p>
	`,

	ssrHtml: `
		<input value="">
		<p></p>
	`,

	async test({ assert, target, window }) {
		const input = target.querySelector('input');
		ok(input);

		const event = new window.Event('input');
		input.value = 'h';
		await input.dispatchEvent(event);

		assert.equal(input.value, 'H');
		assert.htmlEqual(
			target.innerHTML,
			`
			<input>
			<p>H</p>
		`
		);

		input.value = 'he';
		await input.dispatchEvent(event);
		assert.equal(input.value, 'HE');
		assert.htmlEqual(
			target.innerHTML,
			`
			<input>
			<p>HE</p>
		`
		);
	}
});
