const path = require('path');
const { mergeWebpackConfig, extend } = require('./constants');

const serverConfig = {
  entry: [
    path.join(__dirname, '..', 'src', 'server', 'index.ts'),
  ],
  mergeWebpackConfig,
  extend,
};

module.exports = serverConfig;
