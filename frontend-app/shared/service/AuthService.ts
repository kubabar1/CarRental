import { fetchGet } from './FetchUtil';
import { GET_AUTHENTICATED_USER_DATA_PATH, LOGOUT_PATH } from '../constant/PathsAPI';
import { AuthenticatedUserDTO } from '../model';

export const getAuthenticatedUserData = (): Promise<AuthenticatedUserDTO> => {
    return fetchGet<AuthenticatedUserDTO>(GET_AUTHENTICATED_USER_DATA_PATH);
};

export const logout = (): Promise<Response> => {
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
