export default {
	html: `
		<p>value(1) = 1</p>
		<p>foo=bar</p>
		<p>typeof cb=function</p>
		<button>Toggle Component</button>
	`,

	async test({ assert, window, target }) {
		const button = target.querySelector('button');
		await button.dispatchEvent(new window.Event('click'));
		assert.htmlEqual(
			target.innerHTML,
			`
				<p>value(2) = 2</p>
				<p>foo=bar</p>
				<p>typeof cb=function</p>
				<button>Toggle Component</button>
			`
		);
		await button.dispatchEvent(new window.Event('click'));
		assert.htmlEqual(
			target.innerHTML,
			`
				<p>value(1) = 1</p>
				<p>foo=bar</p>
				<p>typeof cb=function</p>
				<button>Toggle Component</button>
			`
		);
	}
};
