export const protocol = 'http';

export const host = 'localhost';

export const port = 8080;

export const DEFAULT_START_PAGE = 0;

export const DEFAULT_PAGE_SIZE = 10;

export const DEFAULT_PAGE_INDEX = 0;

export const context = '';

export const APP_ADDR: string = protocol + '://' + host + ':' + port + context;

const withId = (basePath: string, id: string): string => {
    return `${basePath}/${id}`;
};

export const vehicleImageFromServer = (photoName: string): string => `${APP_ADDR}/vehicles-images/${photoName}`;

export const GET_VEHICLES_PATH = `${APP_ADDR}/vehicles`;

export const GET_AUTHENTICATED_USER_DATA_PATH = `${APP_ADDR}/authentication/user-data`;

export const LOGIN_PATH = `${APP_ADDR}/login`;

export const LOGOUT_PATH = `${APP_ADDR}/logout`;

export const GET_BEST_OFFERS_VEHICLES_PATH = `${APP_ADDR}/vehicles/best-offers`;

export const GET_VEHICLE_OPTIONS_PATH = `${APP_ADDR}/vehicles/options`;

export const GET_ALL_LOCATIONS_PATH = `${APP_ADDR}/locations/all`;

export const USER_REGISTRATION_PATH = `${APP_ADDR}/registration/register-user`;

export const PAGE_REQUEST = (
    url: string,
    page: number = DEFAULT_START_PAGE,
    size: number = DEFAULT_PAGE_SIZE,
    filter?: string,
    sortBy?: string,
    desc = false
): string =>
    `${url}?page=${page}&size=${size}${filter ? `&filter=${filter}` : ''}${
        sortBy ? `&sort=${sortBy},${desc ? 'DESC' : 'ASC'}` : ''
    }`;

export const GET_VEHICLE_BY_ID_PATH = (vehicleId: string): string => withId(`${APP_ADDR}/vehicles`, vehicleId);

export const GET_VEHICLE_MODELS_BY_BRAND_PATH = (brand: string): string =>
    withId(`${APP_ADDR}/vehicles/filter-params/brand-models`, brand);

export const GET_VEHICLE_COMMENTS_BY_ID_PATH = (vehicleId: string): string =>
    withId(`${APP_ADDR}/comments/vehicle`, vehicleId);

export const ADD_COMMENT_PATH = `${APP_ADDR}/comments`;

export const endpoints = {
    authenticationEndpoint: APP_ADDR + '/userdata/is-authenticated',
    localisationsEndpoint: APP_ADDR + '/locations',
    brandListEndpoint: APP_ADDR + '/car-list-search/brands',
    cityListEndpoint: APP_ADDR + '/car-list-search/brands/cities',
    bodyTypesListEndpoint: APP_ADDR + '/car-list-search/body-types',
    coloursListEndpoint: APP_ADDR + '/car-list-search/colours',
    carByIdEndpoint: (carId: string): string => APP_ADDR + `/cars/${carId}`,
    login: APP_ADDR + '/login',
    isUserWithEmailExists: APP_ADDR + '/users/email-exists',
    sendResetPasswordEmail: APP_ADDR + '/reset-password/send-email',
    saveUserPasswordAfterReset: APP_ADDR + '/reset-password/save-password',
    reservationCost: `${APP_ADDR}/user/bookings/cost`,
    createBooking: `${APP_ADDR}/user/bookings`,
    getAvailableVehicles: `${APP_ADDR}/vehicles/available`,
};

const ADMIN_PATH = `${APP_ADDR}/admin`;

const USER_PATH = `${APP_ADDR}/user`;

export const GET_ADMIN_BOOKINGS_PATH = `${ADMIN_PATH}/bookings`;

export const GET_ADMIN_BOOKINGS_RESERVED_PATH = `${ADMIN_PATH}/bookings/reserved`;

export const GET_ADMIN_BOOKINGS_RENTED_PATH = `${ADMIN_PATH}/bookings/rented`;

export const RENT_ADMIN_BOOKING = (bookingId: string): string => withId(`${ADMIN_PATH}/bookings/rent`, bookingId);

export const CANCEL_ADMIN_BOOKING = (bookingId: string): string => withId(`${ADMIN_PATH}/bookings/cancel`, bookingId);

export const RETURN_ADMIN_BOOKING = (bookingId: string): string => withId(`${ADMIN_PATH}/bookings/return`, bookingId);

export const BOOKING_STATES = `${USER_PATH}/bookings/states`;

export const GET_BOOKINGS_AUDIT_LOGS_PATH = `${APP_ADDR}/bookings-audit-logs`;

export const GET_USER_BOOKINGS_PATH = `${USER_PATH}/bookings`;

export const GET_USER_BOOKINGS_RESERVED_PATH = `${USER_PATH}/bookings/reserved`;

export const GET_USER_BOOKINGS_RENTED_PATH = `${USER_PATH}/bookings/rented`;

export const CANCEL_USER_BOOKING = (bookingId: string): string => withId(`${USER_PATH}/bookings/cancel`, bookingId);

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

export const GET_VEHICLE_OPTIONS_WITH_ASSOC_PATH = `${APP_ADDR}/vehicles/options-with-assoc`;

export const ADD_BRAND_PATH = `${APP_ADDR}/vehicles/brand`;

export const ADD_BODY_TYPE_PATH = `${APP_ADDR}/vehicles/body-type`;

export const ADD_FUEL_TYPE_PATH = `${APP_ADDR}/vehicles/fuel-type`;

export const ADD_COLOR_PATH = `${APP_ADDR}/vehicles/color`;

export const ADD_VEHICLE_MODEL_PATH = `${APP_ADDR}/vehicles/model`;

export const DELETE_SPECIFIC_VEHICLE_OPTION_PATH = (vehicleOptionType: string, vehicleOption: string): string =>
    `${APP_ADDR}/vehicles/vehicle-options/${vehicleOptionType}/${vehicleOption}`;

export const UPDATE_VEHICLE_PATH = (vehicleId: string): string => withId(`${APP_ADDR}/vehicles`, vehicleId);

export const GET_USERS_ROLES_PATH = `${APP_ADDR}/users-roles`;

export const GET_USERS_PATH = `${APP_ADDR}/users`;

export const GET_ALL_USERS_EMAILS = `${APP_ADDR}/users/all-emails`;

export const GET_SELECTED_USERS_EMAILS = `${APP_ADDR}/users/selected-users-emails`;

export const SEND_EMAILS_TO_USERS = `${APP_ADDR}/users/send-emails`;

export const UPDATE_USER_PATH = (userId: string): string => withId(`${APP_ADDR}/users`, userId);

export const UPDATE_USER_PASSWORD_PATH = `${APP_ADDR}/users/update-password`;

export const UPDATE_AUTHORIZED_USER_PATH = `${APP_ADDR}/users/update-authenticated-user`;

export const GET_USER_BY_ID_PATH = (userId: string): string => withId(`${APP_ADDR}/users`, userId);

export const ADD_ROLE_TO_USER_PATH = (userId: string): string => `${withId(`${APP_ADDR}/users`, userId)}/roles`;
