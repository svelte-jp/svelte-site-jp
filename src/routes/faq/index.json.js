import send from '@polka/send';
import get_faqs from './_faqs.js';
import { getLocaleFromRequest } from '../../i18n.js';

const lookup = new Map();

export function get(req, res) {
	const locale = getLocaleFromRequest(req);
	let json = lookup.get(locale);
	if (!json || process.env.NODE_ENV !== 'production') {
		const faqs = get_faqs(locale)
			.map(faq => {
				return {
					fragment: faq.fragment,
					answer: faq.answer,
					metadata: faq.metadata
				};
			});

		json = JSON.stringify(faqs);
		lookup.set(locale, json);
	}

	send(res, 200, json, {
		'Content-Type': 'application/json',
		'Cache-Control': `max-age=${5 * 60 * 1e3}` // 5 minutes
	});
}
