export default {
	props: {
		visible: false,
		rows: [1, 2, 3],
		cols: ['a', 'b', 'c']
	},

	html: '',

	compileOptions: {
		dev: true
	},

	test({ assert, component, target, raf }) {
		component.visible = true;
		assert.htmlEqual(target.innerHTML, `
			<div class="row">
				<div class="cell">1, a</div>
				<div class="cell">1, b</div>
				<div class="cell">1, c</div>
			</div>
			<div class="row">
				<div class="cell">2, a</div>
				<div class="cell">2, b</div>
				<div class="cell">2, c</div>
			</div>
			<div class="row">
				<div class="cell">3, a</div>
				<div class="cell">3, b</div>
				<div class="cell">3, c</div>
			</div>
		`);

		component.visible = false;
		raf.tick(0);
		raf.tick(100);
		assert.htmlEqual(target.innerHTML, '');
	}
};
