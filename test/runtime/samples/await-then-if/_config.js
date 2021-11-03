let fulfil;

const thePromise = new Promise(f => {
	fulfil = f;
});

export default {
	props: {
		thePromise
	},

	html: `
		loading...
	`,

	async test({ assert, target }) {
		fulfil([]);

		await thePromise;

		assert.htmlEqual(target.innerHTML, `
			<p>promise array is empty</p>
		`);
	}
};
