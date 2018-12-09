import { URL, URLSearchParams } from 'url';

/**
 * Polyfill URL and  URLSearchParams to global scope.
 * This matches node version >= 10
 * and is equivalent with the browser's API
 * https://developer.mozilla.org/en-US/docs/Web/API/URL
 */
global.URL = URL;
global.URLSearchParams = URLSearchParams;
