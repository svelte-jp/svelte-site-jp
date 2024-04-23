import { test } from '../../test';

export default test({
	skip_if_ssr: 'permanent', // a separate SSR test exists

	compileOptions: {
		preserveComments: true
	},

	html: `
    <p>before</p>
    <!-- a comment -->
    <p>after</p>
  `
});
