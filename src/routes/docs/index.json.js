import send from '@polka/send';
import get_sections from './_sections.js';
import { getCookie } from '../../modules/cookie.js'

let json;

export function get(req, res) {
	if (!json || process.env.NODE_ENV !== 'production') {
		const locale = getCookie('locale', req.headers.cookie);
		json = get_sections(locale);
	}

	send(res, 200, json);
}
