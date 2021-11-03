export default {
	html: `
		<label><input type="checkbox" value="1"> 1</label>
		<label><input type="checkbox" value="2"> 2</label>
		<label><input type="checkbox" value="3"> 3</label>
		<p>1</p>
		<label><input type="checkbox" value="1"> 1</label>
		<label><input type="checkbox" value="2"> 2</label>
		<label><input type="checkbox" value="3"> 3</label>
		<p>2</p>
		<label><input type="checkbox" value="1"> 1</label>
		<label><input type="checkbox" value="2"> 2</label>
		<label><input type="checkbox" value="3"> 3</label>
		<p></p>
		<label><input type="checkbox" value="1"> 1</label>
		<label><input type="checkbox" value="2"> 2</label>
		<label><input type="checkbox" value="3"> 3</label>
		<p>3</p>
	`,
	ssrHtml: `
		<label><input type="checkbox" value="1" checked> 1</label>
		<label><input type="checkbox" value="2"> 2</label>
		<label><input type="checkbox" value="3"> 3</label>
		<p>1</p>
		<label><input type="checkbox" value="1"> 1</label>
		<label><input type="checkbox" value="2" checked> 2</label>
		<label><input type="checkbox" value="3"> 3</label>
		<p>2</p>
		<label><input type="checkbox" value="1"> 1</label>
		<label><input type="checkbox" value="2"> 2</label>
		<label><input type="checkbox" value="3"> 3</label>
		<p></p>
		<label><input type="checkbox" value="1"> 1</label>
		<label><input type="checkbox" value="2"> 2</label>
		<label><input type="checkbox" value="3" checked> 3</label>
		<p>3</p>
	`,
	async test({ assert, component, target, window }) {
		const inputs = target.querySelectorAll('input');
		assert.equal(inputs[0].checked, true);
		assert.equal(inputs[1].checked, false);
		assert.equal(inputs[2].checked, false);

		assert.equal(inputs[3].checked, false);
		assert.equal(inputs[4].checked, true);
		assert.equal(inputs[5].checked, false);

		assert.equal(inputs[6].checked, false);
		assert.equal(inputs[7].checked, false);
		assert.equal(inputs[8].checked, false);

		assert.equal(inputs[9].checked, false);
		assert.equal(inputs[10].checked, false);
		assert.equal(inputs[11].checked, true);

		const event = new window.Event('change');

		inputs[2].checked = true;
		await inputs[2].dispatchEvent(event);

		assert.htmlEqual(target.innerHTML, `
			<label><input type="checkbox" value="1"> 1</label>
			<label><input type="checkbox" value="2"> 2</label>
			<label><input type="checkbox" value="3"> 3</label>
			<p>1, 3</p>
			<label><input type="checkbox" value="1"> 1</label>
			<label><input type="checkbox" value="2"> 2</label>
			<label><input type="checkbox" value="3"> 3</label>
			<p>2</p>
			<label><input type="checkbox" value="1"> 1</label>
			<label><input type="checkbox" value="2"> 2</label>
			<label><input type="checkbox" value="3"> 3</label>
			<p></p>
			<label><input type="checkbox" value="1"> 1</label>
			<label><input type="checkbox" value="2"> 2</label>
			<label><input type="checkbox" value="3"> 3</label>
			<p>3</p>
		`);

		inputs[9].checked = true;
		await inputs[9].dispatchEvent(event);

		assert.htmlEqual(target.innerHTML, `
			<label><input type="checkbox" value="1"> 1</label>
			<label><input type="checkbox" value="2"> 2</label>
			<label><input type="checkbox" value="3"> 3</label>
			<p>1, 3</p>
			<label><input type="checkbox" value="1"> 1</label>
			<label><input type="checkbox" value="2"> 2</label>
			<label><input type="checkbox" value="3"> 3</label>
			<p>2</p>
			<label><input type="checkbox" value="1"> 1</label>
			<label><input type="checkbox" value="2"> 2</label>
			<label><input type="checkbox" value="3"> 3</label>
			<p></p>
			<label><input type="checkbox" value="1"> 1</label>
			<label><input type="checkbox" value="2"> 2</label>
			<label><input type="checkbox" value="3"> 3</label>
			<p>1, 3</p>
		`);

		inputs[4].checked = false;
		await inputs[4].dispatchEvent(event);
		inputs[5].checked = true;
		await inputs[5].dispatchEvent(event);
		inputs[6].checked = true;
		await inputs[6].dispatchEvent(event);
		inputs[7].checked = true;
		await inputs[7].dispatchEvent(event);
		inputs[11].checked = false;
		await inputs[11].dispatchEvent(event);

		assert.htmlEqual(target.innerHTML, `
			<label><input type="checkbox" value="1"> 1</label>
			<label><input type="checkbox" value="2"> 2</label>
			<label><input type="checkbox" value="3"> 3</label>
			<p>1, 3</p>
			<label><input type="checkbox" value="1"> 1</label>
			<label><input type="checkbox" value="2"> 2</label>
			<label><input type="checkbox" value="3"> 3</label>
			<p>3</p>
			<label><input type="checkbox" value="1"> 1</label>
			<label><input type="checkbox" value="2"> 2</label>
			<label><input type="checkbox" value="3"> 3</label>
			<p>1, 2</p>
			<label><input type="checkbox" value="1"> 1</label>
			<label><input type="checkbox" value="2"> 2</label>
			<label><input type="checkbox" value="3"> 3</label>
			<p>1</p>
		`);

		component.selected_array_1 = [[3], [1]];
		component.selected_array_2 = [[], [2]];

		assert.equal(inputs[0].checked, false);
		assert.equal(inputs[1].checked, false);
		assert.equal(inputs[2].checked, true);

		assert.equal(inputs[3].checked, true);
		assert.equal(inputs[4].checked, false);
		assert.equal(inputs[5].checked, false);

		assert.equal(inputs[6].checked, false);
		assert.equal(inputs[7].checked, false);
		assert.equal(inputs[8].checked, false);

		assert.equal(inputs[9].checked, false);
		assert.equal(inputs[10].checked, true);
		assert.equal(inputs[11].checked, false);

		assert.htmlEqual(target.innerHTML, `
			<label><input type="checkbox" value="1"> 1</label>
			<label><input type="checkbox" value="2"> 2</label>
			<label><input type="checkbox" value="3"> 3</label>
			<p>3</p>
			<label><input type="checkbox" value="1"> 1</label>
			<label><input type="checkbox" value="2"> 2</label>
			<label><input type="checkbox" value="3"> 3</label>
			<p>1</p>
			<label><input type="checkbox" value="1"> 1</label>
			<label><input type="checkbox" value="2"> 2</label>
			<label><input type="checkbox" value="3"> 3</label>
			<p></p>
			<label><input type="checkbox" value="1"> 1</label>
			<label><input type="checkbox" value="2"> 2</label>
			<label><input type="checkbox" value="3"> 3</label>
			<p>2</p>
		`);
	}
};
