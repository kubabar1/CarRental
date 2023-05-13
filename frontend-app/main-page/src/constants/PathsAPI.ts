export const protocol = 'http';

export const host = 'localhost';

export const port = 8080;

export const DEFAULT_START_PAGE = 0;

export const DEFAULT_PAGE_SIZE = 10;

export const context = '';

export const APP_ADDR: string = protocol + '://' + host + ':' + port + context;

const withId = (basePath: string, id: string): string => {
    return `${basePath}/${id}`;
};

export const GET_VEHICLES_PATH = `${APP_ADDR}/vehicles`;

export const GET_AUTHENTICATED_USER_DATA_PATH = `${APP_ADDR}/authentication/user-data`;

export const LOGOUT_PATH = `${APP_ADDR}/logout`;

export const GET_BEST_OFFERS_VEHICLES_PATH = `${APP_ADDR}/vehicles/best-offers`;

export const GET_VEHICLE_OPTIONS_PATH = `${APP_ADDR}/vehicles/options`;

export const GET_ALL_LOCATIONS_PATH = `${APP_ADDR}/locations/all`;

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

export const GET_VEHICLE_RATE_BY_ID_PATH = (vehicleId: string): string => withId(`${APP_ADDR}/rates`, vehicleId);

export const GET_VEHICLE_COMMENTS_BY_ID_PATH = (vehicleId: string): string =>
    withId(`${APP_ADDR}/comments/vehicle`, vehicleId);

export const ADD_COMMENT_PATH = `${APP_ADDR}/comments`;

export const endpoints = {
    authenticationEndpoint: APP_ADDR + '/userdata/is-authenticated',
    localisationsEndpoint: APP_ADDR + '/locations',
    brandListEndpoint: APP_ADDR + '/car-list-search/brands',
    brandModelsListEndpoint: (brand: string): string => APP_ADDR + `/car-list-search/brands/models/${brand}`,
    cityListEndpoint: APP_ADDR + '/car-list-search/brands/cities',
    bodyTypesListEndpoint: APP_ADDR + '/car-list-search/body-types',
    coloursListEndpoint: APP_ADDR + '/car-list-search/colours',
    carsPageableEndpoint: (page: number, pageCount: number): string =>
        APP_ADDR + `/cars?page=${page}&number=${pageCount}`,
    commentsEndpoint: (carId: string, page: number, pageCount: number): string =>
        APP_ADDR + `/comments/${carId}?page=${page}&number=${pageCount}`,
    carByIdEndpoint: (carId: string): string => APP_ADDR + `/cars/${carId}`,
};
