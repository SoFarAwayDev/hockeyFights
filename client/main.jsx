'use strict';



import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import "node_modules/video-react/dist/video-react.css";

import 'styles/main.css';

import Index from 'components/Index/Index';

render(<Index />, document.getElementById('js-main'));
