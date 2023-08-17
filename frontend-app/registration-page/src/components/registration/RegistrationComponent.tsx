import React, { useState } from 'react';
import carRentalLogo from '../../images/car_rental_logo_name.png';
import './RegistrationComponent.scss';
import { homePath } from '@car-rental/shared/constant';
import { RegistrationService, TranslationService } from '@car-rental/shared/service';
import { CreateUserDTO, UserResponseDTO, ResponseData } from '@car-rental/shared/model';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Input } from './components/Input';
import { useHistory } from 'react-router-dom';

export function RegistrationComponent(): JSX.Element {
    const [firstName, setFirstName] = useState<string | undefined>(undefined);
    const [lastName, setLastName] = useState<string | undefined>(undefined);
    const [phone, setPhone] = useState<string | undefined>(undefined);
    const [birthDate, setBirthDate] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [matchingPassword, setMatchingPassword] = useState<string | undefined>(undefined);
    const [passwordScore, setPasswordScore] = useState<number>(0);

    const [firstNameError, setFirstNameError] = useState<string | undefined>(undefined);
    const [lastNameError, setLastNameError] = useState<string | undefined>(undefined);
    const [phoneError, setPhoneError] = useState<string | undefined>(undefined);
    const [birthDateError, setBirthDateError] = useState<string | undefined>(undefined);
    const [emailError, setEmailError] = useState<string | undefined>(undefined);
    const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
    const [matchingPasswordError, setMatchingPasswordError] = useState<string | undefined>(undefined);

    const history = useHistory();

    const EMAIL_PATTERN = /^[_A-Za-z0-9-+]+(.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$/;

    const cleanAllErrors = () => {
        setFirstNameError(undefined);
        setLastNameError(undefined);
        setPhoneError(undefined);
        setBirthDateError(undefined);
        setEmailError(undefined);
        setPasswordError(undefined);
        setMatchingPasswordError(undefined);
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
        if (!firstName) {
            setFirstNameError(TranslationService.translate('firstNameErrorRequired'));
            isValid = false;
        }
        if (!!firstName && firstName.length > 40) {
            setFirstNameError(TranslationService.translate('firstNameErrorMaxLen'));
            isValid = false;
        }

        if (!lastName) {
            setLastNameError(TranslationService.translate('lastNameErrorRequired'));
            isValid = false;
        }
        if (!!lastName && lastName.length > 40) {
            setLastNameError(TranslationService.translate('lastNameErrorMaxLen'));
            isValid = false;
        }

        if (!email) {
            setEmailError(TranslationService.translate('emailErrorRequired'));
            isValid = false;
        }
        if (!!email && !email.match(EMAIL_PATTERN)) {
            setEmailError(TranslationService.translate('emailErrorPattern'));
            isValid = false;
        }

        if (!phone) {
            setPhoneError(TranslationService.translate('phoneErrorRequired'));
            isValid = false;
        }
        if (!!phone && phone.length > 20) {
            setPhoneError(TranslationService.translate('phoneErrorMaxLen'));
            isValid = false;
        }

        if (!birthDate) {
            setBirthDateError(TranslationService.translate('birthDateErrorRequired'));
            isValid = false;
        }

        if (!password) {
            setPasswordError(TranslationService.translate('passwordErrorRequired'));
            isValid = false;
        }
        if (!!password && password.length < 8) {
            setPasswordError(TranslationService.translate('passwordErrorMinLen'));
            isValid = false;
        }
        if (!!password && password.length > 16) {
            setPasswordError(TranslationService.translate('passwordErrorMaxLen'));
            isValid = false;
        }
        if (passwordScore < 3) {
            setPasswordError(TranslationService.translate('passwordErrorScore'));
            isValid = false;
        }
        if (!!password && !hasNumber(password)) {
            setPasswordError(TranslationService.translate('passwordErrorNumber'));
            isValid = false;
        }
        if (!!password && !hasLowerCase(password)) {
            setPasswordError(TranslationService.translate('passwordErrorLowerCase'));
            isValid = false;
        }
        if (!!password && !hasUpperCase(password)) {
            setPasswordError(TranslationService.translate('passwordErrorUpperCase'));
            isValid = false;
        }
        if (!!password && hasWhiteSpace(password)) {
            setPasswordError(TranslationService.translate('passwordErrorWhiteSpace'));
            isValid = false;
        }
        if (!!password && !hasSpecialCharacter(password)) {
            setPasswordError(TranslationService.translate('passwordErrorSpecialCharacter'));
            isValid = false;
        }

        if (!matchingPassword) {
            setMatchingPasswordError(TranslationService.translate('matchingPasswordErrorRequired'));
            isValid = false;
        }
        if (!!matchingPassword && matchingPassword.length > 16) {
            setMatchingPasswordError(TranslationService.translate('matchingPasswordErrorMaxLen'));
            isValid = false;
        }
        if (matchingPassword !== password) {
            setMatchingPasswordError(TranslationService.translate('matchingPasswordErrorDiff'));
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        cleanAllErrors();
        if (validateUserData()) {
            /* eslint-disable @typescript-eslint/no-non-null-assertion */
            const createUserDTO: CreateUserDTO = new CreateUserDTO(
                firstName!,
                lastName!,
                email!,
                phone!,
                birthDate!,
                password!,
                matchingPassword!
            );
            /* eslint-enable @typescript-eslint/no-non-null-assertion */
            RegistrationService.registerUser(createUserDTO).then(
                (userResponse: ResponseData<UserResponseDTO | CreateUserDTO>) => {
                    if (userResponse.statusCode == 200) {
                        history.push('/registration/confirm-mail?status=ok');
                    } else {
                        const userErrors: CreateUserDTO = userResponse.responseBody as CreateUserDTO;
                        if (userErrors.firstName) {
                            setFirstNameError(userErrors.firstName);
                        }
                        if (userErrors.lastName) {
                            setLastNameError(userErrors.lastName);
                        }
                        if (userErrors.phone) {
                            setPhoneError(userErrors.phone);
                        }
                        if (userErrors.birthDate) {
                            setBirthDateError(userErrors.birthDate);
                        }
                        if (userErrors.email) {
                            setEmailError(userErrors.email);
                        }
                        if (userErrors.password) {
                            setPasswordError(userErrors.password);
                        }
                        if (userErrors.matchingPassword) {
                            setMatchingPasswordError(userErrors.matchingPassword);
                        }
                    }
                }
            );
        }
    };

    return (
        <div id="register-page-container" className="container my-5 full-body-register">
            <div className="col-md-6 offset-md-3 card-body shadow-lg">
                <form onSubmit={handleSubmit}>
                    <img className="mb-4" src={carRentalLogo} alt="" width="100%" />
                    <h1 className="h3 mb-3 font-weight-normal">{TranslationService.translate('registerHeader')}</h1>

                    <Input
                        label={TranslationService.translate('nameLabel')}
                        inputValue={firstName}
                        setInputValue={setFirstName}
                        inputType={'text'}
                        inputPlaceholder={TranslationService.translate('namePlaceholder')}
                        inputError={firstNameError}
                        autoFocus
                        required
                    />

                    <Input
                        label={TranslationService.translate('lastNameLabel')}
                        inputValue={lastName}
                        setInputValue={setLastName}
                        inputType={'text'}
                        inputPlaceholder={TranslationService.translate('lastNamePlaceholder')}
                        inputError={lastNameError}
                        required
                    />

                    <Input
                        label={TranslationService.translate('phoneLabel')}
                        inputValue={phone}
                        setInputValue={setPhone}
                        inputType={'text'}
                        inputPlaceholder={TranslationService.translate('phonePlaceholder')}
                        inputError={phoneError}
                        required
                    />

                    <Input
                        label={TranslationService.translate('birthDateLabel')}
                        inputValue={birthDate}
                        setInputValue={setBirthDate}
                        inputType={'date'}
                        inputPlaceholder={TranslationService.translate('birthDatePlaceholder')}
                        inputError={birthDateError}
                        max={new Date().toJSON().slice(0, 10)}
                        required
                    />

                    <Input
                        label={TranslationService.translate('emailLabel')}
                        inputValue={email}
                        setInputValue={setEmail}
                        inputType={'email'}
                        inputPlaceholder={TranslationService.translate('emailPlaceholder')}
                        inputError={emailError}
                        required
                    />

                    <Input
                        label={TranslationService.translate('passwordLabel')}
                        inputValue={password}
                        setInputValue={setPassword}
                        inputType={'password'}
                        inputPlaceholder={TranslationService.translate('passwordPlaceholder')}
                        inputError={passwordError}
                        required
                        autoComplete={false}
                    >
                        <PasswordStrengthBar
                            className="password-strength-bar-custom"
                            password={password}
                            minLength={8}
                            onChangeScore={setPasswordScore}
                            shortScoreWord={''}
                            scoreWords={[]}
                        />
                    </Input>

                    <Input
                        label={TranslationService.translate('passwordAgainLabel')}
                        inputValue={matchingPassword}
                        setInputValue={setMatchingPassword}
                        inputType={'password'}
                        inputPlaceholder={TranslationService.translate('passwordAgainPlaceholder')}
                        inputError={matchingPasswordError}
                        required
                        autoComplete={false}
                    />

                    <button className="btn btn-lg btn-primary btn-block mt-5" type="submit">
                        {TranslationService.translate('registerButton')}
                    </button>
                </form>
                <p className="mt-3 login-link pl-3">
                    <a href={homePath} className="linkstyle">
                        {TranslationService.translate('homeLink')}
                    </a>
                </p>
            </div>
        </div>
    );
}
