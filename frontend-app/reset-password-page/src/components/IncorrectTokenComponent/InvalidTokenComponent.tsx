import React from 'react';
import notOkIcon from '../../images/not-ok-icon.png';
import { loginPath } from '../../constants/Paths';
import './InvalidTokenComponent.scss';

export function InvalidTokenComponent(): JSX.Element {
    return (
        <div id="invalid-token-page-container" className="container my-5 full-body-invalid-token">
            <div className="col-md-4 offset-md-4 card-body shadow-lg">
                <div className="ok-icon-div">
                    <img className="mb-2 ok-icon" src={notOkIcon} alt="" />
                </div>
                <h1 className="h3 mb-4 font-weight-normal text-center">{'Invalid token'}</h1>
                <p className="mb-4 text-center">
                    {'Given token is invalid or expired - try reset Your password again.'}
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
