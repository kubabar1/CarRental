import React from 'react';
import notOkIcon from '../../images/not-ok-icon.png';
import { loginPath } from '@car-rental/shared/constant';
import './InvalidTokenComponent.scss';
import { TranslationService } from '@car-rental/shared/service';

export function InvalidTokenComponent(): JSX.Element {
    return (
        <div id="invalid-token-page-container" className="container my-5 full-body-invalid-token">
            <div className="col-md-4 offset-md-4 card-body shadow-lg">
                <div className="ok-icon-div">
                    <img className="mb-2 ok-icon" src={notOkIcon} alt="" />
                </div>
                <h1 className="h3 mb-4 font-weight-normal text-center">
                    {TranslationService.translate('invalidTokenErrorHeader')}
                </h1>
                <p className="mb-4 text-center">{TranslationService.translate('invalidTokenError')}</p>
                <p className="login-link pl-3">
                    <a href={loginPath} className="linkstyle">
                        {TranslationService.translate('loginLink')}
                    </a>
                </p>
            </div>
        </div>
    );
}
