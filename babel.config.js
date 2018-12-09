const mode = process.env.BUILD_TARGET === 'browser' ? 'browser' : 'node';
const env = process.env.NODE_ENV;

module.exports = (api) => {
  api.cache(() => mode + env);

  return {
    presets: [
      '@babel/preset-typescript',
      ['@zelz/crank/babel', {
        mode,
        targets: mode === 'node'
          ? null
          : {
            browsers: ['last 2 Chrome versions', 'not dead'],
          },
      }],
    ],
    // plugins: [
    //   'react-hot-loader/babel',
    // ],
    env: {
      test: {
        plugins: [
          '@babel/plugin-transform-modules-commonjs',
        ],
      },
    },
  };
};
