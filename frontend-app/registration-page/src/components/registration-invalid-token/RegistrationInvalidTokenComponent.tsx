import React, { useEffect, useState } from 'react';
import notOkIcon from '../../images/not-ok-icon.png';
import './RegistrationInvalidTokenComponent.scss';
import { loginPath } from '../../constants/PathsApi';
import qs from 'qs';
import { useLocation } from 'react-router-dom';

interface RegistrationInvalidTokenComponentProps {
    displayTokenExpiredMessage: boolean;
}

export function RegistrationInvalidTokenComponent({
    displayTokenExpiredMessage,
}: RegistrationInvalidTokenComponentProps): JSX.Element {
    const [token, setToken] = useState<string | undefined>(undefined);
    const location = useLocation();

    const getTokenFromUrl = (url: string): string => {
        return qs.parse(url, { ignoreQueryPrefix: true }).token as string;
    };

    useEffect(() => {
        setToken(getTokenFromUrl(location.search));
    }, [location.search]);

    const expiredTokenMessage = (): JSX.Element => {
        return (
            <div>
                {'Given token expired. Click '}
                <a href={`http://localhost:8080/registration/resend-registration-confirm?token=${token}`}>{'here'}</a>
                {' to resend verification mail.'}
            </div>
        );
    };

    return (
        <div
            id="invalid-registration-token-page-container"
            className="container my-5 full-body-invalid-registration-token"
        >
            <div className="col-md-4 offset-md-4 card-body shadow-lg">
                <div className="ok-icon-div">
                    <img className="mb-2 ok-icon" src={notOkIcon} alt="" />
                </div>
                <h1 className="h3 mb-4 font-weight-normal text-center">{'Invalid registration token'}</h1>
                <p className="mb-4 text-center">
                    {displayTokenExpiredMessage ? expiredTokenMessage() : 'Given token is invalid.'}
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