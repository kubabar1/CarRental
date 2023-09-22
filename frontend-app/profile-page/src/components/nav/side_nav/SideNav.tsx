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
    bookingsAuditLogsListLink,
    bookingsListLink,
    vehicleAddLink,
    vehiclesListLink,
    equipmentListLink,
    locationsListLink,
    myBookingsListLink,
    myRentedBookingsListLink,
    rentedBookingsListLink,
    reservedBookingsListLink,
    userRolesListLink,
    usersListLink,
    myReservedBookingsListLink,
    sendEmailLink,
    settingsChangePasswordLink,
    settingsUserSettingsLink,
    vehicleOptionsListLink,
    locationAddLink,
    settingsAutomationLink,
} from '../../../constants/Links';
import { logoutPath, homePath } from '@car-rental/shared/constant';
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
                    link={bookingsListLink.link}
                    authorized={userHasAnyRole(userRoles, bookingsListLink.permittedRoles)}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('allReservationsNavLinkName')}
                    link={reservedBookingsListLink.link}
                    authorized={userHasAnyRole(userRoles, reservedBookingsListLink.permittedRoles)}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('allRentsNavLinkName')}
                    link={rentedBookingsListLink.link}
                    authorized={userHasAnyRole(userRoles, rentedBookingsListLink.permittedRoles)}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('myBookingsNavLinkName')}
                    link={myBookingsListLink.link}
                    authorized={userHasAnyRole(userRoles, myBookingsListLink.permittedRoles)}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('myReservationsNavLinkName')}
                    link={myReservedBookingsListLink.link}
                    authorized={userHasAnyRole(userRoles, myReservedBookingsListLink.permittedRoles)}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('myRentsNavLinkName')}
                    link={myRentedBookingsListLink.link}
                    authorized={userHasAnyRole(userRoles, myRentedBookingsListLink.permittedRoles)}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('bookingsAuditLogNavLinkName')}
                    link={bookingsAuditLogsListLink.link}
                    authorized={userHasAnyRole(userRoles, bookingsAuditLogsListLink.permittedRoles)}
                />
            </NavLink>

            <NavLink
                navItemName={TranslationService.translate('usersNavLinkName')}
                iconName={faUser}
                authorized={userHasAnyRole(userRoles, usersListLink.permittedRoles)}
            >
                <NavSubLink
                    navItemName={TranslationService.translate('usersListNavLinkName')}
                    link={usersListLink.link}
                />
            </NavLink>

            <NavLink
                navItemName={TranslationService.translate('vehiclesNavLinkName')}
                iconName={faCar}
                authorized={userHasAnyRole(
                    userRoles,
                    [
                        vehiclesListLink.permittedRoles,
                        vehicleAddLink.permittedRoles,
                        equipmentListLink.permittedRoles,
                        vehicleOptionsListLink.permittedRoles,
                    ].reduce(
                        (accumulator: string[] = [], value) =>
                            value ? accumulator.concat(value) : accumulator.concat([]),
                        [] as string[]
                    )
                )}
            >
                <NavSubLink
                    navItemName={TranslationService.translate('vehiclesListNavLinkName')}
                    link={vehiclesListLink.link}
                    authorized={userHasAnyRole(userRoles, vehiclesListLink.permittedRoles)}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('addVehicleNavLinkName')}
                    link={vehicleAddLink.link}
                    authorized={userHasAnyRole(userRoles, vehicleAddLink.permittedRoles)}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('equipmentsNavLinkName')}
                    link={equipmentListLink.link}
                    authorized={userHasAnyRole(userRoles, equipmentListLink.permittedRoles)}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('vehicleOptionsNavLinkName')}
                    link={vehicleOptionsListLink.link}
                    authorized={userHasAnyRole(userRoles, vehicleOptionsListLink.permittedRoles)}
                />
            </NavLink>

            <NavLink
                navItemName={TranslationService.translate('userRolesNavLinkName')}
                iconName={faUserLock}
                authorized={userHasAnyRole(userRoles, userRolesListLink.permittedRoles)}
            >
                <NavSubLink
                    navItemName={TranslationService.translate('userRolesListNavLinkName')}
                    link={userRolesListLink.link}
                />
            </NavLink>

            <NavLink
                navItemName={TranslationService.translate('locationsNavLinkName')}
                iconName={faMapMarkedAlt}
                authorized={userHasAnyRole(
                    userRoles,
                    [locationsListLink.permittedRoles, locationAddLink.permittedRoles].reduce(
                        (accumulator: string[] = [], value) =>
                            value ? accumulator.concat(value) : accumulator.concat([]),
                        [] as string[]
                    )
                )}
            >
                <NavSubLink
                    navItemName={TranslationService.translate('locationsListNavLinkName')}
                    link={locationsListLink.link}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('addLocationNavLinkName')}
                    link={locationAddLink.link}
                />
            </NavLink>

            <NavLink
                navItemName={TranslationService.translate('sendEmailNavLinkName')}
                iconName={faEnvelope}
                linkPath={sendEmailLink.link}
                disableRefresh={true}
                authorized={userHasAnyRole(userRoles, sendEmailLink.permittedRoles)}
            />

            <NavLink navItemName={TranslationService.translate('settingsNavLinkName')} iconName={faCog}>
                <NavSubLink
                    navItemName={TranslationService.translate('userSettingsNavLinkName')}
                    link={settingsUserSettingsLink.link}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('changePasswordNavLinkName')}
                    link={settingsChangePasswordLink.link}
                />
                <NavSubLink
                    navItemName={TranslationService.translate('automationNavLinkName')}
                    link={settingsAutomationLink.link}
                />
            </NavLink>

            <NavLink
                navItemName={TranslationService.translate('homeNavLinkName')}
                iconName={faHome}
                linkPath={homePath}
            />

            <NavLink
                navItemName={TranslationService.translate('logOutNavLinkName')}
                iconName={faSignOutAlt}
                linkPath={logoutPath}
                disableRefresh={true}
                onClick={runLogout}
            />
        </section>
    );
}
