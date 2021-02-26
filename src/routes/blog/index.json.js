import send from '@polka/send';
import get_posts from './_posts.js';
import { getCookie } from '../../modules/cookie.js'

const cache = new Map();

export function get(req, res) {
	const locale = getCookie('locale', req.headers.cookie) || 'en';

	let json = cache.get(locale);
	if (!json || process.env.NODE_ENV !== 'production') {
		const posts = get_posts(locale)
			.filter(post => !post.metadata.draft)
			.map(post => {
				return {
					slug: post.slug,
					metadata: post.metadata
				};
			});

		json = JSON.stringify(posts);
	}

	send(res, 200, json, {
		'Content-Type': 'application/json'
	});
}
