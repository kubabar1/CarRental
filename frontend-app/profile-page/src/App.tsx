import React, { useEffect, useState } from 'react';
import { Navigation } from './components/nav/Navigation';
import { Switch } from 'react-router-dom';
import { AuthService, TranslationService } from '@car-rental/shared/service';
import {
    bookingsAuditLogsListLink,
    bookingsListLink,
    equipmentListLink,
    locationAddLink,
    locationsListLink,
    myBookingsListLink,
    myRentedBookingsListLink,
    myReservedBookingsListLink,
    profileRootLink,
    rentedBookingsListLink,
    reservedBookingsListLink,
    roleAddLink,
    sendEmailLink,
    settingsAutomationLink,
    settingsChangePasswordLink,
    settingsUserSettingsLink,
    userEditLink,
    userRolesListLink,
    usersListLink,
    vehicleAddLink,
    vehicleEditLink,
    vehicleEquipmentEditLink,
    vehicleOptionsListLink,
    vehiclesListLink,
} from './constants/Links';
import { WelcomeSubpage } from './subpages/welcome/WelcomeSubpage';
import { UserSettingsSubpage } from './subpages/settings/user_settings/UserSettingsSubpage';
import { ChangePasswordSubpage } from './subpages/settings/change_password/ChangePasswordSubpage';
import { UsersListSubpage } from './subpages/users/UsersListSubpage';
import { LocationsListSubpage } from './subpages/locations/LocationsListSubpage';
import { UsersRolesListSubpage } from './subpages/users_roles/UsersRolesListSubpage';
import { AddRoleSubpage } from './subpages/users/AddRoleSubpage';
import { EmailSubpage } from './subpages/emails/EmailSubpage';
import { UsersEditSubpage } from './subpages/users/UserEditSubpage';
import { VehicleListSubpage } from './subpages/vehicles/VehicleListSubpage';
import { VehicleEditSubpage } from './subpages/vehicles/VehicleEditSubpage';
import { VehicleAddSubpage } from './subpages/vehicles/VehicleAddSubpage';
import { VehicleEquipmentEditSubpage } from './subpages/vehicles/VehicleEquipmentEditSubpage';
import { EquipmentListSubpage } from './subpages/vehicles/EquipmentListSubpage';
import { BookingsListSubpage } from './subpages/booking/BookingsListSubpage';
import { ReservedBookingsListSubpage } from './subpages/booking/ReservedBookingsListSubpage';
import { RentedBookingsListSubpage } from './subpages/booking/RentedBookingsListSubpage';
import { MyBookingsListSubpage } from './subpages/booking/MyBookingsListSubpage';
import { MyRentedBookingsListSubpage } from './subpages/booking/MyRentedBookingsListSubpage';
import { BookingsAuditLogsListSubpage } from './subpages/booking/BookingsAuditLogsListSubpage';
import { MyReservedBookingsListSubpage } from './subpages/booking/MyReservedBookingsListSubpage';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { userHasAnyRole } from './utils/UserUtils';
import { Button } from 'react-bootstrap';
import { VehicleOptionsSubpage } from './subpages/vehicles/VehicleOptionsSubpage';
import { LocationAddSubpage } from './subpages/locations/LocationAddSubpage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthenticatedUserDTO } from '@car-rental/shared/model';
import { AutomationSubpage } from './subpages/settings/automation/AutomationSubpage';

export function App(): JSX.Element {
    const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUserDTO | undefined>(undefined);

    useEffect(() => {
        AuthService.getAuthenticatedUserData().then((authenticatedUserDTO: AuthenticatedUserDTO) =>
            setAuthenticatedUser(authenticatedUserDTO)
        );
    }, []);

    const runLogout = (): void => {
        AuthService.logout().then(() => {
            window.location.href = '/';
        });
    };

    return (
        <div className="container-fluid">
            {authenticatedUser &&
                (authenticatedUser.authenticated ? (
                    <div className="row">
                        <Navigation authenticatedUser={authenticatedUser} runLogout={runLogout} />
                        <Switch>
                            {/*WELCOME_PAGE*/}
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    profileRootLink.permittedRoles
                                )}
                                path={profileRootLink.link}
                                exact
                                component={WelcomeSubpage}
                            />

                            {/*BOOKINGS_PAGE*/}
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    bookingsListLink.permittedRoles
                                )}
                                path={bookingsListLink.link}
                                exact
                                component={BookingsListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    reservedBookingsListLink.permittedRoles
                                )}
                                path={reservedBookingsListLink.link}
                                exact
                                component={ReservedBookingsListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    rentedBookingsListLink.permittedRoles
                                )}
                                path={rentedBookingsListLink.link}
                                exact
                                component={RentedBookingsListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    myBookingsListLink.permittedRoles
                                )}
                                path={myBookingsListLink.link}
                                exact
                                component={MyBookingsListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    myReservedBookingsListLink.permittedRoles
                                )}
                                path={myReservedBookingsListLink.link}
                                exact
                                component={MyReservedBookingsListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    myRentedBookingsListLink.permittedRoles
                                )}
                                path={myRentedBookingsListLink.link}
                                exact
                                component={MyRentedBookingsListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    bookingsAuditLogsListLink.permittedRoles
                                )}
                                path={bookingsAuditLogsListLink.link}
                                exact
                                component={BookingsAuditLogsListSubpage}
                            />

                            {/*USERS_PAGE*/}
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(authenticatedUser.userRoles, usersListLink.permittedRoles)}
                                path={usersListLink.link}
                                exact
                                component={UsersListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(authenticatedUser.userRoles, userEditLink.permittedRoles)}
                                path={userEditLink.link}
                                exact
                                component={UsersEditSubpage}
                            />

                            {/*VEHICLES_PAGE*/}
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    vehiclesListLink.permittedRoles
                                )}
                                path={vehiclesListLink.link}
                                exact
                                component={VehicleListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    vehicleEditLink.permittedRoles
                                )}
                                path={vehicleEditLink.link}
                                exact
                                component={VehicleEditSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    vehicleEquipmentEditLink.permittedRoles
                                )}
                                path={vehicleEquipmentEditLink.link}
                                exact
                                component={VehicleEquipmentEditSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    vehicleAddLink.permittedRoles
                                )}
                                path={vehicleAddLink.link}
                                exact
                                component={VehicleAddSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    equipmentListLink.permittedRoles
                                )}
                                path={equipmentListLink.link}
                                exact
                                component={EquipmentListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    vehicleOptionsListLink.permittedRoles
                                )}
                                path={vehicleOptionsListLink.link}
                                exact
                                component={VehicleOptionsSubpage}
                            />

                            {/*USER_ROLES_PAGE*/}
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    userRolesListLink.permittedRoles
                                )}
                                path={userRolesListLink.link}
                                exact
                                component={UsersRolesListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(authenticatedUser.userRoles, roleAddLink.permittedRoles)}
                                path={roleAddLink.link}
                                component={AddRoleSubpage}
                            />

                            {/*LOCATIONS_PAGE*/}
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    locationsListLink.permittedRoles
                                )}
                                path={locationsListLink.link}
                                exact
                                component={LocationsListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    settingsUserSettingsLink.permittedRoles
                                )}
                                path={locationAddLink.link}
                                exact
                                component={LocationAddSubpage}
                            />

                            {/*EMAIL_PAGE*/}
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(authenticatedUser.userRoles, sendEmailLink.permittedRoles)}
                                path={sendEmailLink.link}
                                exact
                                component={EmailSubpage}
                            />

                            {/*SETTINGS_PAGE*/}
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    settingsUserSettingsLink.permittedRoles
                                )}
                                path={settingsUserSettingsLink.link}
                                exact
                                component={() => (
                                    <UserSettingsSubpage
                                        authenticatedUser={authenticatedUser}
                                        setAuthenticatedUser={setAuthenticatedUser}
                                    />
                                )}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    settingsChangePasswordLink.permittedRoles
                                )}
                                path={settingsChangePasswordLink.link}
                                exact
                                component={ChangePasswordSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    settingsAutomationLink.permittedRoles
                                )}
                                path={settingsAutomationLink.link}
                                exact
                                component={AutomationSubpage}
                            />
                        </Switch>
                    </div>
                ) : (
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
                ))}
            <ToastContainer />
        </div>
    );
}
