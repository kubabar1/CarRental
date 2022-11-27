import { UserRolesEnum } from '../utils/UserRolesEnum';

interface SecureLink {
    link: string;
    permittedRoles?: string[];
}

export const logoutLink = '/logout';

export const homeLink = '/';

export const basePath = '/profile';
export const profileRootLink: SecureLink = { link: `${basePath}/` };
export const bookingsListPath: SecureLink = {
    link: `${basePath}/bookings/list`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE, UserRolesEnum.ROLE_OFFICE_EMPLOYEE],
};
export const reservedBookingsListPath: SecureLink = {
    link: `${basePath}/bookings/reserved`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};
export const rentedBookingsListPath: SecureLink = {
    link: `${basePath}/bookings/rented`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};
export const myBookingsListPath: SecureLink = { link: `${basePath}/my-bookings/list` };
export const myReservedBookingsListPath: SecureLink = { link: `${basePath}/my-bookings/reserved` };
export const myRentedBookingsListPath: SecureLink = { link: `${basePath}/my-bookings/rented` };
export const reservedVehiclesListPath: SecureLink = { link: `${basePath}/vehicles/reserved` };
export const bookingsAuditLogsListPath: SecureLink = {
    link: `${basePath}/bookings/audit-logs`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};

export const usersListPath: SecureLink = { link: `${basePath}/users/list`, permittedRoles: [UserRolesEnum.ROLE_ADMIN] };
export const userEditPath: SecureLink = {
    link: `${basePath}/users/:userId/edit`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN],
};

export const vehiclesListPath: SecureLink = {
    link: `${basePath}/vehicles/list`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};
export const vehicleAddPath: SecureLink = {
    link: `${basePath}/vehicles/add`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};
export const vehicleEditPath: SecureLink = {
    link: `${basePath}/vehicles/:vehicleId/edit`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};
export const vehicleEquipmentEditPath: SecureLink = {
    link: `${basePath}/vehicles/:vehicleId/equipment`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};
export const equipmentListPath: SecureLink = {
    link: `${basePath}/equipments`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};

export const userRolesListPath: SecureLink = {
    link: `${basePath}/user-roles`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN],
};
export const roleAddPath: SecureLink = {
    link: `${basePath}/user-roles/add/:userId`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN],
};

export const locationsListPath: SecureLink = { link: `${basePath}/locations` };

export const sendEmailPath: SecureLink = {
    link: `${basePath}/email-send`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_OFFICE_EMPLOYEE, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};
export const sendEmailToUserPath: SecureLink = {
    link: `${basePath}/email-send/:userId`,
    permittedRoles: [UserRolesEnum.ROLE_ADMIN, UserRolesEnum.ROLE_OFFICE_EMPLOYEE, UserRolesEnum.ROLE_RENTING_EMPLOYEE],
};

export const settingsPath: SecureLink = { link: `${basePath}/settings` };
