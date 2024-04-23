import { assert_ok, test } from '../../assert';

export default test({
	props: {
		rectColor1: 'green',
		circleColor1: 'red',
		rectColor2: 'black',
		circleColor2: 'blue'
	},
	html: `
		<svg xmlns="http://www.w3.org/2000/svg">
			<g style="--rect-color: green; --circle-color: red;">
				<g id="svg-1">
					<circle cx="50" cy="50" r="10" class="svelte-1qzlp1k"></circle>
					<rect width="100" height="100" class="svelte-1qzlp1k"></rect>
				</g>
			</g>
			<g style="--rect-color: black; --circle-color: blue;">
				<g id="svg-2">
					<circle cx="50" cy="50" r="10" class="svelte-1qzlp1k"></circle>
					<rect width="100" height="100" class="svelte-1qzlp1k"></rect>
				</g>
			</g>
		</svg>
	`,
	test({ component, assert, target }) {
		component.rectColor1 = 'yellow';
		component.circleColor2 = 'cyan';

		assert.htmlEqual(
			target.innerHTML,
			`
			<svg xmlns="http://www.w3.org/2000/svg">
				<g style="--rect-color: yellow; --circle-color: red;">
					<g id="svg-1">
						<circle cx="50" cy="50" r="10" class="svelte-1qzlp1k"></circle>
						<rect width="100" height="100" class="svelte-1qzlp1k"></rect>
					</g>
				</g>
				<g style="--rect-color: black; --circle-color: cyan;">
					<g id="svg-2">
						<circle cx="50" cy="50" r="10" class="svelte-1qzlp1k"></circle>
						<rect width="100" height="100" class="svelte-1qzlp1k"></rect>
					</g>
				</g>
			</svg>
		`
		);

		const circle_color1 = target.querySelector('#svg-1 circle');
		const rect_color1 = target.querySelector('#svg-1 rect');
		const circle_color2 = target.querySelector('#svg-2 circle');
		const rect_color2 = target.querySelector('#svg-2 rect');

		assert_ok(circle_color1);
		assert_ok(rect_color1);
		assert_ok(circle_color2);
		assert_ok(rect_color2);

		assert.htmlEqual(window.getComputedStyle(circle_color1).fill, 'rgb(255, 0, 0)');
		assert.htmlEqual(window.getComputedStyle(rect_color1).fill, 'rgb(255, 255, 0)');
		assert.htmlEqual(window.getComputedStyle(circle_color2).fill, 'rgb(0, 255, 255)');
		assert.htmlEqual(window.getComputedStyle(rect_color2).fill, 'rgb(0, 0, 0)');
	}
});
