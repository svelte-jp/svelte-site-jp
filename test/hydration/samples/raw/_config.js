export default {
	skip: true, // existing nodes are blown away

	props: {
		raw: '<p>this is some html</p> <p>and so is this</p>'
	},

	snapshot(target) {
		const ps = target.querySelectorAll('p');

		return {
			p0: ps[0],
			text0: ps[0].firstChild,
			p1: ps[1],
			text1: ps[1].firstChild
		};
	},

	test(assert, target, snapshot) {
		const ps = target.querySelectorAll('p');

		assert.equal(ps[0], snapshot.p0);
		assert.equal(ps[0].firstChild, snapshot.text0);
		assert.equal(ps[1], snapshot.p1);
		assert.equal(ps[1].firstChild, snapshot.text1);
	}
};
