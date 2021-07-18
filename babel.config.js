module.exports = {
  ignore: ['node_modules'],
  presets: [
    ['@babel/preset-env', { targets: 'node >= 14' }],
    '@babel/preset-typescript',
  ],
};
