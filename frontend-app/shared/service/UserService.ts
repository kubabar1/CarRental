import { fetchGet, fetchPost, fetchPut } from './FetchUtil';
import { PAGE_REQUEST, USER_SERVICE_ENDPOINTS } from '../constant';
import {
    RoleAddDTO,
    Page,
    UserUpdateDTO,
    UsersEmailsResponseDTO,
    PasswordUpdateDTO,
    UserRoleResponseDTO,
    UserResponseDTO,
    ResponseData,
} from '../model';

export class UserService {
    static getUserById = (userId: string): Promise<UserResponseDTO> => {
        return fetchGet<UserResponseDTO>(USER_SERVICE_ENDPOINTS.GET_USER_BY_ID(userId));
    };

    static getUsersList = (
        page?: number,
        size?: number,
        filter?: string,
        sortBy?: string,
        desc?: boolean
    ): Promise<Page<UserResponseDTO>> => {
        return fetchGet<Page<UserResponseDTO>>(
            `${PAGE_REQUEST(USER_SERVICE_ENDPOINTS.GET_USERS, page, size, filter, sortBy, desc)}`
        );
    };

    static getAllUsersEmails = (): Promise<UsersEmailsResponseDTO> => {
        return fetchGet<UsersEmailsResponseDTO>(USER_SERVICE_ENDPOINTS.GET_ALL_USERS_EMAILS);
    };

    static getAllUsersEmailsByIds = (userIds: string[]): Promise<ResponseData<UsersEmailsResponseDTO>> => {
        return fetchPost<UsersEmailsResponseDTO>(USER_SERVICE_ENDPOINTS.GET_SELECTED_USERS_EMAILS, userIds);
    };

    static getAllUserRoles = (): Promise<UserRoleResponseDTO[]> => {
        return fetchGet<UserRoleResponseDTO[]>(USER_SERVICE_ENDPOINTS.GET_USERS_ROLES);
    };

    static addRolesToUser = (userRolesId: string[], userId: string): Promise<ResponseData<UserResponseDTO>> => {
        return fetchPost<UserResponseDTO>(
            USER_SERVICE_ENDPOINTS.ADD_ROLE_TO_USER(userId),
            userRolesId.map((userRoleId: string) => new RoleAddDTO(userRoleId)),
            `Roles for user with id '${userId}' updated`,
            `Cannot update roles for user with id '${userId}' - error occurred`
        );
    };

    static updateUserPassword = (
        passwordUpdateDRO: PasswordUpdateDTO
    ): Promise<ResponseData<UserResponseDTO | PasswordUpdateDTO>> => {
        return fetchPut<UserResponseDTO | PasswordUpdateDTO>(
            USER_SERVICE_ENDPOINTS.UPDATE_USER_PASSWORD,
            passwordUpdateDRO,
            'Password updated',
            'Cannot update password - error occurred'
        );
    };

    static updateUserData = (
        userId: string,
        settingsUpdateDTO: UserUpdateDTO
    ): Promise<ResponseData<UserResponseDTO>> => {
        return fetchPost<UserResponseDTO>(
            USER_SERVICE_ENDPOINTS.UPDATE_USER(userId),
            settingsUpdateDTO,
            `User with id '${userId}' updated`,
            `Cannot update user with id '${userId}' - error occurred`
        );
    };

    static updateAuthorizedUserData = (settingsUpdateDTO: UserUpdateDTO): Promise<ResponseData<UserResponseDTO>> => {
        return fetchPut<UserResponseDTO>(
            USER_SERVICE_ENDPOINTS.UPDATE_AUTHORIZED_USER,
            settingsUpdateDTO,
            'Data updated',
            'Cannot update data'
        );
    };
}
