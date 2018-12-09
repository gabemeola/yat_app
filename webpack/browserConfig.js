const path = require('path');
const { mergeWebpackConfig, extend } = require('./constants');


const browserConfig = {
  entry: [
    // Main App Entry Point
    path.join(__dirname, '..', 'src', 'app', 'index.tsx'),
    // Base Global LESS Files
    path.join(__dirname, '..', 'src', 'app', 'styles', 'index.less'),
  ],
  template: {
    template: path.join(__dirname, '..', 'src', 'server', 'templates', 'index.ejs'),
    // filename: path.join(__dirname, '..', 'lib', 'templates', 'index.ejs'),
    filename: path.join(__dirname, '..', 'public', 'index.html'),
  },
  mergeWebpackConfig,
  extend,
};


module.exports = browserConfig;
