import React, { MouseEvent } from 'react';
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
    bookingsAuditLogsListPath,
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
    userRolesListPath,
    usersListPath,
    myReservedBookingsListPath,
    sendEmailPath,
    settingsChangePasswordPath,
    settingsUserSettingsPath,
    vehicleOptionsListPath,
} from '../../../constants/Links';
import { userHasAnyRole } from '../../../utils/UserUtils';

interface SideNavProperties {
    userRoles: string[];
    runLogout: (e: MouseEvent) => void;
}

export function SideNav({ userRoles = [], runLogout }: SideNavProperties): JSX.Element {
    return (
        <section id="menu-panel" className="mb-5">
            <NavLink navItemName={'Booking'} iconName={faListUl}>
                <NavSubLink
                    navItemName={'Bookings list'}
                    linkPath={bookingsListPath.link}
                    authorized={userHasAnyRole(userRoles, bookingsListPath.permittedRoles)}
                />
                <NavSubLink
                    navItemName={'Reserved bookings list'}
                    linkPath={reservedBookingsListPath.link}
                    authorized={userHasAnyRole(userRoles, reservedBookingsListPath.permittedRoles)}
                />
                <NavSubLink
                    navItemName={'Rented bookings list'}
                    linkPath={rentedBookingsListPath.link}
                    authorized={userHasAnyRole(userRoles, rentedBookingsListPath.permittedRoles)}
                />
                <NavSubLink
                    navItemName={'My bookings list'}
                    linkPath={myBookingsListPath.link}
                    authorized={userHasAnyRole(userRoles, myBookingsListPath.permittedRoles)}
                />
                <NavSubLink
                    navItemName={'My reserved bookings list'}
                    linkPath={myReservedBookingsListPath.link}
                    authorized={userHasAnyRole(userRoles, myReservedBookingsListPath.permittedRoles)}
                />
                <NavSubLink
                    navItemName={'My rented bookings list'}
                    linkPath={myRentedBookingsListPath.link}
                    authorized={userHasAnyRole(userRoles, myRentedBookingsListPath.permittedRoles)}
                />
                <NavSubLink
                    navItemName={'Bookings audit logs'}
                    linkPath={bookingsAuditLogsListPath.link}
                    authorized={userHasAnyRole(userRoles, bookingsAuditLogsListPath.permittedRoles)}
                />
            </NavLink>

            {userHasAnyRole(userRoles, usersListPath.permittedRoles) && (
                <NavLink navItemName={'Users'} iconName={faUser}>
                    <NavSubLink navItemName={'Users list'} linkPath={usersListPath.link} />
                </NavLink>
            )}

            <NavLink navItemName={'Vehicles'} iconName={faCar}>
                <NavSubLink
                    navItemName={'Vehicles list'}
                    linkPath={vehiclesListPath.link}
                    authorized={userHasAnyRole(userRoles, vehiclesListPath.permittedRoles)}
                />
                <NavSubLink
                    navItemName={'Reserved vehicles list'}
                    linkPath={reservedVehiclesListPath.link}
                    authorized={userHasAnyRole(userRoles, reservedVehiclesListPath.permittedRoles)}
                />
                <NavSubLink
                    navItemName={'Add vehicle'}
                    linkPath={vehicleAddPath.link}
                    authorized={userHasAnyRole(userRoles, vehicleAddPath.permittedRoles)}
                />
                <NavSubLink
                    navItemName={'Equipment list'}
                    linkPath={equipmentListPath.link}
                    authorized={userHasAnyRole(userRoles, equipmentListPath.permittedRoles)}
                />
                <NavSubLink
                    navItemName={'Vehicle options list'}
                    linkPath={vehicleOptionsListPath.link}
                    authorized={userHasAnyRole(userRoles, vehicleOptionsListPath.permittedRoles)}
                />
            </NavLink>

            {userHasAnyRole(userRoles, userRolesListPath.permittedRoles) && (
                <NavLink navItemName={'User roles'} iconName={faUserLock}>
                    <NavSubLink navItemName={'User roles'} linkPath={userRolesListPath.link} />
                </NavLink>
            )}

            {userHasAnyRole(userRoles, locationsListPath.permittedRoles) && (
                <NavLink navItemName={'Locations'} iconName={faMapMarkedAlt}>
                    <NavSubLink navItemName={'Locations list'} linkPath={locationsListPath.link} />
                </NavLink>
            )}

            {userHasAnyRole(userRoles, sendEmailPath.permittedRoles) && (
                <NavLink
                    navItemName={'Send email'}
                    iconName={faEnvelope}
                    linkPath={sendEmailPath.link}
                    disableRefresh={true}
                />
            )}

            <NavLink navItemName={'Settings'} iconName={faCog}>
                <NavSubLink navItemName={'User settings'} linkPath={settingsUserSettingsPath.link} />
                <NavSubLink navItemName={'Change password'} linkPath={settingsChangePasswordPath.link} />
            </NavLink>

            <NavLink navItemName={'Home'} iconName={faHome} linkPath={homeLink} />

            <NavLink
                navItemName={'Log out'}
                iconName={faSignOutAlt}
                linkPath={logoutLink}
                disableRefresh={true}
                onClick={runLogout}
            />
        </section>
    );
}
