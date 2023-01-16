import React, { ChangeEvent, useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import PasswordStrengthBar from 'react-password-strength-bar';
import './ChangePasswordModal.scss';
import { PasswordUpdateDTO } from '../../../model/PasswordUpdateDTO';
import { updateUserPassword } from '../../../service/UserService';
import { UserResponseDTO } from '../../../model/UserResponseDTO';
import { ResponseData } from '../../../service/FetchUtil';

interface ChangePasswordModalProps {
    show: boolean;
    onHide: () => void;
}

export function ChangePasswordModal({ show, onHide }: ChangePasswordModalProps) {
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
            setCurrentPasswordError('Current password cannot be empty');
            isValid = false;
        }

        if (!newPassword) {
            setNewPasswordError('Password cannot be empty');
            isValid = false;
        }
        if (!!newPassword && newPassword.length < 8) {
            setNewPasswordError('Password should be longer than 8 characters');
            isValid = false;
        }
        if (!!newPassword && newPassword.length > 16) {
            setNewPasswordError('Password should be shorter than 16 characters');
            isValid = false;
        }
        if (passwordScore < 3) {
            setNewPasswordError('Password is too weak');
            isValid = false;
        }
        if (!!newPassword && !hasNumber(newPassword)) {
            setNewPasswordError('Password should contain at least 1 number');
            isValid = false;
        }
        if (!!newPassword && !hasLowerCase(newPassword)) {
            setNewPasswordError('Password should contain at least 1 lower case character');
            isValid = false;
        }
        if (!!newPassword && !hasUpperCase(newPassword)) {
            setNewPasswordError('Password should contain at least 1 upper case character');
            isValid = false;
        }
        if (!!newPassword && hasWhiteSpace(newPassword)) {
            setNewPasswordError('Password should not contain whitespace character');
            isValid = false;
        }
        if (!!newPassword && !hasSpecialCharacter(newPassword)) {
            setNewPasswordError('Password should contain at least 1 special character');
            isValid = false;
        }

        if (!confirmPassword) {
            setConfirmPasswordError('Matching password cannot be empty');
            isValid = false;
        }
        if (!!confirmPassword && confirmPassword.length > 16) {
            setConfirmPasswordError('Matching password should be shorter than 16 characters');
            isValid = false;
        }
        if (confirmPassword !== newPassword) {
            setConfirmPasswordError('Matching password is different from the password');
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
            updateUserPassword(passwordUpdateDTO).then(
                (passwordResponse: ResponseData<UserResponseDTO | PasswordUpdateDTO>) => {
                    if (passwordResponse.statusCode == 200) {
                        onHide();
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
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            className="change-password-modal"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Change password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Current password:</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder={'Current password'}
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
                        <label>New password:</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder={'New password'}
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
                        <label>Confirm password:</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder={'Confirm password'}
                            required
                            autoComplete={'off'}
                            value={confirmPassword}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setConfirmPassword(event.target.value);
                            }}
                        />
                        {renderInputAlert(confirmPasswordError)}
                    </div>

                    <div className="my-4 text-center">
                        <Button type="submit">Update password</Button>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
