import React from 'react';
import { render } from 'react-dom';
import App from './App';

require('./plugins/highlight/github.css');
require('./styles.css');
require('./custom.css');

render(<App />, document.getElementById('root'));
