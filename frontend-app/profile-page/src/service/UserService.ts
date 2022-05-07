import { UserResponseDTO } from '../model/UserResponseDTO';
import { UserRoleResponseDTO } from '../model/UserRoleResponseDTO';
import { UserUpdateDTO } from '../model/UserUpdateDTO';
import { fetchGet, fetchPost } from './FetchUtil';
import {
    ADD_ROLE_TO_USER_PATH,
    GET_AUTHORIZED_USER_PATH,
    GET_USER_BY_ID_PATH,
    GET_USER_ROLES_NOT_ASSIGNED_TO_USER_PATH,
    GET_USERS_PATH,
    GET_USERS_ROLES_PATH,
    UPDATE_AUTHORIZED_USER_PATH,
    UPDATE_USER_PATH,
} from '../constants/PathsAPI';
import { RoleAddDTO } from '../model/RoleAddDTO';

export const getAuthorizedUserData = (): Promise<UserResponseDTO> => {
    return fetchGet<UserResponseDTO>(GET_AUTHORIZED_USER_PATH);
};

export const getUserById = (userId: string): Promise<UserResponseDTO> => {
    return fetchGet<UserResponseDTO>(GET_USER_BY_ID_PATH(userId));
};

export const getUsersList = (): Promise<UserResponseDTO[]> => {
    return fetchGet<UserResponseDTO[]>(GET_USERS_PATH);
};

export const getAllUserRoles = (): Promise<UserRoleResponseDTO[]> => {
    return fetchGet<UserRoleResponseDTO[]>(GET_USERS_ROLES_PATH);
};

export const getAllUserRolesNotAssignedToUser = (userId: string): Promise<UserRoleResponseDTO[]> => {
    return fetchGet<UserRoleResponseDTO[]>(GET_USER_ROLES_NOT_ASSIGNED_TO_USER_PATH(userId));
};

export const updateAuthorizedUserData = (settingsUpdateDTO: UserUpdateDTO): Promise<UserResponseDTO> => {
    return fetchPost<UserResponseDTO>(UPDATE_AUTHORIZED_USER_PATH, settingsUpdateDTO);
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
