import React, { useState } from 'react';
import carRentalLogo from '../images/car_rental_logo_name.png';
import './LoginComponent.scss';
import { homePath, registrationPath } from '@car-rental/shared/constant';
import { TranslationService, AuthService } from '@car-rental/shared/service';

export function LoginComponent(): JSX.Element {
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<boolean>(false);
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const data: URLSearchParams = new URLSearchParams();
        if (!!username && !!password) {
            setUsernameError(false);
            setPasswordError(false);
            data.append('username', username);
            data.append('password', password);
            setIsSubmitButtonDisabled(true);
            AuthService.login(data)
                .then((res: Response) => {
                    if (res.status == 200) {
                        setLoginError(false);
                        window.location.href = homePath;
                    } else {
                        setLoginError(true);
                    }
                    setIsSubmitButtonDisabled(false);
                })
                .finally(() => {
                    setIsSubmitButtonDisabled(false);
                });
        } else {
            if (username) {
                setUsernameError(false);
            } else {
                setUsernameError(true);
            }
            if (password) {
                setPasswordError(false);
            } else {
                setPasswordError(true);
            }
        }
    };

    return (
        <div id="login-page-container" className="container full-body-login">
            <div className="col-md-4 offset-md-4 card-body shadow-lg">
                <form onSubmit={handleSubmit}>
                    <img className="mb-4" src={carRentalLogo} alt="" width="100%" />

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="inputLogin"
                            placeholder={TranslationService.translate('username')}
                            required
                            autoFocus
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        {usernameError && (
                            <div className="alert alert-danger custom-alert" role="alert">
                                {TranslationService.translate('usernameError')}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword"
                            placeholder={TranslationService.translate('password')}
                            required
                            autoComplete="off"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {passwordError && (
                            <div className="alert alert-danger custom-alert" role="alert">
                                {TranslationService.translate('passwordError')}
                            </div>
                        )}
                    </div>

                    <button
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                        disabled={isSubmitButtonDisabled}
                    >
                        {TranslationService.translate('signIn')}
                    </button>
                    {loginError && (
                        <div className="alert alert-danger custom-alert" role="alert">
                            {TranslationService.translate('loginError')}
                        </div>
                    )}
                </form>
                <div className="forgot-password">
                    <a href="/reset-password">{TranslationService.translate('forgotPassword')}</a>
                </div>
                <div className="row">
                    <p className="mt-3 login-link pl-3">
                        <a href={homePath} className="linkstyle">
                            {TranslationService.translate('homeLink')}
                        </a>
                    </p>
                    <p className="mt-3 ml-auto login-link pr-3">
                        <a href={registrationPath} className="linkstyle">
                            {TranslationService.translate('registerLink')}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
