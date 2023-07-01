import { fetchGet, fetchPost, fetchPut, ResponseData } from './FetchUtil';
import {
    ADD_ROLE_TO_USER_PATH,
    GET_ALL_USERS_EMAILS,
    GET_AUTHORIZED_USER_PATH,
    GET_SELECTED_USERS_EMAILS,
    GET_USER_BY_ID_PATH,
    GET_USERS_PATH,
    GET_USERS_ROLES_PATH,
    PAGE_REQUEST,
    UPDATE_AUTHORIZED_USER_PATH,
    UPDATE_USER_PASSWORD_PATH,
    UPDATE_USER_PATH,
} from '../constant/PathsAPI';
import {
    RoleAddDTO,
    Page,
    AuthenticatedUserDTO,
    UserUpdateDTO,
    UsersEmailsResponseDTO,
    PasswordUpdateDTO,
    UserRoleResponseDTO,
    UserResponseDTO,
} from '../model';

export const getAuthorizedUserData = (): Promise<AuthenticatedUserDTO> => {
    return fetchGet<AuthenticatedUserDTO>(GET_AUTHORIZED_USER_PATH);
};

export const getUserById = (userId: string): Promise<UserResponseDTO> => {
    return fetchGet<UserResponseDTO>(GET_USER_BY_ID_PATH(userId));
};

export const getUsersList = (
    page?: number,
    size?: number,
    filter?: string,
    sortBy?: string,
    desc?: boolean
): Promise<Page<UserResponseDTO>> => {
    return fetchGet<Page<UserResponseDTO>>(`${PAGE_REQUEST(GET_USERS_PATH, page, size, filter, sortBy, desc)}`);
};

export const getAllUsersEmails = (): Promise<UsersEmailsResponseDTO> => {
    return fetchGet<UsersEmailsResponseDTO>(GET_ALL_USERS_EMAILS);
};

export const getAllUsersEmailsByIds = (userIds: string[]): Promise<ResponseData<UsersEmailsResponseDTO>> => {
    return fetchPost<UsersEmailsResponseDTO>(GET_SELECTED_USERS_EMAILS, userIds);
};

export const getAllUserRoles = (): Promise<UserRoleResponseDTO[]> => {
    return fetchGet<UserRoleResponseDTO[]>(GET_USERS_ROLES_PATH);
};

export const updateAuthorizedUserData = (settingsUpdateDTO: UserUpdateDTO): Promise<ResponseData<UserResponseDTO>> => {
    return fetchPut<UserResponseDTO>(UPDATE_AUTHORIZED_USER_PATH, settingsUpdateDTO);
};

export const updateUserData = (
    userId: string,
    settingsUpdateDTO: UserUpdateDTO
): Promise<ResponseData<UserResponseDTO>> => {
    return fetchPost<UserResponseDTO>(UPDATE_USER_PATH(userId), settingsUpdateDTO);
};

export const addRolesToUser = (userRolesId: string[], userId: string): Promise<ResponseData<UserResponseDTO>> => {
    return fetchPost<UserResponseDTO>(
        ADD_ROLE_TO_USER_PATH(userId),
        userRolesId.map((userRoleId: string) => new RoleAddDTO(userRoleId))
    );
};

export const updateUserPassword = (
    passwordUpdateDRO: PasswordUpdateDTO
): Promise<ResponseData<UserResponseDTO | PasswordUpdateDTO>> => {
    return fetchPut<UserResponseDTO | PasswordUpdateDTO>(UPDATE_USER_PASSWORD_PATH, passwordUpdateDRO);
};
