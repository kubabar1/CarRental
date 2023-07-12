import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/scss/bootstrap.scss';
import './index.scss';
import { LoginComponent } from './LoginComponent/LoginComponent';
import { TranslationService } from '@car-rental/shared/service';
import { translationsEn } from './translations/TranslationsEn';
import { translationsPl } from './translations/TranslationsPl';

TranslationService.configureDefault('login', translationsEn, translationsPl);

ReactDOM.render(<LoginComponent />, document.getElementById('root'));
