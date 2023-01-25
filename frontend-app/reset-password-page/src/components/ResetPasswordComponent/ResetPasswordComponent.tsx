import React, { useState } from 'react';
import carRentalLogo from '../../images/car_rental_logo_name.png';
import './ResetPasswordComponent.scss';
import { homePath, loginPath } from '../../constants/Paths';
import { checkIfUserWithEmailExists, ResponseData, sendResetPasswordEmail } from '../../services/ResetPasswordService';
import { UserEmailExistsDTO } from '../../model/UserEmailExistsDTO';
import { useHistory } from 'react-router-dom';

export function ResetPasswordComponent(): JSX.Element {
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [emailError, setEmailError] = useState<string | undefined>(undefined);
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(false);
    const history = useHistory();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (email) {
            setIsSubmitButtonDisabled(true);
            checkIfUserWithEmailExists(email)
                .then((userEmailExists: ResponseData<UserEmailExistsDTO>) => {
                    if (!userEmailExists.responseBody.userEmailExists) {
                        setEmailError('User with given email does not exists');
                    } else {
                        setEmailError(undefined);
                        sendResetPasswordEmail(email)
                            .then(() => {
                                history.push(`/reset-password/confirm-mail?status=ok`);
                            })
                            .catch(() => {
                                history.push(`/reset-password/confirm-mail?status=nok`);
                            });
                    }
                })
                .finally(() => {
                    setIsSubmitButtonDisabled(false);
                });
        } else {
            setEmailError('Email cannot be empty');
        }
    };

    return (
        <div id="reset-password-page-container" className="container full-body-password-reset">
            <div className="col-md-4 offset-md-4 card-body shadow-lg">
                <form onSubmit={handleSubmit}>
                    <img className="mb-4" src={carRentalLogo} alt="" width="100%" />
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            placeholder="Email"
                            required
                            autoFocus
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        {emailError && (
                            <div className="alert alert-danger custom-alert" role="alert">
                                {emailError}
                            </div>
                        )}
                    </div>

                    <button
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                        disabled={isSubmitButtonDisabled}
                    >
                        Reset password
                    </button>
                </form>
                <div className="row">
                    <p className="mt-3 reset-password-link pl-3">
                        <a href={homePath} className="linkstyle">
                            Home
                        </a>
                    </p>
                    <p className="mt-3 ml-auto reset-password-link pr-3">
                        <a href={loginPath} className="linkstyle">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
