import React from 'react';
import NavLink from './nav_links/NavLink';
import NavSubLink from './nav_links/NavSubLink';
import {
    faCar,
    faCog,
    faEnvelope,
    faHome,
    faListUl,
    faMapMarkedAlt,
    faSignOutAlt,
    faUser,
    faUserLock,
} from '@fortawesome/free-solid-svg-icons';
import {
    bookingChangesListPath,
    bookingsListPath,
    vehicleAddPath,
    vehiclesListPath,
    equipmentListPath,
    homeLink,
    locationsListPath,
    logoutLink,
    myBookingsListPath,
    myRentedBookingsListPath,
    rentedBookingsListPath,
    reservedBookingsListPath,
    reservedVehiclesListPath,
    sendEmailPath,
    settingsPath,
    userRolesListPath,
    usersListPath,
} from '../../../constants/Links';
import { userHasAnyRole, userHasRole } from '../../../utils/UserUtils';
import { UserRolesEnum } from '../../../utils/UserRolesEnum';

interface SideNavProperties {
    userRoles: string[];
}

export function SideNav({ userRoles = [] }: SideNavProperties): JSX.Element {
    return (
        <section id="menu-panel" className="mb-5">
            <NavLink navItemName={'Booking'} iconName={faListUl}>
                {userHasAnyRole(userRoles, [
                    UserRolesEnum.ROLE_ADMIN,
                    UserRolesEnum.ROLE_RENTING_EMPLOYEE,
                    UserRolesEnum.ROLE_OFFICE_EMPLOYEE,
                ]) ? (
                    <NavSubLink navItemName={'Bookings list'} linkPath={bookingsListPath} />
                ) : (
                    <></>
                )}
                {userHasAnyRole(userRoles, [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE]) ? (
                    <NavSubLink navItemName={'Reserved bookings list'} linkPath={reservedBookingsListPath} />
                ) : (
                    <></>
                )}
                {userHasAnyRole(userRoles, [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE]) ? (
                    <NavSubLink navItemName={'Rented bookings list'} linkPath={rentedBookingsListPath} />
                ) : (
                    <></>
                )}
                <NavSubLink navItemName={'My bookings list'} linkPath={myBookingsListPath} />
                <NavSubLink navItemName={'My rented bookings list'} linkPath={myRentedBookingsListPath} />
                <NavSubLink navItemName={'Reserved vehicles list'} linkPath={reservedVehiclesListPath} />
                {userHasAnyRole(userRoles, [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE]) ? (
                    <NavSubLink navItemName={'Booking changes list'} linkPath={bookingChangesListPath} />
                ) : (
                    <></>
                )}
            </NavLink>

            {userHasRole(userRoles, UserRolesEnum.ROLE_ADMIN) && (
                <NavLink navItemName={'Users'} iconName={faUser}>
                    <NavSubLink navItemName={'Users list'} linkPath={usersListPath} />
                </NavLink>
            )}

            {userHasAnyRole(userRoles, [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE]) && (
                <NavLink navItemName={'Vehicles'} iconName={faCar}>
                    <NavSubLink navItemName={'Vehicles list'} linkPath={vehiclesListPath} />
                    <NavSubLink navItemName={'Add vehicle'} linkPath={vehicleAddPath} />
                    <NavSubLink navItemName={'Equipment list'} linkPath={equipmentListPath} />
                </NavLink>
            )}

            {userHasRole(userRoles, UserRolesEnum.ROLE_ADMIN) && (
                <NavLink navItemName={'User roles'} iconName={faUserLock}>
                    <NavSubLink navItemName={'User roles list'} linkPath={userRolesListPath} />
                </NavLink>
            )}

            <NavLink navItemName={'Locations'} iconName={faMapMarkedAlt}>
                <NavSubLink navItemName={'Locations list'} linkPath={locationsListPath} />
            </NavLink>

            {userHasAnyRole(userRoles, [
                UserRolesEnum.ROLE_ADMIN,
                UserRolesEnum.ROLE_OFFICE_EMPLOYEE,
                UserRolesEnum.ROLE_RENTING_EMPLOYEE,
            ]) && (
                <NavLink navItemName={'Mails'} iconName={faEnvelope}>
                    <NavSubLink navItemName={'Send email'} linkPath={sendEmailPath} />
                </NavLink>
            )}

            <NavLink navItemName={'Settings'} iconName={faCog} linkPath={settingsPath} disableRefresh={true} />

            <NavLink navItemName={'Home'} iconName={faHome} linkPath={homeLink} />

            <NavLink navItemName={'Log out'} iconName={faSignOutAlt} linkPath={logoutLink} />
        </section>
    );
}
