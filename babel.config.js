module.exports = {
  // the published bundle is ES5, so older bundlers (webpack 4) and browsers can parse it
  presets: [['@babel/preset-env', { targets: 'ie 11' }], '@babel/preset-react']
};
