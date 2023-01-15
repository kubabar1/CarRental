import React, { useState } from 'react';
import carRentalLogo from '../../images/car_rental_logo_name.png';
import './RegistrationComponent.scss';
import { homePath } from '../../constants/PathsApi';
import { registerUser } from '../../service/RegistrationService';
import { CreateUserDTO } from '../../model/CreateUserDTO';
import { UserResponseDTO } from '../../model/UserResponseDTO';
import PasswordStrengthBar from 'react-password-strength-bar';
import { ResponseData } from '../../service/FetchUtil';
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

    const [userResponseDTO, setUserResponseDTO] = useState<UserResponseDTO | undefined>(undefined);

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
            setFirstNameError('First name cannot be empty');
            isValid = false;
        }
        if (!!firstName && firstName.length > 40) {
            setFirstNameError('First name should be shorter than 40 characters');
            isValid = false;
        }

        if (!lastName) {
            setLastNameError('Last name cannot be empty');
            isValid = false;
        }
        if (!!lastName && lastName.length > 40) {
            setLastNameError('Last name should be shorter than 40 characters');
            isValid = false;
        }

        if (!email) {
            setEmailError('Email cannot be empty');
            isValid = false;
        }
        if (!!email && !email.match(EMAIL_PATTERN)) {
            setEmailError('Incorrect email');
            isValid = false;
        }

        if (!phone) {
            setPhoneError('Phone cannot be empty');
            isValid = false;
        }
        if (!!phone && phone.length > 20) {
            setPhoneError('Phone should be shorter than 20 characters');
            isValid = false;
        }

        if (!birthDate) {
            setBirthDateError('Birth date cannot be empty');
            isValid = false;
        }

        if (!password) {
            setPasswordError('Password cannot be empty');
            isValid = false;
        }
        if (!!password && password.length < 8) {
            setPasswordError('Password should be longer than 8 characters');
            isValid = false;
        }
        if (!!password && password.length > 16) {
            setPasswordError('Password should be shorter than 16 characters');
            isValid = false;
        }
        if (passwordScore < 3) {
            setPasswordError('Password is too weak');
            isValid = false;
        }
        if (!!password && !hasNumber(password)) {
            setPasswordError('Password should contain at least 1 number');
            isValid = false;
        }
        if (!!password && !hasLowerCase(password)) {
            setPasswordError('Password should contain at least 1 lower case character');
            isValid = false;
        }
        if (!!password && !hasUpperCase(password)) {
            setPasswordError('Password should contain at least 1 upper case character');
            isValid = false;
        }
        if (!!password && hasWhiteSpace(password)) {
            setPasswordError('Password should not contain whitespace character');
            isValid = false;
        }
        if (!!password && !hasSpecialCharacter(password)) {
            setPasswordError('Password should contain at least 1 special character');
            isValid = false;
        }

        if (!matchingPassword) {
            setMatchingPasswordError('Matching password cannot be empty');
            isValid = false;
        }
        if (!!matchingPassword && matchingPassword.length > 100) {
            setMatchingPasswordError('Matching password should be shorter than 100 characters');
            isValid = false;
        }
        if (matchingPassword !== password) {
            setMatchingPasswordError('Matching password is different from the password');
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
            registerUser(createUserDTO).then((userResponse: ResponseData<UserResponseDTO | CreateUserDTO>) => {
                if (userResponse.statusCode == 200) {
                    setUserResponseDTO(userResponse.responseBody as UserResponseDTO);
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
            });
        }
    };

    return (
        <div id="register-page-container" className="container my-5 full-body-register">
            <div className="col-md-6 offset-md-3 card-body shadow-lg">
                <form onSubmit={handleSubmit}>
                    <img className="mb-4" src={carRentalLogo} alt="" width="100%" />
                    <h1 className="h3 mb-3 font-weight-normal">Register</h1>

                    <Input
                        label={'Name:'}
                        inputValue={firstName}
                        setInputValue={setFirstName}
                        inputType={'text'}
                        inputPlaceholder={'Name'}
                        inputError={firstNameError}
                        autoFocus
                        required
                    />

                    <Input
                        label={'Last name:'}
                        inputValue={lastName}
                        setInputValue={setLastName}
                        inputType={'text'}
                        inputPlaceholder={'Last name'}
                        inputError={lastNameError}
                        required
                    />

                    <Input
                        label={'Phone:'}
                        inputValue={phone}
                        setInputValue={setPhone}
                        inputType={'text'}
                        inputPlaceholder={'Phone'}
                        inputError={phoneError}
                        required
                    />

                    <Input
                        label={'Birth date:'}
                        inputValue={birthDate}
                        setInputValue={setBirthDate}
                        inputType={'date'}
                        inputPlaceholder={'Birth date'}
                        inputError={birthDateError}
                        max={new Date().toJSON().slice(0, 10)}
                        required
                    />

                    <Input
                        label={'Email:'}
                        inputValue={email}
                        setInputValue={setEmail}
                        inputType={'email'}
                        inputPlaceholder={'Email'}
                        inputError={emailError}
                        required
                    />

                    <Input
                        label={'Password:'}
                        inputValue={password}
                        setInputValue={setPassword}
                        inputType={'password'}
                        inputPlaceholder={'Password'}
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
                        label={'Password again:'}
                        inputValue={matchingPassword}
                        setInputValue={setMatchingPassword}
                        inputType={'password'}
                        inputPlaceholder={'Password again'}
                        inputError={matchingPasswordError}
                        required
                        autoComplete={false}
                    />

                    <button className="btn btn-lg btn-primary btn-block mt-5" type="submit">
                        Register
                    </button>
                </form>
                <p className="mt-3 login-link pl-3">
                    <a href={homePath} className="linkstyle">
                        Home
                    </a>
                </p>
            </div>
        </div>
    );
}
