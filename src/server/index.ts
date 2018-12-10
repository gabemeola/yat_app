/* This File is for adding in Server steps that
   need to take place BEFORE server is started */

// Source Map Support for Node
import 'source-map-support/register';
// Polyfill Fetch for Node
import 'isomorphic-fetch';
// Polyfill URL and  URLSearchParams
// to global object until node version >= 10
import './polyfills/whatwg-url';
import startServer from './startServer';
import { PORT } from './constants';

// Kick off the Server
startServer(PORT);
