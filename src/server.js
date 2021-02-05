import polka from 'polka';
import send from '@polka/send';
import sirv from 'sirv';
import * as sapper from '@sapper/server';
import { sanitize_user, authenticate } from './utils/auth';

import { i18nMiddleware } from './i18n.js';

const { PORT = 3000 } = process.env;

const app = polka({
	onError: (err, req, res) => {
		const error = err.message || err;
		const code = err.code || err.status || 500;
		res.headersSent || send(res, code, { error }, {
			'content-type': 'text/plain'
		});
	}
});

if (process.env.PGHOST) {
	app.use(authenticate());
}

app.use(
	sirv('static', {
		dev: process.env.NODE_ENV === 'development',
		setHeaders(res) {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.hasHeader('Cache-Control') || res.setHeader('Cache-Control', 'max-age=600'); // 10min default
		}
	}),

	// from https://github.com/kaisermann/sapper-template-i18n/blob/master/src/server.js
	i18nMiddleware(),

	sapper.middleware({
		session: req => ({
			user: sanitize_user(req.user)
		})
	})
);

app.listen(PORT);
