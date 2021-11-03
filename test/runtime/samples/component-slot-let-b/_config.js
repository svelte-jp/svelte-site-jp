export default {
	html: `
		<button>+1</button>
		<span>0</span>
	`,

	async test({ assert, target, window }) {
		const button = target.querySelector('button');
		const click = new window.MouseEvent('click');

		await button.dispatchEvent(click);

		assert.htmlEqual(target.innerHTML, `
			<button>+1</button>
			<span>1</span>
		`);
	}
};
