import React, { useEffect, useState } from 'react';
import notOkIcon from '../../images/not-ok-icon.png';
import './RegistrationInvalidTokenComponent.scss';
import { loginPath, USER_SERVICE_ENDPOINTS } from '@car-rental/shared/constant';
import qs from 'qs';
import { useLocation } from 'react-router-dom';
import { TranslationService } from '@car-rental/shared/service';

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

    const expiredTokenMessage = (tokenToSend: string): JSX.Element => {
        return (
            <div>
                {TranslationService.translate('tokenExpiredBegin')}
                <a href={USER_SERVICE_ENDPOINTS.RESEND_REGISTRATION_CONFIRM(tokenToSend)}>
                    {TranslationService.translate('tokenExpiredHere')}
                </a>
                {TranslationService.translate('tokenExpiredEnd')}
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
                <h1 className="h3 mb-4 font-weight-normal text-center">
                    {TranslationService.translate('invalidToken')}
                </h1>
                <p className="mb-4 text-center">
                    {displayTokenExpiredMessage && !!token
                        ? expiredTokenMessage(token)
                        : TranslationService.translate('invalidTokenMessage')}
                </p>
                <p className="login-link pl-3">
                    <a href={loginPath} className="linkstyle">
                        {TranslationService.translate('loginLink')}
                    </a>
                </p>
            </div>
        </div>
    );
}
