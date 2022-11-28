import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import carRentalLogo from '../images/car_rental_logo_name.png';
import './LoginComponent.scss';
import { homePath, registrationPath } from '../constants/Paths';
import { endpoints } from '../constants/PathsApi';

export function LoginComponent(): JSX.Element {
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<boolean>(false);
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const data = new URLSearchParams();
        if (!!username && !!password) {
            setUsernameError(false);
            setPasswordError(false);
            data.append('username', username);
            data.append('password', password);
            if (rememberMe) {
                data.append('remember-me', 'true');
            }
            setIsSubmitButtonDisabled(true);
            fetch(endpoints.login, {
                method: 'POST',
                // mode: 'cors',
                // cache: 'no-cache',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                // redirect: 'follow',
                // referrerPolicy: 'no-referrer',
                body: data,
            }).then((res: Response) => {
                if (res.status == 200) {
                    setLoginError(false);
                    window.location.href = homePath;
                } else {
                    setLoginError(true);
                }
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

    const handleRememberMe = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
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
                            placeholder="Username"
                            // required
                            autoFocus
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        {usernameError && (
                            <div className="alert alert-danger custom-alert" role="alert">
                                Username cannot be empty
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword"
                            placeholder="Password"
                            // required
                            autoComplete="off"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {passwordError && (
                            <div className="alert alert-danger custom-alert" role="alert">
                                Password cannot be empty
                            </div>
                        )}
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input
                                type="checkbox"
                                name="remember-me"
                                checked={rememberMe}
                                onChange={handleRememberMe}
                            />{' '}
                            Remember me
                        </label>
                    </div>

                    <button
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                        disabled={isSubmitButtonDisabled}
                    >
                        Sign in
                    </button>
                    {loginError && (
                        <div className="alert alert-danger custom-alert" role="alert">
                            Incorrect username or password
                        </div>
                    )}
                </form>
                <div className="row">
                    <p className="mt-3 login-link pl-3">
                        <a href={homePath} className="linkstyle">
                            Home
                        </a>
                    </p>
                    <p className="mt-3 ml-auto login-link pr-3">
                        <a href={registrationPath} className="linkstyle">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
