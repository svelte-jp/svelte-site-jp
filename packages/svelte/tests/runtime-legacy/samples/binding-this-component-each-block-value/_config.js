import { test } from '../../test';

export default test({
	skip_if_ssr: 'permanent', // there's no class instance to retrieve in SSR mode
	html: `
	<div>foo</div>
	<div>first has foo: true</div>
	<div>foo</div>
	<div>second has foo: true</div>
	<div>foo</div>
	<div>third has foo: true</div>
	`
});
