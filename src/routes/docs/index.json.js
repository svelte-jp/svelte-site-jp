import send from '@polka/send';
import get_sections from './_sections.js';
import { getLocaleFromRequest } from '../../i18n.js'

const cache = new Map();

export function get(req, res) {
	const locale = getLocaleFromRequest(req);

	let json = cache.get(locale);
	if (!json) {
		json = get_sections(locale);
		cache.set(locale, json);
	}

	send(res, 200, json);
}
