import send from '@polka/send';
import get_faqs from './_faqs.js';
import { getCookie } from '../../modules/cookie.js'

const lookup = new Map();

export function get(req, res) {
	const locale = getCookie('locale', req.headers.cookie) || 'en';
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
		'Content-Type': 'application/json'
	});
}
