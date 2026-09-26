/* eslint-disable */
require('global-jsdom')('', { url: 'http://localhost/' });

const { configure } = require('enzyme');
const Adapter = require('@cfaester/enzyme-adapter-react-18').default;

configure({ adapter: new Adapter() });

Object.defineProperty(window.navigator, 'userAgent', {
  value: 'node.js',
  configurable: true
});

function noop() {
  return null;
}

require.extensions['.mp3'] = noop;
