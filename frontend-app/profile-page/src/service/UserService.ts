import { UserResponseDTO } from '../model/UserResponseDTO';
import { UserRoleResponseDTO } from '../model/UserRoleResponseDTO';
import { UserUpdateDTO } from '../model/UserUpdateDTO';
import { fetchGet, fetchPost, fetchPut, ResponseData } from './FetchUtil';
import {
    ADD_ROLE_TO_USER_PATH,
    GET_ALL_USERS_EMAILS,
    GET_AUTHORIZED_USER_PATH,
    GET_SELECTED_USERS_EMAILS,
    GET_USER_BY_ID_PATH,
    GET_USERS_PATH,
    GET_USERS_ROLES_PATH,
    UPDATE_AUTHORIZED_USER_PATH,
    UPDATE_USER_PASSWORD_PATH,
    UPDATE_USER_PATH,
} from '../constants/PathsAPI';
import { RoleAddDTO } from '../model/RoleAddDTO';
import Page from '../../../main-page/src/model/Page';
import { PAGE_REQUEST } from '../../../main-page/src/constants/PathsAPI';
import { AuthenticatedUserDTO } from '../model/AuthenticatedUserDTO';
import { PasswordUpdateDTO } from '../model/PasswordUpdateDTO';
import { UsersEmailsResponseDTO } from '../model/UsersEmailsResponseDTO';

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

export const getAllUsersEmailsByIds = (userIds: string[]): Promise<UsersEmailsResponseDTO> => {
    return fetchPost<UsersEmailsResponseDTO>(GET_SELECTED_USERS_EMAILS, userIds);
};

export const getAllUserRoles = (): Promise<UserRoleResponseDTO[]> => {
    return fetchGet<UserRoleResponseDTO[]>(GET_USERS_ROLES_PATH);
};

export const updateAuthorizedUserData = (settingsUpdateDTO: UserUpdateDTO): Promise<ResponseData<UserResponseDTO>> => {
    return fetchPut<UserResponseDTO>(UPDATE_AUTHORIZED_USER_PATH, settingsUpdateDTO);
};

export const updateUserData = (userId: string, settingsUpdateDTO: UserUpdateDTO): Promise<UserResponseDTO> => {
    return fetchPost<UserResponseDTO>(UPDATE_USER_PATH(userId), settingsUpdateDTO);
};

export const addRolesToUser = (userRolesId: string[], userId: string): Promise<UserResponseDTO> => {
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
