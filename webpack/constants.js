const withBabel = require('@zelz/crank/webpack/plugins/withBabel');
const withLess = require('@zelz/crank/webpack/plugins/withLess');


exports.isDev = process.env.NODE_ENV !== 'production';
exports.mergeWebpackConfig = {
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
};
exports.extend = [
  withBabel(undefined, {
    testMatch: /\.[jt]sx?$/,
  }),
  withLess({
    modules: true,
  }),
];
