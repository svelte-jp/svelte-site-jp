import send from '@polka/send';
import get_sections from './_sections.js';
import { getCookie } from '../../modules/cookie.js'

const cache = new Map();

export function get(req, res) {
	const locale = getCookie('locale', req.headers.cookie) || 'en';

	let json = cache.get(locale);
	if (!json) {
		json = get_sections(locale);
		cache.set(locale, json);
	}

	send(res, 200, json);
}
