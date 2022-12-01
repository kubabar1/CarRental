import React from 'react';
import okIcon from '../../images/ok-icon.png';
import './RegistrationConfirmationComponent.scss';
import { homePath } from '../../constants/PathsApi';

export function RegistrationConfirmationComponent(): JSX.Element {
    return (
        <div id="register-confirmation-page-container" className="container my-5 full-body-register-confirm">
            <div className="col-md-4 offset-md-4 card-body shadow-lg">
                <div className="ok-icon-div">
                    <img className="mb-2 ok-icon" src={okIcon} alt="" />
                </div>
                <h1 className="h3 mb-4 font-weight-normal text-center">Registration successful!</h1>
                <p className="mb-4 text-center">Please confirm Your email address</p>
                <p className="login-link pl-3">
                    <a href={homePath} className="linkstyle">
                        Home
                    </a>
                </p>
            </div>
        </div>
    );
}
