export default {
	props: {
		x: 1
	},

	test({ component }) {
		component.$destroy();
		component.x = 2;
	}
};
