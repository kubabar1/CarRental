import { fetchGet, fetchPost } from './FetchUtil';
import { GET_AUTHENTICATED_USER_DATA_PATH, LOGIN_PATH, LOGOUT_PATH } from '../constant';
import { AuthenticatedUserDTO, JwtRequestDTO, JwtResponseDTO, ResponseData } from '../model';

export class AuthService {
    static getAuthenticatedUserData = (): Promise<AuthenticatedUserDTO> => {
        return fetchGet<AuthenticatedUserDTO>(GET_AUTHENTICATED_USER_DATA_PATH);
    };

    static login = (jwtRequestDTO: JwtRequestDTO): Promise<ResponseData<JwtResponseDTO>> => {
        return fetchPost<JwtResponseDTO>(LOGIN_PATH, jwtRequestDTO);
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
