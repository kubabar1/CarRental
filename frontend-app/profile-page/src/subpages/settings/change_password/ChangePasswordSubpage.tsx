import React, { ChangeEvent, useState } from 'react';
import { SubpageContainer } from '../../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../../components/subpage/content/SubpageContent';
import { FormContainer } from '../../../components/form/form-group/FormContainer';
import { PasswordUpdateDTO, UserResponseDTO, ResponseData } from '@car-rental/shared/model';
import PasswordStrengthBar from 'react-password-strength-bar/dist';
import { TranslationService, UserService } from '@car-rental/shared/service';
import './ChangePasswordSubpage.scss';

export function ChangePasswordSubpage(): JSX.Element {
    const [currentPassword, setCurrentPassword] = useState<string | undefined>(undefined);
    const [newPassword, setNewPassword] = useState<string | undefined>(undefined);
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>(undefined);

    const [currentPasswordError, setCurrentPasswordError] = useState<string | undefined>(undefined);
    const [newPasswordError, setNewPasswordError] = useState<string | undefined>(undefined);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | undefined>(undefined);

    const [passwordScore, setPasswordScore] = useState<number>(0);

    const cleanAllErrors = () => {
        setCurrentPasswordError(undefined);
        setNewPasswordError(undefined);
        setConfirmPasswordError(undefined);
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

        if (!currentPassword) {
            setCurrentPasswordError(TranslationService.translate('currentPasswordChangePasswordSubpageRequired'));
            isValid = false;
        }

        if (!newPassword) {
            setNewPasswordError(TranslationService.translate('passwordChangePasswordSubpageRequired'));
            isValid = false;
        }
        if (!!newPassword && newPassword.length < 8) {
            setNewPasswordError(TranslationService.translate('newPasswordChangePasswordSubpageMinLength'));
            isValid = false;
        }
        if (!!newPassword && newPassword.length > 16) {
            setNewPasswordError(TranslationService.translate('newPasswordChangePasswordSubpageMaxLength'));
            isValid = false;
        }
        if (passwordScore < 3) {
            setNewPasswordError(TranslationService.translate('newPasswordChangePasswordSubpageScoreLow'));
            isValid = false;
        }
        if (!!newPassword && !hasNumber(newPassword)) {
            setNewPasswordError(TranslationService.translate('newPasswordPasswordChangePasswordSubpageNumber'));
            isValid = false;
        }
        if (!!newPassword && !hasLowerCase(newPassword)) {
            setNewPasswordError(TranslationService.translate('newPasswordPasswordChangePasswordSubpageLowerCase'));
            isValid = false;
        }
        if (!!newPassword && !hasUpperCase(newPassword)) {
            setNewPasswordError(TranslationService.translate('newPasswordChangePasswordSubpageUpperCase'));
            isValid = false;
        }
        if (!!newPassword && hasWhiteSpace(newPassword)) {
            setNewPasswordError(TranslationService.translate('newPasswordChangePasswordSubpageWhiteSpace'));
            isValid = false;
        }
        if (!!newPassword && !hasSpecialCharacter(newPassword)) {
            setNewPasswordError(TranslationService.translate('newPasswordChangePasswordSubpageSpecialCharacter'));
            isValid = false;
        }

        if (!confirmPassword) {
            setConfirmPasswordError(TranslationService.translate('confirmPasswordChangePasswordSubpageRequired'));
            isValid = false;
        }
        if (!!confirmPassword && confirmPassword.length > 16) {
            setConfirmPasswordError(TranslationService.translate('confirmPasswordChangePasswordSubpageMaxLength'));
            isValid = false;
        }
        if (confirmPassword !== newPassword) {
            setConfirmPasswordError(TranslationService.translate('confirmPasswordChangePasswordSubpageDifferent'));
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        cleanAllErrors();
        if (validateUserData()) {
            /* eslint-disable @typescript-eslint/no-non-null-assertion */
            const passwordUpdateDTO: PasswordUpdateDTO = new PasswordUpdateDTO(
                currentPassword!,
                newPassword!,
                confirmPassword!
            );
            /* eslint-enable @typescript-eslint/no-non-null-assertion */
            UserService.updateUserPassword(passwordUpdateDTO).then(
                (passwordResponse: ResponseData<UserResponseDTO | PasswordUpdateDTO>) => {
                    if (passwordResponse.statusCode == 200) {
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                    } else {
                        const passwordResponseErrors: PasswordUpdateDTO = passwordResponse.responseBody as PasswordUpdateDTO;
                        if (passwordResponseErrors.currentPassword) {
                            setCurrentPasswordError(passwordResponseErrors.currentPassword);
                        }
                        if (passwordResponseErrors.newPassword) {
                            setNewPasswordError(passwordResponseErrors.newPassword);
                        }
                        if (passwordResponseErrors.confirmPassword) {
                            setConfirmPasswordError(passwordResponseErrors.confirmPassword);
                        }
                    }
                }
            );
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
        <SubpageContainer className="change-password-container">
            <SubpageHeader title={TranslationService.translate('changePasswordSubpageTitle')} />
            <SubpageContent>
                <FormContainer
                    onSubmit={handleSubmit}
                    submitButtonValue={TranslationService.translate('changePasswordSubpageUpdatePasswordButton')}
                >
                    <div className="form-group">
                        <label>{TranslationService.translate('currentPasswordChangePasswordSubpageLabel')}</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder={TranslationService.translate(
                                'currentPasswordChangePasswordSubpagePlaceholder'
                            )}
                            autoFocus
                            required
                            autoComplete={'off'}
                            value={currentPassword}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setCurrentPassword(event.target.value);
                            }}
                        />
                        {renderInputAlert(currentPasswordError)}
                    </div>

                    <div className="form-group">
                        <label>{TranslationService.translate('newPasswordChangePasswordSubpageLabel')}</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder={TranslationService.translate('newPasswordChangePasswordSubpagePlaceholder')}
                            required
                            autoComplete={'off'}
                            value={newPassword}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setNewPassword(event.target.value);
                            }}
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
                        <label>{TranslationService.translate('confirmPasswordChangePasswordSubpageLabel')}</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder={TranslationService.translate(
                                'confirmPasswordChangePasswordSubpagePlaceholder'
                            )}
                            required
                            autoComplete={'off'}
                            value={confirmPassword}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setConfirmPassword(event.target.value);
                            }}
                        />
                        {renderInputAlert(confirmPasswordError)}
                    </div>
                </FormContainer>
            </SubpageContent>
        </SubpageContainer>
    );
}
