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
    userRolesListPath,
    usersListPath,
    myReservedBookingsListPath,
    sendEmailPath,
    settingsChangePasswordPath,
    settingsUserSettingsPath,
    vehicleOptionsListPath,
    locationAddPath,
} from '../../../constants/Links';
import { userHasAnyRole } from '../../../utils/UserUtils';
import { TranslationService } from '@car-rental/shared/service';

interface SideNavProperties {
    userRoles: string[];
    runLogout: (e: MouseEvent) => void;
}

export function SideNav({ userRoles = [], runLogout }: SideNavProperties): JSX.Element {
    return (
        <section id="menu-panel" className="mb-5">
            <NavLink navItemName={TranslationService.translate('bookingNavLinkName')} iconName={faListUl}>
                <NavSubLink
                    navItemName={TranslationService.translate('allBookingsNavLinkName')}
                    linkPath={bookingsListPath.link}
                    authorized={userHasAnyRole(userRoles, bookingsListPath.permittedRoles)}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('allReservationsNavLinkName')}
                    linkPath={reservedBookingsListPath.link}
                    authorized={userHasAnyRole(userRoles, reservedBookingsListPath.permittedRoles)}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('allRentsNavLinkName')}
                    linkPath={rentedBookingsListPath.link}
                    authorized={userHasAnyRole(userRoles, rentedBookingsListPath.permittedRoles)}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('myBookingsNavLinkName')}
                    linkPath={myBookingsListPath.link}
                    authorized={userHasAnyRole(userRoles, myBookingsListPath.permittedRoles)}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('myReservationsNavLinkName')}
                    linkPath={myReservedBookingsListPath.link}
                    authorized={userHasAnyRole(userRoles, myReservedBookingsListPath.permittedRoles)}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('myRentsNavLinkName')}
                    linkPath={myRentedBookingsListPath.link}
                    authorized={userHasAnyRole(userRoles, myRentedBookingsListPath.permittedRoles)}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('bookingsAuditLogNavLinkName')}
                    linkPath={bookingsAuditLogsListPath.link}
                    authorized={userHasAnyRole(userRoles, bookingsAuditLogsListPath.permittedRoles)}
                />
            </NavLink>

            {userHasAnyRole(userRoles, usersListPath.permittedRoles) && (
                <NavLink navItemName={TranslationService.translate('usersNavLinkName')} iconName={faUser}>
                    <NavSubLink
                        navItemName={TranslationService.translate('usersListNavLinkName')}
                        linkPath={usersListPath.link}
                    />
                </NavLink>
            )}

            <NavLink navItemName={TranslationService.translate('vehiclesNavLinkName')} iconName={faCar}>
                <NavSubLink
                    navItemName={TranslationService.translate('vehiclesListNavLinkName')}
                    linkPath={vehiclesListPath.link}
                    authorized={userHasAnyRole(userRoles, vehiclesListPath.permittedRoles)}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('addVehicleNavLinkName')}
                    linkPath={vehicleAddPath.link}
                    authorized={userHasAnyRole(userRoles, vehicleAddPath.permittedRoles)}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('equipmentsNavLinkName')}
                    linkPath={equipmentListPath.link}
                    authorized={userHasAnyRole(userRoles, equipmentListPath.permittedRoles)}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('vehicleOptionsNavLinkName')}
                    linkPath={vehicleOptionsListPath.link}
                    authorized={userHasAnyRole(userRoles, vehicleOptionsListPath.permittedRoles)}
                />
            </NavLink>

            {userHasAnyRole(userRoles, userRolesListPath.permittedRoles) && (
                <NavLink navItemName={TranslationService.translate('userRolesNavLinkName')} iconName={faUserLock}>
                    <NavSubLink
                        navItemName={TranslationService.translate('userRolesListNavLinkName')}
                        linkPath={userRolesListPath.link}
                    />
                </NavLink>
            )}

            {userHasAnyRole(userRoles, locationsListPath.permittedRoles) && (
                <NavLink navItemName={TranslationService.translate('locationsNavLinkName')} iconName={faMapMarkedAlt}>
                    <NavSubLink
                        navItemName={TranslationService.translate('locationsListNavLinkName')}
                        linkPath={locationsListPath.link}
                    />
                    <NavSubLink
                        navItemName={TranslationService.translate('addLocationNavLinkName')}
                        linkPath={locationAddPath.link}
                    />
                </NavLink>
            )}

            {userHasAnyRole(userRoles, sendEmailPath.permittedRoles) && (
                <NavLink
                    navItemName={TranslationService.translate('sendEmailNavLinkName')}
                    iconName={faEnvelope}
                    linkPath={sendEmailPath.link}
                    disableRefresh={true}
                />
            )}

            <NavLink navItemName={TranslationService.translate('settingsNavLinkName')} iconName={faCog}>
                <NavSubLink
                    navItemName={TranslationService.translate('userSettingsNavLinkName')}
                    linkPath={settingsUserSettingsPath.link}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('changePasswordNavLinkName')}
                    linkPath={settingsChangePasswordPath.link}
                />
            </NavLink>

            <NavLink
                navItemName={TranslationService.translate('homeNavLinkName')}
                iconName={faHome}
                linkPath={homeLink}
            />

            <NavLink
                navItemName={TranslationService.translate('logOutNavLinkName')}
                iconName={faSignOutAlt}
                linkPath={logoutLink}
                disableRefresh={true}
                onClick={runLogout}
            />
        </section>
    );
}
