import { test } from '../../test';

export default test({
	server_props: {
		browser: false
	},

	props: {
		browser: true
	},

	test(assert, target) {
		assert.equal(target.querySelector('a')?.getAttribute('href'), '/bar');
	},

	errors: [
		'The `href` attribute on `<a href="/bar">...</a>` changed its value between server and client renders. The client value, `/foo`, will be ignored in favour of the server value'
	]
});
