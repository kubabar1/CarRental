import React from 'react';
import carRentalLogo from '../images/car_rental_logo_name.png';
import './LoginComponent.scss';

export function LoginComponent(): JSX.Element {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        window.location.href = 'http://localhost:3000/';
    };

    return (
        <div id="login-page-container" className="container full_body_login">
            <div className="col-md-4 offset-md-4 card-body shadow-lg">
                <form onSubmit={handleSubmit}>
                    <img className="mb-4" src={carRentalLogo} alt="" width="100%" />
                    <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="inputLogin"
                            placeholder="Username"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword"
                            placeholder="Password"
                            required
                            autoComplete="off"
                        />
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>

                    <button className="btn btn-lg btn-primary btn-block" type="submit">
                        Sign in
                    </button>
                </form>
                <div className="row">
                    <p className="mt-3 login_link pl-3">
                        <a href={'http://localhost:3000/'} className="linkstyle">
                            Home
                        </a>
                    </p>
                    <p className="mt-3 ml-auto login_link pr-3">
                        <a href={'http://localhost:3000/registration'} className="linkstyle">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

// <div id="login-page-container" className="container my-5">
//     <div className="col-md-4 offset-md-4 card-body shadow-lg">
//         <img className="mb-4" th:src="@{/src/static/img/car_rental_logo_name.png}" alt="" width="100%">
//             <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
//
//             <form name="f" th:action="@{/login}" method="post">
//                 <div className="form-group">
//                     <input type="text" id="username" name="username" className="form-control" placeholder="Username"
//                            required autoFocus>
//                 </div>
//
//                 <div className="form-group">
//                     <input type="password" id="password" name="password" className="form-control" placeholder="Password"
//                            required>
//                 </div>
//
//                 <div className="checkbox mb-3">
//                     <label>
//                         <input type="checkbox" value="remember-me" id="rememberme" name="remember-me"> Remember me
//                     </label>
//                 </div>
//
//                 <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
//             </form>
//             <div className="row">
//                 <p className="mt-3 login_link pl-3"><a th:href="@{/}">Home</a></p>
//                 <p className="mt-3 ml-auto login_link pr-3"><a th:href="@{/registration}">Sign up</a></p>
//             </div>
//     </div>
// </div>