import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const PORT = process.env.PORT || '5173';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.NODE_ENV = 'development';

async function createServer() {
	const app = express();

	const vite = await createViteServer({
		server: { middlewareMode: true },
		appType: 'custom'
	});

	app.use(vite.middlewares);

	app.use('*', async (req, res) => {
		if (req.originalUrl !== '/') {
			res.sendFile(path.resolve('./dist' + req.originalUrl));
			return;
		}

		const template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
		const transformed_template = await vite.transformIndexHtml(req.originalUrl, template);
		const { html: appHtml, head: headHtml } = await vite.ssrLoadModule('./src/entry-server.ts');

		const html = transformed_template
			.replace(`<!--ssr-html-->`, appHtml)
			.replace(`<!--ssr-head-->`, headHtml);

		res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
	});

	return { app, vite };
}

createServer()
	.then(({ app }) =>
		app.listen(PORT, () => {
			console.log(`http://localhost:${PORT}`);
		})
	)
	.catch((err) => {
		console.error('Error Starting Server:\n', err);
		process.exit(1);
	});
