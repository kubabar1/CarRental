import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/scss/bootstrap.scss';
import './registration.scss';
import { RegistrationComponent } from './components/registration/RegistrationComponent';
import { RegistrationStatusComponent } from './components/registration-confirmation/RegistrationStatusComponent';
import { RegistrationInvalidTokenComponent } from './components/registration-invalid-token/RegistrationInvalidTokenComponent';

const basePath = '/registration';

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Switch>
                <Route exact path={`${basePath}`} component={RegistrationComponent} />
                <Route exact path={`${basePath}/confirm-mail`} component={RegistrationStatusComponent} />
                <Route
                    exact
                    path={`${basePath}/invalid-token`}
                    render={() => <RegistrationInvalidTokenComponent displayTokenExpiredMessage={false} />}
                />
                <Route
                    exact
                    path={`${basePath}/expired-token`}
                    render={() => <RegistrationInvalidTokenComponent displayTokenExpiredMessage={true} />}
                />
            </Switch>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);
