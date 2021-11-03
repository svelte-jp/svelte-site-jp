export default {
	test(assert, vars) {
		assert.deepEqual(vars, [
			{
				name: 'i',
				export_name: null,
				injected: false,
				module: false,
				mutated: false,
				reassigned: false,
				referenced: false,
				writable: false,
				referenced_from_script: false
			},
			{
				name: 'j',
				export_name: null,
				injected: false,
				module: false,
				mutated: false,
				reassigned: false,
				referenced: false,
				writable: false,
				referenced_from_script: false
			},
			{
				name: 'k',
				export_name: null,
				injected: false,
				module: false,
				mutated: false,
				reassigned: false,
				referenced: false,
				writable: false,
				referenced_from_script: false
			},
			{
				name: 'a',
				export_name: null,
				injected: false,
				module: false,
				mutated: false,
				reassigned: true,
				referenced: false,
				writable: true,
				referenced_from_script: true
			},
			{
				name: 'b',
				export_name: null,
				injected: false,
				module: false,
				mutated: false,
				reassigned: false,
				referenced: false,
				writable: true,
				referenced_from_script: true
			},
			{
				name: 'c',
				export_name: null,
				injected: false,
				module: false,
				mutated: false,
				reassigned: false,
				referenced: false,
				writable: true,
				referenced_from_script: true
			},
			{
				name: 'd',
				export_name: null,
				injected: false,
				module: false,
				mutated: false,
				reassigned: false,
				referenced: false,
				writable: true,
				referenced_from_script: true
			},
			{
				name: 'e',
				export_name: null,
				injected: false,
				module: false,
				mutated: false,
				reassigned: false,
				referenced: false,
				writable: true,
				referenced_from_script: false
			},
			{
				name: 'f',
				export_name: 'f',
				injected: false,
				module: false,
				mutated: false,
				reassigned: false,
				referenced: false,
				writable: true,
				referenced_from_script: false
			},
			{
				name: 'g',
				export_name: null,
				injected: false,
				module: false,
				mutated: false,
				reassigned: false,
				referenced: false,
				writable: true,
				referenced_from_script: true
			},
			{
				name: 'h',
				export_name: null,
				injected: false,
				module: false,
				mutated: false,
				reassigned: true,
				referenced: false,
				writable: true,
				referenced_from_script: true
			},
			{
				name: 'foo',
				export_name: null,
				injected: false,
				module: false,
				mutated: false,
				reassigned: false,
				referenced: false,
				writable: false,
				referenced_from_script: false
			},
			{
				name: 'l',
				export_name: null,
				injected: false,
				module: false,
				mutated: false,
				reassigned: false,
				referenced: false,
				referenced_from_script: true,
				writable: false
			},
			{
				name: 'bar',
				export_name: 'bar',
				injected: false,
				module: false,
				mutated: false,
				reassigned: false,
				referenced: false,
				writable: false,
				referenced_from_script: false
			}
		]);
	}
};
