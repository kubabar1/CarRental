import React, { ChangeEvent, useState } from 'react';
import carRentalLogo from '../images/car_rental_logo_name.png';
import './RegistrationComponent.scss';
import { homePath } from '../constants/PathsApi';
import { registerUser } from '../service/RegistrationService';
import { CreateUserDTO } from '../model/CreateUserDTO';
import { UserResponseDTO } from '../model/UserResponseDTO';

export function RegistrationComponent(): JSX.Element {
    const [firstName, setFirstName] = useState<string | undefined>(undefined);
    const [lastName, setLastName] = useState<string | undefined>(undefined);
    const [userName, setUserName] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [matchingPassword, setMatchingPassword] = useState<string | undefined>(undefined);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (firstName && lastName && userName && email && password && matchingPassword) {
            registerUser(new CreateUserDTO(firstName, lastName, userName, email, password, matchingPassword)).then(
                (userResponseDTO: UserResponseDTO) => {
                    console.log(userResponseDTO);
                }
            );
        }
    };

    return (
        <div id="register-page-container" className="container my-5 full-body-register">
            <div className="col-md-6 offset-md-3 card-body shadow-lg">
                <form onSubmit={handleSubmit}>
                    <img className="mb-4" src={carRentalLogo} alt="" width="100%" />
                    <h1 className="h3 mb-3 font-weight-normal">Register</h1>

                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            name="inputName"
                            placeholder="Name"
                            required
                            autoFocus
                            value={firstName}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setFirstName(event.target.value);
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputLastName"
                            name="inputLastName"
                            placeholder="Last Name"
                            required
                            value={lastName}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setLastName(event.target.value);
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputUsername"
                            name="inputUsername"
                            placeholder="Username"
                            required
                            value={userName}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setUserName(event.target.value);
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            name="inputEmail"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword"
                            name="inputPassword"
                            placeholder="Password"
                            required
                            autoComplete="off"
                            value={password}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password again:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputPasswordAgain"
                            name="inputPasswordAgain"
                            placeholder="Password"
                            required
                            autoComplete="off"
                            value={matchingPassword}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setMatchingPassword(event.target.value);
                            }}
                        />
                    </div>

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

// <div id="register-page-container" className="container my-5">
//   <div className="col-md-6 offset-md-3 card-body shadow-lg">
//     <img className="mb-4" th:src="@{/src/static/img/car_rental_logo_name.png}" alt="" width="100%">
//       <h1 className="h3 mb-3 font-weight-normal">Register</h1>
//
//       <form name="@{/registration}" th:object="${user}" th:action="@{/Registration}" method="post">
//         <div className="form-group">
//           <label>Name:</label>
//           <input type="text" className="form-control" id="inputName" th:field="*{name}" placeholder="Name" required
//                  autoFocus max="40">
//             <p className="alert alert-danger my-2" th:if="${#fields.hasErrors('name')}" th:errors="*{name}">Name
//               error</p>
//         </div>
//
//         <div className="form-group">
//           <label>Last name:</label>
//           <input type="text" className="form-control" id="inputLastName" th:field="*{surname}" placeholder="Surname"
//                  required ax="40">
//             <p className="alert alert-danger my-2" th:if="${#fields.hasErrors('surname')}"
//                th:errors="*{surname}">Surname error</p>
//         </div>
//
//         <div className="form-group">
//           <label>Login:</label>
//           <input type="text" className="form-control" id="inputUsername" th:field="*{login}" placeholder="Login"
//                  required min="6" max="40">
//             <p className="alert alert-danger my-2" th:if="${#fields.hasErrors('login')}" th:errors="*{login}">Login
//               error</p>
//         </div>
//
//         <div className="form-group">
//           <label>E-mail:</label>
//           <input type="email" className="form-control" id="inputEmail" th:field="*{email}" placeholder="E-mail"
//                  required>
//             <p className="alert alert-danger my-2" th:if="${#fields.hasErrors('email')}" th:errors="*{email}">Login
//               error</p>
//         </div>
//
//         <div className="form-group">
//           <label>Phone:</label>
//           <input type="text" className="form-control" id="inputPhone" th:field="*{phone}" placeholder="Phone" required
//                  max="20">
//             <p className="alert alert-danger my-2" th:if="${#fields.hasErrors('phone')}" th:errors="*{phone}">Login
//               error</p>
//         </div>
//
//         <div className="form-group" th:with="today=${#dates.format(standardDate, 'yyyy-MM-dd')}">
//           <label>Birth date:</label>
//           <input type="date" className="form-control" id="birthDate" th:field="*{birthDate}" th:max="${today}"
//                  placeholder="Birth date" required/>
//           <p className="alert alert-danger my-2" th:if="${#fields.hasErrors('birthDate')}"
//              th:errors="*{birthDate}">Birth date error</p>
//         </div>
//
//         <div className="form-group">
//           <label>Pesel:</label>
//           <input type="number" className="form-control" id="inputPesel" th:field="*{pesel}" placeholder="Pesel" required
//                  size="11">
//             <p className="alert alert-danger my-2" th:if="${#fields.hasErrors('pesel')}" th:errors="*{pesel}">Pesel
//               error</p>
//         </div>
//
//         <div className="form-group">
//           <label>Password:</label>
//           <input type="password" className="form-control" id="inputPassword" th:field="*{password}"
//                  placeholder="Password" required min="6" max="20">
//             <p className="alert alert-danger my-2" th:if="${#fields.hasErrors('password')}"
//                th:errors="*{password}">Password error</p>
//         </div>
//
//         <div className="form-group">
//           <label>Password again:</label>
//           <input type="password" className="form-control" id="inputPasswordAgain" th:field="*{passwordMatches}"
//                  placeholder="Password" required min="6" max="20">
//             <p className="alert alert-danger my-2" th:if="${#fields.hasErrors('passwordMatches')}"
//                th:errors="*{passwordMatches}">Password error</p>
//         </div>
//
//         <button className="btn btn-lg btn-primary btn-block mt-5" type="submit">Register</button>
//
//       </form>
//       <p className="mt-3 login-link pl-3"><a th:href="@{/}">Home</a></p>
//   </div>
// </div>
