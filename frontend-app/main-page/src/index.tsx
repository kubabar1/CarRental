import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { App } from './App';
import './index.scss';
import 'bootstrap/scss/bootstrap.scss';
import { TranslationService } from '@car-rental/shared/service';
import { translationsEn } from './translations/TranslationsEn';
import { translationsPl } from './translations/TranslationsPl';

TranslationService.configureDefault('main', translationsEn, translationsPl);

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Route path="/" component={App} />
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);
