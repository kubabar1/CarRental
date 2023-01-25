import React from 'react';
import okIcon from '../../images/ok-icon.png';
import notOkIcon from '../../images/not-ok-icon.png';
import { loginPath } from '../../constants/Paths';
import './EmailConfirmationComponent.scss';
import qs from 'qs';

export function EmailConfirmationComponent(): JSX.Element {
    const isStatusOk = qs.parse(location.search, { ignoreQueryPrefix: true }).status == 'ok';

    return (
        <div id="reset-confirmation-page-container" className="container my-5 full-body-reset-confirm">
            <div className="col-md-4 offset-md-4 card-body shadow-lg">
                <div className="ok-icon-div">
                    <img className="mb-2 ok-icon" src={isStatusOk ? okIcon : notOkIcon} alt="" />
                </div>
                <h1 className="h3 mb-4 font-weight-normal text-center">{isStatusOk ? 'Check your email' : 'Error'}</h1>
                <p className="mb-4 text-center">
                    {isStatusOk
                        ? 'We have sent a password recover instructions to your email.'
                        : 'Please try again later'}
                </p>
                <p className="login-link pl-3">
                    <a href={loginPath} className="linkstyle">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
