import { fetchGet } from './FetchUtil';
import { AUTH_SERVICE_ENDPOINTS } from '../constant';
import { AuthenticatedUserDTO } from '../model';

export class AuthService {
    static getAuthenticatedUserData = (): Promise<AuthenticatedUserDTO> => {
        return fetchGet<AuthenticatedUserDTO>(AUTH_SERVICE_ENDPOINTS.GET_AUTHENTICATED_USER_DATA);
    };

    static login = (data: URLSearchParams): Promise<Response> => {
        return fetch(AUTH_SERVICE_ENDPOINTS.LOGIN, {
            method: 'POST',
            // mode: 'cors',
            // cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow',
            // referrerPolicy: 'no-referrer',
            body: data,
        });
    };

    static logout = (): Promise<Response> => {
        return fetch(AUTH_SERVICE_ENDPOINTS.LOGOUT, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        });
    };
}
