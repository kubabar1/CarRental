import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { App } from './App'
import './index.scss';
import 'bootstrap/scss/bootstrap.scss';

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Route path="/" component={App} />
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
)
