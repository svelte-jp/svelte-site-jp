import { test } from '../../test';
import { log } from './log.js';

export default test({
	html: `<button>0</button>`,

	before_test() {
		log.length = 0;
	},

	async test({ assert, target }) {
		const btn = target.querySelector('button');

		await btn?.click();
		assert.htmlEqual(target.innerHTML, `<button>1</button>`);

		await btn?.click();
		assert.htmlEqual(target.innerHTML, `<button>2</button>`);

		assert.deepEqual(log, [100]);
	}
});
