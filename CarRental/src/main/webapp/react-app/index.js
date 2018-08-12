import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import {App} from './App.js';

ReactDOM.render((
  <BrowserRouter>
    <Route path="/" component={App}/>
  </BrowserRouter>
), document.getElementById('root'));
