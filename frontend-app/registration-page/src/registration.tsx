import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/scss/bootstrap.scss';
import './registration.scss';
import { RegistrationComponent } from './components/registration/RegistrationComponent';
import { RegistrationStatusComponent } from './components/registration-confirmation/RegistrationStatusComponent';

const basePath = '/registration';

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Switch>
                <Route exact path={`${basePath}`} component={RegistrationComponent} />
                <Route exact path={`${basePath}/confirm-mail`} component={RegistrationStatusComponent} />
            </Switch>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);
