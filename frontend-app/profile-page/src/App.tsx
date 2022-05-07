import React, { useEffect, useState } from 'react';
import { Navigation } from './components/nav/Navigation';
import { Route, Switch } from 'react-router-dom';
import { UserResponseDTO } from './model/UserResponseDTO';
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
    sendEmailToUserPath,
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
import { UsersEmailSubpage } from './subpages/emails/UsersEmailSubpage';
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

export function App(): JSX.Element {
    const [currentUser, setCurrentUserData] = useState<UserResponseDTO | undefined>(undefined);

    useEffect(() => {
        getAuthorizedUserData().then((authorizedUser: UserResponseDTO) => setCurrentUserData(authorizedUser));
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                {currentUser && <Navigation currentUser={currentUser} />}
                <Switch>
                    <Route path={profileRootLink} exact component={WelcomeSubpage} />

                    <Route path={bookingsListPath} exact component={BookingsListSubpage} />
                    <Route path={reservedBookingsListPath} exact component={ReservedBookingsListSubpage} />
                    <Route path={rentedBookingsListPath} exact component={RentedBookingsListSubpage} />
                    <Route path={myBookingsListPath} exact component={MyBookingsListSubpage} />
                    <Route path={myReservedBookingsListPath} exact component={MyReservedBookingsListSubpage} />
                    <Route path={myRentedBookingsListPath} exact component={MyRentedBookingsListSubpage} />
                    <Route path={reservedVehiclesListPath} exact component={ReservedVehiclesListSubpage} />
                    <Route path={bookingsAuditLogsListPath} exact component={BookingsAuditLogsListSubpage} />

                    <Route path={usersListPath} exact component={UsersListSubpage} />
                    <Route path={userEditPath} exact component={UsersEditSubpage} />

                    <Route path={vehiclesListPath} exact component={VehicleListSubpage} />
                    <Route path={vehicleEditPath} exact component={VehicleEditSubpage} />
                    <Route path={vehicleEquipmentEditPath} exact component={VehicleEquipmentEditSubpage} />
                    <Route path={vehicleAddPath} exact component={VehicleAddSubpage} />
                    <Route path={equipmentListPath} exact component={EquipmentListSubpage} />

                    <Route path={userRolesListPath} exact component={UsersRolesListSubpage} />
                    <Route path={roleAddPath} component={AddRoleSubpage} />

                    <Route path={locationsListPath} exact component={LocationsListSubpage} />

                    <Route path={sendEmailPath} exact component={UsersEmailSubpage} />
                    <Route path={sendEmailToUserPath} component={EmailSubpage} />

                    <Route path={settingsPath} exact component={SettingsSubpage} />
                </Switch>
            </div>
        </div>
    );
}
