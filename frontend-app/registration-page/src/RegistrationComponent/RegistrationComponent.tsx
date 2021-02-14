import React from 'react';
import carRentalLogo from '../images/car_rental_logo_name.png';
import './RegistrationComponent.scss';

export function RegistrationComponent(): JSX.Element {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div id="register-page-container" className="container my-5 full_body_register">
            <div className="col-md-6 offset-md-3 card-body shadow-lg">
                <form onSubmit={handleSubmit}>
                    <img className="mb-4" src={carRentalLogo} alt="" width="100%"/>
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
                        />
                    </div>

                    <button className="btn btn-lg btn-primary btn-block mt-5" type="submit">
                        Register
                    </button>
                </form>
                <p className="mt-3 login_link pl-3">
                    <a href={'http://localhost:3000/'} className="linkstyle">
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
//       <p className="mt-3 login_link pl-3"><a th:href="@{/}">Home</a></p>
//   </div>
// </div>
