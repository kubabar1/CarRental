import React from 'react';
import okIcon from '../../images/ok-icon.png';
import notOkIcon from '../../images/not-ok-icon.png';
import './RegistrationConfirmationComponent.scss';
import { homePath } from '../../constants/PathsApi';
import qs from 'qs';

export function RegistrationStatusComponent(): JSX.Element {
    const isStatusOk = qs.parse(location.search, { ignoreQueryPrefix: true }).status == 'ok';

    return (
        <div id="register-confirmation-page-container" className="container my-5 full-body-register-confirm">
            <div className="col-md-4 offset-md-4 card-body shadow-lg">
                <div className="ok-icon-div">
                    <img className="mb-2 ok-icon" src={isStatusOk ? okIcon : notOkIcon} alt="" />
                </div>
                <h1 className="h3 mb-4 font-weight-normal text-center">
                    {isStatusOk ? 'Registration successful!' : 'Registration failed!'}
                </h1>
                <p className="mb-4 text-center">
                    {isStatusOk ? 'Please confirm Your email address' : 'Please try again later'}
                </p>
                <p className="login-link pl-3">
                    <a href={homePath} className="linkstyle">
                        Home
                    </a>
                </p>
            </div>
        </div>
    );
}
