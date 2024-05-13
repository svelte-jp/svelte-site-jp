import { test } from '../../test';

export default test({
	html: `
		<div style="color: red;"></div><div class="red"></div><div class="red"></div>
		<div style="color: red;"></div><div class="red"></div><div class="red"></div>
		<button>toggle</button
	`,

	async test({ assert, target }) {
		const [b1] = target.querySelectorAll('button');

		b1?.click();
		await Promise.resolve();
		assert.htmlEqual(
			target.innerHTML,
			`
				<div class="blue" style="color: blue;"></div><div class="blue"></div><div class="blue"></div>
				<div class="blue" style="color: blue;"></div><div class="blue"></div><div class="blue"></div>
				<button>toggle</button
		`
		);
	}
});
