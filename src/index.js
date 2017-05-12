import React from 'react';
import { render } from 'react-dom';
import App from './components/app';

require('./styles/main.less');

render(<App />, document.getElementById('app'));