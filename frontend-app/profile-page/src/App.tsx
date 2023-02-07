import React, { useEffect, useState } from 'react';
import { Navigation } from './components/nav/Navigation';
import { Switch } from 'react-router-dom';
import { getAuthorizedUserData } from './service/UserService';
import {
    bookingsAuditLogsListPath,
    bookingsListPath,
    equipmentListPath,
    locationsListPath,
    myBookingsListPath,
    myRentedBookingsListPath,
    myReservedBookingsListPath,
    profileRootLink,
    rentedBookingsListPath,
    reservedBookingsListPath,
    reservedVehiclesListPath,
    roleAddPath,
    sendEmailPath,
    settingsPath,
    userEditPath,
    userRolesListPath,
    usersListPath,
    vehicleAddPath,
    vehicleEditPath,
    vehicleEquipmentEditPath,
    vehiclesListPath,
} from './constants/Links';
import { WelcomeSubpage } from './subpages/welcome/WelcomeSubpage';
import { SettingsSubpage } from './subpages/settings/SettingsSubpage';
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
import { ReservedVehiclesListSubpage } from './subpages/booking/ReservedVehiclesListSubpage';
import { BookingsAuditLogsListSubpage } from './subpages/booking/BookingsAuditLogsListSubpage';
import { MyReservedBookingsListSubpage } from './subpages/booking/MyReservedBookingsListSubpage';
import { AuthenticatedUserDTO } from './model/AuthenticatedUserDTO';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { userHasAnyRole } from './utils/UserUtils';
import { logout } from './service/AuthService';
import { Button } from 'react-bootstrap';

export function App(): JSX.Element {
    const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUserDTO | undefined>(undefined);

    useEffect(() => {
        getAuthorizedUserData().then((authenticatedUserDTO: AuthenticatedUserDTO) =>
            setAuthenticatedUser(authenticatedUserDTO)
        );
    }, []);

    const runLogout = (): void => {
        logout().then(() => {
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
                                    bookingsListPath.permittedRoles
                                )}
                                path={bookingsListPath.link}
                                exact
                                component={BookingsListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    reservedBookingsListPath.permittedRoles
                                )}
                                path={reservedBookingsListPath.link}
                                exact
                                component={ReservedBookingsListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    rentedBookingsListPath.permittedRoles
                                )}
                                path={rentedBookingsListPath.link}
                                exact
                                component={RentedBookingsListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    myBookingsListPath.permittedRoles
                                )}
                                path={myBookingsListPath.link}
                                exact
                                component={MyBookingsListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    myReservedBookingsListPath.permittedRoles
                                )}
                                path={myReservedBookingsListPath.link}
                                exact
                                component={MyReservedBookingsListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    myRentedBookingsListPath.permittedRoles
                                )}
                                path={myRentedBookingsListPath.link}
                                exact
                                component={MyRentedBookingsListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    reservedVehiclesListPath.permittedRoles
                                )}
                                path={reservedVehiclesListPath.link}
                                exact
                                component={ReservedVehiclesListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    bookingsAuditLogsListPath.permittedRoles
                                )}
                                path={bookingsAuditLogsListPath.link}
                                exact
                                component={BookingsAuditLogsListSubpage}
                            />

                            {/*USERS_PAGE*/}
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(authenticatedUser.userRoles, usersListPath.permittedRoles)}
                                path={usersListPath.link}
                                exact
                                component={UsersListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(authenticatedUser.userRoles, userEditPath.permittedRoles)}
                                path={userEditPath.link}
                                exact
                                component={UsersEditSubpage}
                            />

                            {/*VEHICLES_PAGE*/}
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    vehiclesListPath.permittedRoles
                                )}
                                path={vehiclesListPath.link}
                                exact
                                component={VehicleListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    vehicleEditPath.permittedRoles
                                )}
                                path={vehicleEditPath.link}
                                exact
                                component={VehicleEditSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    vehicleEquipmentEditPath.permittedRoles
                                )}
                                path={vehicleEquipmentEditPath.link}
                                exact
                                component={VehicleEquipmentEditSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    vehicleAddPath.permittedRoles
                                )}
                                path={vehicleAddPath.link}
                                exact
                                component={VehicleAddSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    equipmentListPath.permittedRoles
                                )}
                                path={equipmentListPath.link}
                                exact
                                component={EquipmentListSubpage}
                            />

                            {/*USER_ROLES_PAGE*/}
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    userRolesListPath.permittedRoles
                                )}
                                path={userRolesListPath.link}
                                exact
                                component={UsersRolesListSubpage}
                            />
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(authenticatedUser.userRoles, roleAddPath.permittedRoles)}
                                path={roleAddPath.link}
                                component={AddRoleSubpage}
                            />

                            {/*LOCATIONS_PAGE*/}
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(
                                    authenticatedUser.userRoles,
                                    locationsListPath.permittedRoles
                                )}
                                path={locationsListPath.link}
                                exact
                                component={LocationsListSubpage}
                            />

                            {/*EMAIL_PAGE*/}
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(authenticatedUser.userRoles, sendEmailPath.permittedRoles)}
                                path={sendEmailPath.link}
                                exact
                                component={EmailSubpage}
                            />

                            {/*SETTINGS_PAGE*/}
                            <ProtectedRoute
                                isAuthorized={userHasAnyRole(authenticatedUser.userRoles, settingsPath.permittedRoles)}
                                path={settingsPath.link}
                                exact
                                component={SettingsSubpage}
                            />
                        </Switch>
                    </div>
                ) : (
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
                ))}
        </div>
    );
}
