import * as path from 'path';
import * as fs from 'fs';
import * as http from 'http';
import { rollup } from 'rollup';
import virtual from '@rollup/plugin-virtual';
import puppeteer from 'puppeteer';

import {
	loadConfig,
	loadSvelte,
	mkdirp,
	prettyPrintPuppeteerAssertionError
} from '../helpers';
import { deepEqual } from 'assert';

const page = `
<body>
	<main></main>
	<script src='/bundle.js'></script>
</body>
`;

let svelte;
let server;
let code;
let browser;

const internal = path.resolve('internal/index.mjs');
const index = path.resolve('index.mjs');

function create_server() {
	return new Promise((fulfil, reject) => {
		const server = http.createServer((req, res) => {
			if (req.url === '/') {
				res.end(page);
			}

			if (req.url === '/bundle.js') {
				res.end(code);
			}
		});

		server.on('error', reject);

		server.listen('6789', () => {
			fulfil(server);
		});
	});
}

const assert = fs.readFileSync(`${__dirname}/assert.js`, 'utf-8');

describe('runtime (puppeteer)', () => {
	before(async () => {
		svelte = loadSvelte(false);
		console.log('[runtime-puppeteer] Loaded Svelte');
		server = await create_server();
		console.log('[runtime-puppeteer] Started server');
		browser = await puppeteer.launch();
		console.log('[runtime-puppeteer] Launched puppeteer browser');
	});

	after(async () => {
		if (server) server.close();
		if (browser) await browser.close();
	});

	const failed = new Set();

	function runTest(dir, hydrate) {
		if (dir[0] === '.') return;

		const config = loadConfig(`${__dirname}/samples/${dir}/_config.js`);
		const solo = config.solo || /\.solo/.test(dir);
		const skip = config.skip || /\.skip/.test(dir);

		if (hydrate && config.skip_if_hydrate) return;

		if (solo && process.env.CI) {
			throw new Error('Forgot to remove `solo: true` from test');
		}

		(skip ? it.skip : solo ? it.only : it)(`${dir} ${hydrate ? '(with hydration)' : ''}`, async () => {
			if (failed.has(dir)) {
				// this makes debugging easier, by only printing compiled output once
				throw new Error('skipping test, already failed');
			}

			const warnings = [];

			const bundle = await rollup({
				input: 'main',
				plugins: [
					{
						name: 'testing-runtime-puppeteer',
						resolveId(importee) {
							if (importee === 'svelte/internal' || importee === './internal') {
								return internal;
							}

							if (importee === 'svelte') {
								return index;
							}

							if (importee === 'main') {
								return 'main';
							}
						},
						load(id) {
							if (id === 'main') {
								return `
									import SvelteComponent from ${JSON.stringify(path.join(__dirname, 'samples', dir, 'main.svelte'))};
									import config from ${JSON.stringify(path.join(__dirname, 'samples', dir, '_config.js'))};
									import * as assert from 'assert';

									export default async function (target) {
										let unhandled_rejection = false;
										function unhandled_rejection_handler(event) {
											unhandled_rejection = event.reason;
										}
										window.addEventListener('unhandledrejection', unhandled_rejection_handler);

										try {
											if (config.before_test) config.before_test();

											const options = Object.assign({}, {
												target,
												hydrate: ${String(!!hydrate)},
												props: config.props,
												intro: config.intro
											}, config.options || {});

											const component = new SvelteComponent(options);

											if (config.html) {
												assert.htmlEqual(target.innerHTML, config.html);
											}

											if (config.test) {
												await config.test({
													assert,
													component,
													target,
													window,
												});

												component.$destroy();

												if (unhandled_rejection) {
													throw unhandled_rejection;
												}
											} else {
												component.$destroy();
												assert.htmlEqual(target.innerHTML, '');

												if (unhandled_rejection) {
													throw unhandled_rejection;
												}
											}

											if (config.after_test) config.after_test();
										} catch (error) {
											if (config.error) {
												assert.equal(err.message, config.error);
											} else {
												throw error;
											}
										} finally {
											window.removeEventListener('unhandledrejection', unhandled_rejection_handler);
										}
									}
								`;
							}
							return null;
						},
						transform(code, id) {
							if (id.endsWith('.svelte')) {
								const compiled = svelte.compile(code.replace(/\r/g, ''), {
									...config.compileOptions,
									hydratable: hydrate,
									immutable: config.immutable,
									accessors: 'accessors' in config ? config.accessors : true
								});

								const out_dir = `${__dirname}/samples/${dir}/_output/${hydrate ? 'hydratable' : 'normal'}`;
								const out = `${out_dir}/${path.basename(id).replace(/\.svelte$/, '.js')}`;

								if (fs.existsSync(out)) {
									fs.unlinkSync(out);
								}

								mkdirp(out_dir);
								fs.writeFileSync(out, compiled.js.code, 'utf8');

								compiled.warnings.forEach(w => warnings.push(w));

								return compiled.js;
							}
						}
					},
					virtual({ assert })
				]
			});

			const result = await bundle.generate({ format: 'iife', name: 'test' });
			code = result.output[0].code;

			const page = await browser.newPage();

			page.on('console', (type) => {
				console[type._type](type._text);
			});

			page.on('error', error => {
				console.log('>>> an error happened');
				console.error(error);
			});

			try {
				await page.goto('http://localhost:6789');

				const result = await page.evaluate(() => test(document.querySelector('main')));
				if (result) console.log(result);
			} catch (err) {
				failed.add(dir);
				prettyPrintPuppeteerAssertionError(err.message);
				throw err;
			} finally {
				if (config.warnings) {
					deepEqual(warnings.map(w => ({
						code: w.code,
						message: w.message,
						pos: w.pos,
						start: w.start,
						end: w.end
					})), config.warnings);
				} else if (warnings.length) {
					failed.add(dir);
					/* eslint-disable no-unsafe-finally */
					throw new Error('Received unexpected warnings');
				}
			}
		});
	}

	fs.readdirSync(`${__dirname}/samples`).forEach(dir => {
		runTest(dir, false);
		runTest(dir, true);
	});
});
