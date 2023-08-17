import React, { useEffect, useState } from 'react';
import './UpdatePasswordComponent.scss';
import { useLocation } from 'react-router-dom';
import carRentalLogo from '../../images/car_rental_logo_name.png';
import { homePath, loginPath } from '@car-rental/shared/constant';
import qs from 'qs';
import { PasswordResetDTO } from '@car-rental/shared/model';
import PasswordStrengthBar from 'react-password-strength-bar';
import { ResetPasswordService, TranslationService } from '@car-rental/shared/service';
import { PasswordResetResponseDTO, ResponseData } from '@car-rental/shared/model';

export function UpdatePasswordComponent() {
    const [newPassword, setNewPassword] = useState<string | undefined>(undefined);
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>(undefined);
    const [newPasswordError, setNewPasswordError] = useState<string | undefined>(undefined);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | undefined>(undefined);
    const [tokenError, setTokenError] = useState<string | undefined>(undefined);
    const [token, setToken] = useState<string | undefined>(undefined);
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(false);
    const [passwordScore, setPasswordScore] = useState<number>(0);

    const location = useLocation();

    const getTokenFromUrl = (url: string): string => {
        return qs.parse(url, { ignoreQueryPrefix: true }).token as string;
    };

    useEffect(() => {
        setToken(getTokenFromUrl(location.search));
    }, [location.search]);

    const cleanAllErrors = () => {
        setNewPasswordError(undefined);
        setConfirmPasswordError(undefined);
        setTokenError(undefined);
    };

    const hasNumber = (val: string): boolean => {
        return /[0-9]/.test(val);
    };

    const hasWhiteSpace = (val: string): boolean => {
        return /\s/g.test(val);
    };

    const hasLowerCase = (val: string) => {
        return /[a-z]/.test(val);
    };

    const hasUpperCase = (val: string) => {
        return /[A-Z]/.test(val);
    };

    const hasSpecialCharacter = (val: string) => {
        return /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(val);
    };

    const validateUserData = (): boolean => {
        let isValid = true;

        if (!token) {
            setNewPasswordError(TranslationService.translate('noTokenError'));
            isValid = false;
        }

        if (!newPassword) {
            setNewPasswordError(TranslationService.translate('newPasswordErrorRequired'));
            isValid = false;
        }
        if (!!newPassword && newPassword.length < 8) {
            setNewPasswordError(TranslationService.translate('newPasswordErrorMinLen'));
            isValid = false;
        }
        if (!!newPassword && newPassword.length > 16) {
            setNewPasswordError(TranslationService.translate('newPasswordErrorMaxLen'));
            isValid = false;
        }
        if (passwordScore < 3) {
            setNewPasswordError(TranslationService.translate('newPasswordErrorWeak'));
            isValid = false;
        }
        if (!!newPassword && !hasNumber(newPassword)) {
            setNewPasswordError(TranslationService.translate('newPasswordErrorNumber'));
            isValid = false;
        }
        if (!!newPassword && !hasLowerCase(newPassword)) {
            setNewPasswordError(TranslationService.translate('newPasswordErrorLowerCase'));
            isValid = false;
        }
        if (!!newPassword && !hasUpperCase(newPassword)) {
            setNewPasswordError(TranslationService.translate('newPasswordErrorUpperCase'));
            isValid = false;
        }
        if (!!newPassword && hasWhiteSpace(newPassword)) {
            setNewPasswordError(TranslationService.translate('newPasswordErrorWhiteSpace'));
            isValid = false;
        }
        if (!!newPassword && !hasSpecialCharacter(newPassword)) {
            setNewPasswordError(TranslationService.translate('newPasswordErrorSpecialCharacter'));
            isValid = false;
        }

        if (!confirmPassword) {
            setConfirmPasswordError(TranslationService.translate('confirmPasswordErrorRequired'));
            isValid = false;
        }
        if (!!confirmPassword && confirmPassword.length > 16) {
            setConfirmPasswordError(TranslationService.translate('confirmPasswordErrorMaxLen'));
            isValid = false;
        }
        if (confirmPassword !== newPassword) {
            setConfirmPasswordError(TranslationService.translate('confirmPasswordErrorDiff'));
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        cleanAllErrors();
        if (validateUserData()) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const passwordResetDTO: PasswordResetDTO = new PasswordResetDTO(newPassword!, confirmPassword!, token!);
            setIsSubmitButtonDisabled(true);
            ResetPasswordService.resetUserPassword(passwordResetDTO)
                .then((passwordResetResponse: ResponseData<PasswordResetResponseDTO | PasswordResetDTO>) => {
                    if (passwordResetResponse.statusCode == 200) {
                        window.location.href = loginPath;
                    } else {
                        const errors: PasswordResetDTO = passwordResetResponse.responseBody as PasswordResetDTO;
                        if (errors.newPassword) {
                            setNewPasswordError(errors.newPassword);
                        }
                        if (errors.confirmPassword) {
                            setConfirmPasswordError(errors.confirmPassword);
                        }
                        if (errors.token) {
                            setTokenError(errors.token);
                        }
                    }
                })
                .finally(() => {
                    setIsSubmitButtonDisabled(false);
                });
        }
    };

    const renderInputAlert = (inputError: string | undefined) => {
        return (
            !!inputError && (
                <div className="alert alert-danger custom-alert mt-3" role="alert">
                    {inputError}
                </div>
            )
        );
    };

    return (
        <div id="reset-update-password-page-container" className="container full-body-password-reset-update">
            <div className="col-md-4 offset-md-4 card-body shadow-lg">
                <form onSubmit={handleSubmit}>
                    <img className="mb-4" src={carRentalLogo} alt="" width="100%" />
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder={TranslationService.translate('passwordPlaceholder')}
                            required
                            autoFocus
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                        />
                        <PasswordStrengthBar
                            className="password-strength-bar-custom"
                            password={newPassword}
                            minLength={8}
                            onChangeScore={setPasswordScore}
                            shortScoreWord={''}
                            scoreWords={[]}
                        />
                        {renderInputAlert(newPasswordError)}
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="passwordConfirm"
                            placeholder={TranslationService.translate('confirmPasswordPlaceholder')}
                            required
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                        {renderInputAlert(confirmPasswordError)}
                    </div>

                    {renderInputAlert(tokenError)}

                    <button
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                        disabled={isSubmitButtonDisabled}
                    >
                        {TranslationService.translate('updatePasswordButton')}
                    </button>
                </form>
                <div className="row">
                    <p className="mt-3 reset-password-link pl-3">
                        <a href={homePath} className="linkstyle">
                            {TranslationService.translate('homeLink')}
                        </a>
                    </p>
                    <p className="mt-3 ml-auto reset-password-link pr-3">
                        <a href={loginPath} className="linkstyle">
                            {TranslationService.translate('loginLink')}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
