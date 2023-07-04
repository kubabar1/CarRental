import { fetchGet, fetchPost, fetchPut } from './FetchUtil';
import {
    ADD_ROLE_TO_USER_PATH,
    GET_ALL_USERS_EMAILS,
    GET_SELECTED_USERS_EMAILS,
    GET_USER_BY_ID_PATH,
    GET_USERS_PATH,
    GET_USERS_ROLES_PATH,
    PAGE_REQUEST,
    UPDATE_AUTHORIZED_USER_PATH,
    UPDATE_USER_PASSWORD_PATH,
    UPDATE_USER_PATH,
} from '../constant';
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
        return fetchGet<UserResponseDTO>(GET_USER_BY_ID_PATH(userId));
    };

    static getUsersList = (
        page?: number,
        size?: number,
        filter?: string,
        sortBy?: string,
        desc?: boolean
    ): Promise<Page<UserResponseDTO>> => {
        return fetchGet<Page<UserResponseDTO>>(`${PAGE_REQUEST(GET_USERS_PATH, page, size, filter, sortBy, desc)}`);
    };

    static getAllUsersEmails = (): Promise<UsersEmailsResponseDTO> => {
        return fetchGet<UsersEmailsResponseDTO>(GET_ALL_USERS_EMAILS);
    };

    static getAllUsersEmailsByIds = (userIds: string[]): Promise<ResponseData<UsersEmailsResponseDTO>> => {
        return fetchPost<UsersEmailsResponseDTO>(GET_SELECTED_USERS_EMAILS, userIds);
    };

    static getAllUserRoles = (): Promise<UserRoleResponseDTO[]> => {
        return fetchGet<UserRoleResponseDTO[]>(GET_USERS_ROLES_PATH);
    };

    static addRolesToUser = (userRolesId: string[], userId: string): Promise<ResponseData<UserResponseDTO>> => {
        return fetchPost<UserResponseDTO>(
            ADD_ROLE_TO_USER_PATH(userId),
            userRolesId.map((userRoleId: string) => new RoleAddDTO(userRoleId)),
            `Roles for user with id '${userId}' updated`,
            `Cannot update roles for user with id '${userId}' - error occurred`
        );
    };

    static updateUserPassword = (
        passwordUpdateDRO: PasswordUpdateDTO
    ): Promise<ResponseData<UserResponseDTO | PasswordUpdateDTO>> => {
        return fetchPut<UserResponseDTO | PasswordUpdateDTO>(
            UPDATE_USER_PASSWORD_PATH,
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
            UPDATE_USER_PATH(userId),
            settingsUpdateDTO,
            `User with id '${userId}' updated`,
            `Cannot update user with id '${userId}' - error occurred`
        );
    };

    static updateAuthorizedUserData = (settingsUpdateDTO: UserUpdateDTO): Promise<ResponseData<UserResponseDTO>> => {
        return fetchPut<UserResponseDTO>(
            UPDATE_AUTHORIZED_USER_PATH,
            settingsUpdateDTO,
            'Data updated',
            'Cannot update data'
        );
    };
}
