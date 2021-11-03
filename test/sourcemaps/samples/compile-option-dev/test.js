import { SourceMapConsumer } from 'source-map';

const b64dec = s => Buffer.from(s, 'base64').toString();

export async function test({ assert, css,  js }) {

	// We check that the css source map embedded in the js is accurate
	const match = js.code.match(/\tappend_styles\(target, "svelte-.{6}", "(.*?)(?:\\n\/\*# sourceMappingURL=data:(.*?);charset=(.*?);base64,(.*?) \*\/)?"\);\n/);
	assert.notEqual(match, null);

	const [mimeType, encoding, cssMapBase64] = match.slice(2);
	assert.equal(mimeType, 'application/json');
	assert.equal(encoding, 'utf-8');

	const cssMapJson = b64dec(cssMapBase64);
	css.mapConsumer = await new SourceMapConsumer(cssMapJson);

	// TODO make util fn + move to test index.js
	const sourcefile = 'input.svelte';
	[
		// TODO how to get line + column numbers?
		[css, '--keep-me', 13, 2],
		[css, '--done-replace-once', 6, 5],
		[css, '--done-replace-twice', 9, 5]
	]
	.forEach(([where, content, line, column]) => {
		assert.deepEqual(
			where.mapConsumer.originalPositionFor(
				where.locate_1(content)
			),
			{
				source: sourcefile,
				name: null,
				line,
				column
			},
			`failed to locate "${content}" from "${sourcefile}"`
		);
	});
}
