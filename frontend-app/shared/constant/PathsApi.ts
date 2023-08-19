import { createAppAddr, withId } from './PathUtils';

export const PROTOCOL = 'http';

export const HOSTNAME = 'localhost';

export const PORT = 8080;

const AUTH_SERVICE_PROTOCOL: string = PROTOCOL;
const BOOKING_SERVICE_PROTOCOL: string = PROTOCOL;
const RATING_SERVICE_PROTOCOL: string = PROTOCOL;
const STORAGE_STUB_SERVICE_PROTOCOL: string = PROTOCOL;
const USER_SERVICE_PROTOCOL: string = PROTOCOL;
const VEHICLE_SERVICE_PROTOCOL: string = PROTOCOL;

const AUTH_SERVICE_HOSTNAME: string = HOSTNAME;
const BOOKING_SERVICE_HOSTNAME: string = HOSTNAME;
const RATING_SERVICE_HOSTNAME: string = HOSTNAME;
const STORAGE_STUB_SERVICE_HOSTNAME: string = HOSTNAME;
const USER_SERVICE_HOSTNAME: string = HOSTNAME;
const VEHICLE_SERVICE_HOSTNAME: string = HOSTNAME;

const AUTH_SERVICE_PORT: number | undefined = PORT;
const BOOKING_SERVICE_PORT: number | undefined = PORT;
const RATING_SERVICE_PORT: number | undefined = PORT;
const STORAGE_STUB_SERVICE_PORT: number | undefined = PORT;
const USER_SERVICE_PORT: number | undefined = PORT;
const VEHICLE_SERVICE_PORT: number | undefined = PORT;

const AUTH_SERVICE_CONTEXT: string | undefined = ''; // 'auth-service';
const BOOKING_SERVICE_CONTEXT: string | undefined = ''; // 'booking-service';
const RATING_SERVICE_CONTEXT: string | undefined = ''; // 'rating-service';
const STORAGE_STUB_SERVICE_CONTEXT: string | undefined = ''; // 'storage-stub-service';
const USER_SERVICE_CONTEXT: string | undefined = ''; // 'user-service';
const VEHICLE_SERVICE_CONTEXT: string | undefined = ''; // 'vehicle-service';

const AUTH_SERVICE_ADDR: string = createAppAddr(
    AUTH_SERVICE_PROTOCOL,
    AUTH_SERVICE_HOSTNAME,
    AUTH_SERVICE_PORT,
    AUTH_SERVICE_CONTEXT
);
const BOOKING_SERVICE_ADDR: string = createAppAddr(
    BOOKING_SERVICE_PROTOCOL,
    BOOKING_SERVICE_HOSTNAME,
    BOOKING_SERVICE_PORT,
    BOOKING_SERVICE_CONTEXT
);
const RATING_SERVICE_ADDR: string = createAppAddr(
    RATING_SERVICE_PROTOCOL,
    RATING_SERVICE_HOSTNAME,
    RATING_SERVICE_PORT,
    RATING_SERVICE_CONTEXT
);
const STORAGE_STUB_SERVICE_ADDR: string = createAppAddr(
    STORAGE_STUB_SERVICE_PROTOCOL,
    STORAGE_STUB_SERVICE_HOSTNAME,
    STORAGE_STUB_SERVICE_PORT,
    STORAGE_STUB_SERVICE_CONTEXT
);
const USER_SERVICE_ADDR: string = createAppAddr(
    USER_SERVICE_PROTOCOL,
    USER_SERVICE_HOSTNAME,
    USER_SERVICE_PORT,
    USER_SERVICE_CONTEXT
);
const VEHICLE_SERVICE_ADDR: string = createAppAddr(
    VEHICLE_SERVICE_PROTOCOL,
    VEHICLE_SERVICE_HOSTNAME,
    VEHICLE_SERVICE_PORT,
    VEHICLE_SERVICE_CONTEXT
);

export const AUTH_SERVICE_ENDPOINTS = {
    LOGIN: `${AUTH_SERVICE_ADDR}/login`,
    LOGOUT: `${AUTH_SERVICE_ADDR}/logout`,
    GET_AUTHENTICATED_USER_DATA: `${AUTH_SERVICE_ADDR}/authentication/user-data`,
};
export const BOOKING_SERVICE_ENDPOINTS = {
    GET_ADMIN_BOOKINGS: `${BOOKING_SERVICE_ADDR}/admin/bookings`,
    GET_ADMIN_BOOKINGS_RESERVED: `${BOOKING_SERVICE_ADDR}/admin/bookings/reserved`,
    GET_ADMIN_BOOKINGS_RENTED: `${BOOKING_SERVICE_ADDR}/admin/bookings/rented`,
    RENT_ADMIN_BOOKING: (bookingId: string): string => withId(`${BOOKING_SERVICE_ADDR}/admin/bookings/rent`, bookingId),
    CANCEL_ADMIN_BOOKING: (bookingId: string): string =>
        withId(`${BOOKING_SERVICE_ADDR}/admin/bookings/cancel`, bookingId),
    RETURN_ADMIN_BOOKING: (bookingId: string): string =>
        withId(`${BOOKING_SERVICE_ADDR}/admin/bookings/return`, bookingId),
    BOOKING_STATES: `${BOOKING_SERVICE_ADDR}/user/bookings/states`,
    RESERVATION_COST: `${BOOKING_SERVICE_ADDR}/user/bookings/cost`,
    CREATE_BOOKING: `${BOOKING_SERVICE_ADDR}/user/bookings`,
    GET_ALL_LOCATIONS: `${BOOKING_SERVICE_ADDR}/locations/all`,
    GET_LOCATIONS: `${BOOKING_SERVICE_ADDR}/locations`,
    ADD_LOCATION: `${BOOKING_SERVICE_ADDR}/locations`,
    CANCEL_USER_BOOKING: (bookingId: string): string =>
        withId(`${BOOKING_SERVICE_ADDR}/user/bookings/cancel`, bookingId),
    GET_USER_BOOKINGS: `${BOOKING_SERVICE_ADDR}/user/bookings`,
    GET_USER_BOOKINGS_RESERVED: `${BOOKING_SERVICE_ADDR}/user/bookings/reserved`,
    GET_USER_BOOKINGS_RENTED: `${BOOKING_SERVICE_ADDR}/user/bookings/rented`,
    GET_BOOKINGS_AUDIT_LOGS: `${BOOKING_SERVICE_ADDR}/bookings-audit-logs`,
};
export const RATING_SERVICE_ENDPOINTS = {
    GET_VEHICLE_COMMENTS_BY_ID: (vehicleId: string): string =>
        withId(`${RATING_SERVICE_ADDR}/comments/vehicle`, vehicleId),
    ADD_COMMENT: `${RATING_SERVICE_ADDR}/comments`,
};
export const STORAGE_SERVICE_ENDPOINTS = {
    VEHICLE_IMAGE: (photoName: string): string => `${STORAGE_STUB_SERVICE_ADDR}/vehicles-images/${photoName}`,
};
export const USER_SERVICE_ENDPOINTS = {
    IS_USER_WITH_EMAIL_EXISTS: `${USER_SERVICE_ADDR}/users/email-exists`,
    SEND_RESET_PASSWORD_EMAIL: `${USER_SERVICE_ADDR}/reset-password/send-email`,
    SAVE_USER_PASSWORD_AFTER_RESET: `${USER_SERVICE_ADDR}/reset-password/save-password`,
    USER_REGISTRATION: `${USER_SERVICE_ADDR}/registration/register-user`,
    GET_USERS_ROLES: `${USER_SERVICE_ADDR}/users-roles`,
    GET_USERS: `${USER_SERVICE_ADDR}/users`,
    SEND_EMAILS_TO_USERS: `${USER_SERVICE_ADDR}/users/send-emails`,
    GET_ALL_USERS_EMAILS: `${USER_SERVICE_ADDR}/users/all-emails`,
    GET_SELECTED_USERS_EMAILS: `${USER_SERVICE_ADDR}/users/selected-users-emails`,
    UPDATE_USER: (userId: string): string => withId(`${USER_SERVICE_ADDR}/users`, userId),
    UPDATE_USER_PASSWORD: `${USER_SERVICE_ADDR}/users/update-password`,
    UPDATE_AUTHORIZED_USER: `${USER_SERVICE_ADDR}/users/update-authenticated-user`,
    GET_USER_BY_ID: (userId: string): string => withId(`${USER_SERVICE_ADDR}/users`, userId),
    ADD_ROLE_TO_USER: (userId: string): string => `${withId(`${USER_SERVICE_ADDR}/users`, userId)}/roles`,
};
export const VEHICLE_SERVICE_ENDPOINTS = {
    GET_VEHICLE: `${VEHICLE_SERVICE_ADDR}/vehicles`,
    GET_VEHICLE_OPTIONS: `${VEHICLE_SERVICE_ADDR}/vehicles/options`,
    GET_BEST_OFFERS_VEHICLES: `${VEHICLE_SERVICE_ADDR}/vehicles/best-offers`,
    GET_VEHICLE_MODELS_BY_BRAND: (brand: string) =>
        withId(`${VEHICLE_SERVICE_ADDR}/vehicles/filter-params/brand-models`, brand),
    GET_VEHICLE_BY_ID: (vehicleId: string): string => withId(`${VEHICLE_SERVICE_ADDR}/vehicles`, vehicleId),
    ADD_VEHICLE: `${VEHICLE_SERVICE_ADDR}/vehicles`,
    ADD_EQUIPMENT: `${VEHICLE_SERVICE_ADDR}/equipments`,
    GET_VEHICLE_OPTIONS_WITH_ASSOC: `${VEHICLE_SERVICE_ADDR}/vehicles/options-with-assoc`,
    ADD_BRAND: `${VEHICLE_SERVICE_ADDR}/vehicles/brand`,
    ADD_BODY_TYPE: `${VEHICLE_SERVICE_ADDR}/vehicles/body-type`,
    ADD_FUEL_TYPE: `${VEHICLE_SERVICE_ADDR}/vehicles/fuel-type`,
    ADD_COLOR: `${VEHICLE_SERVICE_ADDR}/vehicles/color`,
    ADD_VEHICLE_MODEL: `${VEHICLE_SERVICE_ADDR}/vehicles/model`,
    DELETE_SPECIFIC_VEHICLE_OPTION: (vehicleOptionType: string, vehicleOption: string): string =>
        `${VEHICLE_SERVICE_ADDR}/vehicles/vehicle-options/${vehicleOptionType}/${vehicleOption}`,
    UPDATE_VEHICLE: (vehicleId: string): string => withId(`${VEHICLE_SERVICE_ADDR}/vehicles`, vehicleId),
    GET_AVAILABLE_VEHICLES: `${VEHICLE_SERVICE_ADDR}/vehicles/available`,
    GET_EQUIPMENTS: `${VEHICLE_SERVICE_ADDR}/equipments`,
    GET_EQUIPMENTS_NOT_ASSIGNED_TO_VEHICLE: (vehicleId: string): string =>
        withId(`${VEHICLE_SERVICE_ADDR}/equipments/not-assigned`, vehicleId),
    ADD_EQUIPMENT_TO_VEHICLE: (vehicleId: string): string =>
        withId(`${VEHICLE_SERVICE_ADDR}/equipments/add`, vehicleId),
    REMOVE_EQUIPMENT_FROM_VEHICLE: (vehicleId: string): string =>
        withId(`${VEHICLE_SERVICE_ADDR}/equipments/remove`, vehicleId),
};
