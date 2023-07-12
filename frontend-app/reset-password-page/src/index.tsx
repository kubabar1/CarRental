import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/scss/bootstrap.scss';
import './index.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { EmailConfirmationComponent } from './components/EmailSendComponent/EmailConfirmationComponent';
import { UpdatePasswordComponent } from './components/UpdatePasswordComponent/UpdatePasswordComponent';
import { ResetPasswordComponent } from './components/ResetPasswordComponent/ResetPasswordComponent';
import { InvalidTokenComponent } from './components/IncorrectTokenComponent/InvalidTokenComponent';
import { translationsEn } from './translations/TranslationsEn';
import { translationsPl } from './translations/TranslationsPl';
import { TranslationService } from '@car-rental/shared/service';

TranslationService.configureDefault('resetPassword', translationsEn, translationsPl);

const basePath = '/reset-password';

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Switch>
                <Route exact path={`${basePath}`} component={ResetPasswordComponent} />
                <Route exact path={`${basePath}/confirm-mail`} component={EmailConfirmationComponent} />
                <Route exact path={`${basePath}/update`} component={UpdatePasswordComponent} />
                <Route exact path={`${basePath}/invalid-token`} component={InvalidTokenComponent} />
            </Switch>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);
