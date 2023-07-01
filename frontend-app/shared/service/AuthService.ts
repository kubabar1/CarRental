import { fetchGet } from './FetchUtil';
import { GET_AUTHENTICATED_USER_DATA_PATH, LOGOUT_PATH } from '../constant/PathsAPI';
import { AuthenticatedUserDTO } from '../model';

export class AuthService {
    static getAuthenticatedUserData = (): Promise<AuthenticatedUserDTO> => {
        return fetchGet<AuthenticatedUserDTO>(GET_AUTHENTICATED_USER_DATA_PATH);
    };

    static logout = (): Promise<Response> => {
        return fetch(LOGOUT_PATH, {
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
