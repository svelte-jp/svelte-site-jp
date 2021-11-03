export default {
	skip_if_ssr: true,

	html: `
		<span>3</span>
		<span>2</span>
		<span>1</span>
	`,

	async test({ assert, component, target }) {
		await component.list.update();

		assert.htmlEqual(target.innerHTML, `
			<span>1</span>
			<span>2</span>
			<span>3</span>
			<span>4</span>
			<span>5</span>
		`);
	}
};
