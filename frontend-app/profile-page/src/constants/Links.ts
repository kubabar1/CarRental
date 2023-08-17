import { UserRolesEnum } from '../utils/UserRolesEnum';

interface SecureLink {
    link: string;
    permittedRoles?: string[];
}

const baseLink = '/profile';
export const profileRootLink: SecureLink = { link: `${baseLink}/` };
export const bookingsListLink: SecureLink = {
    link: `${baseLink}/bookings/list`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE, UserRolesEnum.ROLE_OFFICE_EMPLOYEE],
};
export const reservedBookingsListLink: SecureLink = {
    link: `${baseLink}/bookings/reserved`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};
export const rentedBookingsListLink: SecureLink = {
    link: `${baseLink}/bookings/rented`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};
export const myBookingsListLink: SecureLink = { link: `${baseLink}/my-bookings/list` };
export const myReservedBookingsListLink: SecureLink = { link: `${baseLink}/my-bookings/reserved` };
export const myRentedBookingsListLink: SecureLink = { link: `${baseLink}/my-bookings/rented` };
export const bookingsAuditLogsListLink: SecureLink = {
    link: `${baseLink}/bookings/audit-logs`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};

export const usersListLink: SecureLink = { link: `${baseLink}/users/list`, permittedRoles: [UserRolesEnum.ROLE_ADMIN] };
export const userEditLink: SecureLink = {
    link: `${baseLink}/users/:userId/edit`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN],
};

export const vehiclesListLink: SecureLink = {
    link: `${baseLink}/vehicles/list`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};
export const vehicleAddLink: SecureLink = {
    link: `${baseLink}/vehicles/add`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};
export const vehicleEditLink: SecureLink = {
    link: `${baseLink}/vehicles/:vehicleId/edit`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};
export const vehicleEquipmentEditLink: SecureLink = {
    link: `${baseLink}/vehicles/:vehicleId/equipment`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};
export const equipmentListLink: SecureLink = {
    link: `${baseLink}/equipments`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};
export const vehicleOptionsListLink: SecureLink = {
    link: `${baseLink}/vehicles/options`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};

export const userRolesListLink: SecureLink = {
    link: `${baseLink}/user-roles`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN],
};
export const roleAddLink: SecureLink = {
    link: `${baseLink}/user-roles/add/:userId`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN],
};

export const locationsListLink: SecureLink = {
    link: `${baseLink}/locations`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN],
};

export const locationAddLink: SecureLink = {
    link: `${baseLink}/locations/add`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN],
};

export const sendEmailLink: SecureLink = {
    link: `${baseLink}/email-send`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_OFFICE_EMPLOYEE, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};

export const settingsUserSettingsLink: SecureLink = { link: `${baseLink}/settings/user-settings` };

export const settingsChangePasswordLink: SecureLink = { link: `${baseLink}/settings/change-password` };
