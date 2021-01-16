import * as React from "react";
import ReactDOM from 'react-dom';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../main/static/css/main.css';
import {NavContainer} from './nav/NavContainer.js';
import {MainContent} from './MainContent.js';
import {Users} from './users/Users.js';
import {EditUser} from './users/EditUser.js';
import {CarList} from './cars/CarList.js'
import {EditCar} from './cars/EditCar.js';
import {AddCar} from './cars/AddCar.js';
import {ShowCarFeatures} from './cars/ShowCarFeatures.js';
import {FeaturesList} from './cars/FeaturesList.js';
import {UsersRoles} from './users_roles/UsersRoles.js';
import {AddRole} from './users_roles/AddRole.js';
import {SendEmail} from './send_email/SendEmail.js';
import {UserEmailContainer} from './send_email/UserEmailContainer.js';
import {Settings} from './settings/Settings.js';
import {AllBookings} from './booking/AllBookings.js';
import {AllRentedVehicles} from './booking/AllRentedVehicles.js';
import {AllReservedVehicles} from './booking/AllReservedVehicles.js';
import {MyAllBookings} from './booking/MyAllBookings.js';
import {MyAllReservedVehicles} from './booking/MyAllReservedVehicles.js';
import {MyAllRentedVehicles} from './booking/MyAllRentedVehicles.js';
import {BookingChanges} from './booking/BookingChanges.js';
import {Locations} from './locations/Locations.js';

export class Profile extends React.Component {

	render () {
		return (
      <div className="container-fluid">
        <div className="row">
          <NavContainer/>
					<Switch>
						<Route exact path="/CarRental/profile" component={MainContent} />
						<Route path="/CarRental/profile/allbookings" component={AllBookings} />
						<Route path="/CarRental/profile/allreservedvehicles" component={AllReservedVehicles} />
						<Route path="/CarRental/profile/allrentedvehicles" component={AllRentedVehicles} />
						<Route path="/CarRental/profile/allmybookings" component={MyAllBookings} />
						<Route path="/CarRental/profile/bookingchanges" component={BookingChanges} />
						<Route path="/CarRental/profile/myreservedbookings" component={MyAllReservedVehicles} />
						<Route path="/CarRental/profile/myrentedbookings" component={MyAllRentedVehicles} />
						<Route path="/CarRental/profile/userlist" component={Users} />
						<Route path="/CarRental/profile/edituser/:user_id" component={EditUser} />
						<Route path="/CarRental/profile/carslist" component={CarList} />
						<Route path="/CarRental/profile/editcar/:car_id" component={EditCar} />
						<Route path="/CarRental/profile/addcar" component={AddCar} />
						<Route path="/CarRental/profile/carequipments" component={ShowCarFeatures} />
						<Route path="/CarRental/profile/equipmentslist" component={FeaturesList} />
						<Route path="/CarRental/profile/userroles" component={UsersRoles} />
						<Route path="/CarRental/profile/addrole/:user_id" component={AddRole} />
						<Route path="/CarRental/profile/sendemail" component={SendEmail} />
						<Route path="/CarRental/profile/senduseremail/:user_id" component={UserEmailContainer} />
						<Route path="/CarRental/profile/settings" component={Settings} />
						<Route path="/CarRental/profile/locations" component={Locations} />
					</Switch>
        </div>
      </div>
		)
	}

}
