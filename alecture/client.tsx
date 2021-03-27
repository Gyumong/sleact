import React from 'react';
import {render} from 'react-dom';
// 잘되나
import App from '@layouts/App';
import { BrowserRouter } from 'react-router-dom';

render(<BrowserRouter><App/></BrowserRouter>,document.querySelector('#app'));