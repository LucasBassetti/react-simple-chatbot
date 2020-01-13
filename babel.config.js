const presets = ['@babel/env', '@babel/preset-react'];
const plugins = [
  '@babel/plugin-transform-arrow-functions',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-transform-object-assign',
  '@babel/plugin-transform-runtime'
];

module.exports = { presets, plugins };
