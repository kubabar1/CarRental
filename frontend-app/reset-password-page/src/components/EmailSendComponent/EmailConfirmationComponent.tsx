import React from 'react';
import okIcon from '../../images/ok-icon.png';
import notOkIcon from '../../images/not-ok-icon.png';
import { loginPath } from '../../constants/Paths';
import './EmailConfirmationComponent.scss';
import qs from 'qs';
import { TranslationService } from '@car-rental/shared/service';

export function EmailConfirmationComponent(): JSX.Element {
    const isStatusOk = qs.parse(location.search, { ignoreQueryPrefix: true }).status == 'ok';

    return (
        <div id="reset-confirmation-page-container" className="container my-5 full-body-reset-confirm">
            <div className="col-md-4 offset-md-4 card-body shadow-lg">
                <div className="ok-icon-div">
                    <img className="mb-2 ok-icon" src={isStatusOk ? okIcon : notOkIcon} alt="" />
                </div>
                <h1 className="h3 mb-4 font-weight-normal text-center">
                    {isStatusOk
                        ? TranslationService.translate('emailConfirmationStatusOkSection')
                        : TranslationService.translate('emailConfirmationStatusNokSection')}
                </h1>
                <p className="mb-4 text-center">
                    {isStatusOk
                        ? TranslationService.translate('emailConfirmationStatusOk')
                        : TranslationService.translate('emailConfirmationStatusNok')}
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
