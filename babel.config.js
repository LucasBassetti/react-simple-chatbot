const presets = ['@babel/env', '@babel/preset-react'];
const plugins = [
  '@babel/plugin-transform-arrow-functions',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-transform-object-assign'
];

module.exports = { presets, plugins };
