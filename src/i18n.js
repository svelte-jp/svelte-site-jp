// from https://github.com/kaisermann/sapper-template-i18n/blob/master/src/i18n.js
// svelte-i18n is awesome!!
import { get } from 'svelte/store';
import {
    register,
    init,
    getLocaleFromQueryString,
    locale as $locale,
    locales,
} from 'svelte-i18n';
import { setCookie, getCookie } from './modules/cookie.js';

export const defaultLocale = 'ja';

const INIT_OPTIONS = {
    fallbackLocale: defaultLocale,
    loadingDelay: 200,
    formats: {},
    warnOnMissingMessages: true,
};

let currentLocale = null;

register('en', () => import('../messages/en.json'));
register('ja', () => import('../messages/ja.json'));

$locale.subscribe((value) => {
    if (value == null) return;

    currentLocale = value;

    // if running in the client, save the language preference in a cookie
    if (typeof window !== 'undefined') {
        setCookie('locale', value);
    }
});

// initialize the i18n library in client
export function startClient() {
    init({
        ...INIT_OPTIONS,
        initialLocale: findLocaleFromQuery('lang') || getCookie('locale') || defaultLocale,
    });
}

export const findLocaleFromQuery = (key) => {
    const value = getLocaleFromQueryString(key)
    if (!value) {
        return value;
    }
    return get(locales).find(loc => loc === value);
}

export const getLocaleFromRequest = (req) => {
    return getLocaleFromQuery(req.query.locale) || getCookie('locale', req.headers.cookie) || defaultLocale;
}

export const getLocaleFromQueryOrStore = (value) => {
    return getLocaleFromQuery(value) || get($locale);
}

export const getLocaleFromQuery = (value) => {
    if (!value) {
        return value;
    }
    return get(locales).find(loc => loc === value);
}

// init only for routes (urls with no extensions such as .js, .css, etc) and for service worker
const DOCUMENT_REGEX = /(^([^.?#@]+)?([?#](.+)?)?|service-worker.*?\.html)$/;
// initialize the i18n library in the server and returns its middleware
export function i18nMiddleware() {
    // initialLocale will be set by the middleware
    init(INIT_OPTIONS);

    return (req, res, next) => {
        const isDocument = DOCUMENT_REGEX.test(req.originalUrl);
        // get the initial locale only for a document request
        if (!isDocument) {
            next();
            return;
        }

        let locale = getCookie('locale', req.headers.cookie);

        // no cookie, let's get the first accepted language
        if (locale == null) {
            if (req.headers['accept-language']) {
                const headerLang = req.headers['accept-language'].split(',')[0].trim();
                if (headerLang.length > 1) {
                    locale = headerLang;
                }
            } else {
                locale = INIT_OPTIONS.initialLocale || INIT_OPTIONS.fallbackLocale;
            }
        }

        if (locale != null && locale !== currentLocale) {
            $locale.set(locale);
        }

        next();
    };
}