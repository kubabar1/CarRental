import React, { useEffect, useState } from 'react';
import { Navigation } from './components/nav/Navigation';
import { WelcomeSubpage } from './subpages/welcome/WelcomeSubpage';
import { Route, Switch } from 'react-router-dom';
import { UserResponseDTO } from './model/UserResponseDTO';
import { getCurrentUserData } from './service/UserService';
import { SettingsSubpage } from './subpages/settings/SettingsSubpage';
import { profileRootLink, settingsPath, usersListPath } from './constants/Links';
import { UsersListSubpage } from './subpages/users/UsersListSubpage';

// import { WelcomeSubpage } from './subpages/WelcomeSubpage/WelcomeSubpage';

export function App(): JSX.Element {
    const [currentUser, setCurrentUserData] = useState<UserResponseDTO | undefined>(undefined);

    useEffect(() => {
        setCurrentUserData(getCurrentUserData());
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                {currentUser && <Navigation currentUser={currentUser} />}
                <Switch>
                    <Route exact path={profileRootLink} component={WelcomeSubpage} />
                    {/*<Route path="/CarRental/profile/allbookings" component={AllBookings} />*/}
                    {/*<Route path="/CarRental/profile/allreservedvehicles" component={AllReservedVehicles} />*/}
                    {/*<Route path="/CarRental/profile/allrentedvehicles" component={AllRentedVehicles} />*/}
                    {/*<Route path="/CarRental/profile/allmybookings" component={MyAllBookings} />*/}
                    {/*<Route path="/CarRental/profile/bookingchanges" component={BookingChanges} />*/}
                    {/*<Route path="/CarRental/profile/myreservedbookings" component={MyAllReservedVehicles} />*/}
                    {/*<Route path="/CarRental/profile/myrentedbookings" component={MyAllRentedVehicles} />*/}
                    <Route path={usersListPath} component={UsersListSubpage} />
                    {/*<Route path="/CarRental/profile/edituser/:user_id" component={EditUser} />*/}
                    {/*<Route path="/CarRental/profile/carslist" component={CarList} />*/}
                    {/*<Route path="/CarRental/profile/editcar/:car_id" component={EditCar} />*/}
                    {/*<Route path="/CarRental/profile/addcar" component={AddCar} />*/}
                    {/*<Route path="/CarRental/profile/carequipments" component={ShowCarFeatures} />*/}
                    {/*<Route path="/CarRental/profile/equipmentslist" component={FeaturesList} />*/}
                    {/*<Route path="/CarRental/profile/userroles" component={UsersRoles} />*/}
                    {/*<Route path="/CarRental/profile/addrole/:user_id" component={AddRole} />*/}
                    {/*<Route path="/CarRental/profile/sendemail" component={SendEmail} />*/}
                    {/*<Route path="/CarRental/profile/senduseremail/:user_id" component={UserEmailContainer} />*/}
                    <Route path={settingsPath} component={SettingsSubpage} />
                    {/*<Route path="/CarRental/profile/locations" component={Locations} />*/}
                </Switch>
            </div>
        </div>
    );
}
