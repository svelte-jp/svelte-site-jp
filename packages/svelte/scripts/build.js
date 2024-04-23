import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createBundle } from 'dts-buddy';

const dir = fileURLToPath(new URL('..', import.meta.url));
const pkg = JSON.parse(fs.readFileSync(`${dir}/package.json`, 'utf-8'));

// For people not using moduleResolution: 'bundler', we need to generate these files. Think about removing this in Svelte 6 or 7
// It may look weird, but the imports MUST be ending with index.js to be properly resolved in all TS modes
for (const name of ['action', 'animate', 'easing', 'motion', 'store', 'transition', 'legacy']) {
	fs.writeFileSync(`${dir}/${name}.d.ts`, "import './types/index.js';\n");
}

fs.writeFileSync(`${dir}/index.d.ts`, "import './types/index.js';\n");
fs.writeFileSync(`${dir}/compiler.d.ts`, "import './types/index.js';\n");

// TODO: Remove these in Svelte 6. They are here so that tooling (which historically made use of these) can support Svelte 4-6 in one minor version
fs.mkdirSync(`${dir}/types/compiler`, { recursive: true });
fs.writeFileSync(`${dir}/types/compiler/preprocess.d.ts`, "import '../index.js';\n");
fs.writeFileSync(`${dir}/types/compiler/interfaces.d.ts`, "import '../index.js';\n");

await createBundle({
	output: `${dir}/types/index.d.ts`,
	modules: {
		[pkg.name]: `${dir}/src/main/public.d.ts`,
		[`${pkg.name}/action`]: `${dir}/src/action/public.d.ts`,
		[`${pkg.name}/animate`]: `${dir}/src/animate/public.d.ts`,
		[`${pkg.name}/compiler`]: `${dir}/src/compiler/index.js`,
		[`${pkg.name}/easing`]: `${dir}/src/easing/index.js`,
		[`${pkg.name}/legacy`]: `${dir}/src/legacy/legacy-client.js`,
		[`${pkg.name}/motion`]: `${dir}/src/motion/public.d.ts`,
		[`${pkg.name}/server`]: `${dir}/src/server/index.js`,
		[`${pkg.name}/store`]: `${dir}/src/store/public.d.ts`,
		[`${pkg.name}/transition`]: `${dir}/src/transition/public.d.ts`,
		// TODO remove in Svelte 6
		[`${pkg.name}/types/compiler/preprocess`]: `${dir}/src/compiler/preprocess/legacy-public.d.ts`,
		[`${pkg.name}/types/compiler/interfaces`]: `${dir}/src/compiler/types/legacy-interfaces.d.ts`
	}
});
