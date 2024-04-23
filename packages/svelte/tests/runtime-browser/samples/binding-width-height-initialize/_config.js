import { test } from '../../assert';

export default test({
	async test({ assert, component }) {
		// small timeout to allow the dimensions to be set
		await new Promise((r) => setTimeout(r, 100));
		assert.equal(component.toggle, true);
		assert.equal(component.offsetHeight, 800);
	}
});
