import { fetchGet } from '../utils/FetchUtil';
import { endpoints } from '../constants/PathsAPI';
import { AuthenticatedUserDTO } from '../model/AuthenticatedUserDTO';

export const getAuthenticatedUserData = (): Promise<AuthenticatedUserDTO> => {
    return fetchGet<AuthenticatedUserDTO>(endpoints.authenticatedUserDataEndpoint);
};
