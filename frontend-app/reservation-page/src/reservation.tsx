import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, useParams } from 'react-router-dom';
import 'bootstrap/scss/bootstrap.scss';
import { ReservationStepContainer } from './ReservationStepContainer/ReservationStepContainer';
import { reservationRootLink, reservationStatusSubpage, unauthenticatedSubpageLink } from './constants/Links';
import { AuthService } from '@car-rental/shared/service';
import { AuthenticatedUserDTO } from '@car-rental/shared/model';
import { Button } from 'react-bootstrap';
import './reservation.scss';
import {
    ReservationStatus,
    ReservationStatusComponent,
} from './ReservationStepContainer/components/RegistrationConfirmation/ReservationStatusComponent';
import { translationsEn } from './translations/TranslationsEn';
import { translationsPl } from './translations/TranslationsPl';
import { TranslationService } from '@car-rental/shared/service';

TranslationService.configureDefault('reservation', translationsEn, translationsPl);

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Route
                path={reservationRootLink}
                component={(): JSX.Element => {
                    const [authenticatedUser, setAuthenticatedUser] = React.useState<AuthenticatedUserDTO | undefined>(
                        undefined
                    );

                    React.useEffect(() => {
                        AuthService.getAuthenticatedUserData().then((authUser: AuthenticatedUserDTO) => {
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
                                <p>{TranslationService.translate('youNeedToAuthorizeText')}</p>
                                <br />
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        window.location.href = '/login';
                                    }}
                                >
                                    {TranslationService.translate('loginButton')}
                                </Button>
                            </div>
                        </div>
                    );
                }}
            />
            <Route
                path={reservationStatusSubpage}
                component={(): JSX.Element => {
                    const { reservationStatus } = useParams<{ reservationStatus: ReservationStatus }>();
                    return <ReservationStatusComponent reservationStatus={reservationStatus} />;
                }}
            />
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);
