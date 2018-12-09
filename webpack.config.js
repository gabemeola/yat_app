const createWebpackConfig = require('@zelz/crank/webpack');
const browserConfig = require('./webpack/browserConfig');
const serverConfig = require('./webpack/serverConfig');

const TARGET = process.env.BUILD_TARGET;
const dec = TARGET === 'server' ? serverConfig : browserConfig;

const config = createWebpackConfig({
  target: TARGET,
  rootPath: __dirname,
  ...dec,
  // analyze: true,
});

module.exports = config;
