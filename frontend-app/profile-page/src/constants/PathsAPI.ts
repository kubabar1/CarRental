import { DEFAULT_PAGE_SIZE, DEFAULT_START_PAGE } from '../../../main-page/src/constants/PathsAPI';

const PROTOCOL = 'http';

const HOST = 'localhost';

const PORT = 8080;

const CONTEXT = '';

const APP_ADDR = `${PROTOCOL}://${HOST}:${PORT}${CONTEXT}`;

const ADMIN_PATH = `${APP_ADDR}/admin`;

const USER_PATH = `${APP_ADDR}/user`;

const withId = (basePath: string, id: string): string => {
    return `${basePath}/${id}`;
};

export const PAGE_REQUEST = (
    url: string,
    page: number = DEFAULT_START_PAGE,
    size: number = DEFAULT_PAGE_SIZE
): string => `${url}?page=${page}&size=${size}`;

export const GET_ADMIN_BOOKINGS_PATH = `${ADMIN_PATH}/bookings`;

export const GET_ADMIN_BOOKINGS_RESERVED_PATH = `${ADMIN_PATH}/bookings/reserved`;

export const GET_ADMIN_BOOKINGS_RENTED_PATH = `${ADMIN_PATH}/bookings/rented`;

export const RENT_ADMIN_BOOKING = (bookingId: string): string => withId(`${ADMIN_PATH}/bookings/rent`, bookingId);

export const CANCEL_ADMIN_BOOKING = (bookingId: string): string => withId(`${ADMIN_PATH}/bookings/cancel`, bookingId);

export const RETURN_ADMIN_BOOKING = (bookingId: string): string => withId(`${ADMIN_PATH}/bookings/return`, bookingId);

export const GET_BOOKINGS_AUDIT_LOGS_PATH = `${APP_ADDR}/bookings-audit-logs`;

export const GET_USER_BOOKINGS_PATH = `${USER_PATH}/bookings`;

export const GET_USER_BOOKINGS_RESERVED_PATH = `${USER_PATH}/bookings/reserved`;

export const GET_USER_BOOKINGS_RENTED_PATH = `${USER_PATH}/bookings/rented`;

export const CANCEL_USER_BOOKING = (bookingId: string): string => withId(`${USER_PATH}/bookings/cancel`, bookingId);

export const GET_VEHICLES_PATH = `${APP_ADDR}/vehicles`;

export const GET_LOCATIONS_PATH = `${APP_ADDR}/locations`;

export const ADD_LOCATION_PATH = `${APP_ADDR}/locations`;

export const GET_EQUIPMENTS_PATH = `${APP_ADDR}/equipments`;

export const GET_EQUIPMENTS_NOT_ASSIGNED_TO_VEHICLE_PATH = (vehicleId: string): string =>
    withId(`${APP_ADDR}/equipments/not-assigned`, vehicleId);

export const ADD_EQUIPMENT_TO_VEHICLE_PATH = (vehicleId: string): string =>
    withId(`${APP_ADDR}/equipments/add`, vehicleId);

export const REMOVE_EQUIPMENT_FROM_VEHICLE_PATH = (vehicleId: string): string =>
    withId(`${APP_ADDR}/equipments/remove`, vehicleId);

export const ADD_VEHICLE_PATH = `${APP_ADDR}/vehicles`;

export const ADD_EQUIPMENT = `${APP_ADDR}/equipments`;

export const GET_VEHICLE_OPTIONS_PATH = `${APP_ADDR}/vehicles/options`;

export const GET_VEHICLE_OPTIONS_WITH_ASSOC_PATH = `${APP_ADDR}/vehicles/options-with-assoc`;

export const ADD_BRAND_PATH = `${APP_ADDR}/vehicles/brand`;

export const ADD_BODY_TYPE_PATH = `${APP_ADDR}/vehicles/body-type`;

export const ADD_FUEL_TYPE_PATH = `${APP_ADDR}/vehicles/fuel-type`;

export const ADD_GEARBOX_PATH = `${APP_ADDR}/vehicles/gearbox`;

export const ADD_COLOR_PATH = `${APP_ADDR}/vehicles/color`;

export const ADD_VEHICLE_MODEL_PATH = `${APP_ADDR}/vehicles/model`;

export const GET_VEHICLE_MODELS_BY_BRAND_PATH = (brand: string): string =>
    `${APP_ADDR}/vehicles/filter-params/brand-models/${brand}`;

export const DELETE_SPECIFIC_VEHICLE_OPTION_PATH = (vehicleOptionType: string, vehicleOption: string): string =>
    `${APP_ADDR}/vehicles/vehicle-options/${vehicleOptionType}/${vehicleOption}`;

export const UPDATE_VEHICLE_PATH = (vehicleId: string): string => withId(`${APP_ADDR}/vehicles`, vehicleId);

export const GET_UNAVAILABLE_VEHICLES_PATH = `${APP_ADDR}/vehicles/unavailable`;

export const GET_VEHICLE_BY_ID_PATH = (vehicleId: string): string => withId(`${APP_ADDR}/vehicles`, vehicleId);

export const GET_USERS_ROLES_PATH = `${APP_ADDR}/users-roles`;

export const GET_USERS_PATH = `${APP_ADDR}/users`;

export const GET_ALL_USERS_EMAILS = `${APP_ADDR}/users/all-emails`;

export const SEND_EMAILS_TO_USERS = `${APP_ADDR}/users/send-emails`;

export const GET_AUTHORIZED_USER_PATH = `${APP_ADDR}/authentication/user-data`;

export const UPDATE_USER_PATH = (userId: string): string => withId(`${APP_ADDR}/users`, userId);

export const UPDATE_USER_PASSWORD_PATH = `${APP_ADDR}/users/update-password`;

export const UPDATE_AUTHORIZED_USER_PATH = `${APP_ADDR}/users/update-authenticated-user`;

export const GET_USER_BY_ID_PATH = (userId: string): string => withId(`${APP_ADDR}/users`, userId);

export const ADD_ROLE_TO_USER_PATH = (userId: string): string => `${withId(`${APP_ADDR}/users`, userId)}/roles`;

export const GET_AUTHENTICATED_USER_DATA_PATH = `${APP_ADDR}/authentication/user-data`;

export const LOGOUT_PATH = `${APP_ADDR}/logout`;
