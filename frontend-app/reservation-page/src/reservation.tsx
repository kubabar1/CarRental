import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import 'bootstrap/scss/bootstrap.scss';
import { ReservationStepContainer } from './ReservationStepContainer/ReservationStepContainer';
import { reservationRootLink, unauthenticatedSubpageLink } from './constants/Links';
import { getAuthenticatedUserData } from './service/AuthenticationService';
import { AuthenticatedUserDTO } from './model/AuthenticatedUserDTO';
import { Button } from 'react-bootstrap';
import './reservation.scss';

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Route
                path={`${reservationRootLink}/:stepPage`}
                component={(): JSX.Element => {
                    const [authenticatedUser, setAuthenticatedUser] = React.useState<AuthenticatedUserDTO | undefined>(
                        undefined
                    );

                    React.useEffect(() => {
                        getAuthenticatedUserData().then((authUser: AuthenticatedUserDTO) => {
                            setAuthenticatedUser(authUser);
                        });
                    }, []);

                    if (authenticatedUser !== undefined && !authenticatedUser.authenticated) {
                        return <Redirect to={unauthenticatedSubpageLink} />;
                    } else if (authenticatedUser) {
                        return <ReservationStepContainer authenticatedUser={authenticatedUser} />;
                    }
                    return <div />;
                }}
            />
            <Route
                exact
                path={unauthenticatedSubpageLink}
                component={(): JSX.Element => {
                    return (
                        <div className="center-div-vertically-and-horizontally">
                            <div className="container-fluid">
                                <p>You need to authorize. Go to login page.</p>
                                <br />
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        window.location.href = '/login';
                                    }}
                                >
                                    Login
                                </Button>
                            </div>
                        </div>
                    );
                }}
            />
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);
