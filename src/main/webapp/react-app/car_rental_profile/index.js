import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import {Profile} from './Profile.js';

ReactDOM.render((
  <BrowserRouter>
    <Route path="/" component={Profile}/>
  </BrowserRouter>
), document.getElementById('root_profile'));
