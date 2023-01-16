import { CreateUserDTO } from '../model/CreateUserDTO';
import { UserResponseDTO } from '../model/UserResponseDTO';
import { fetchPut, ResponseData } from './FetchUtil';
import { USER_REGISTRATION_PATH } from '../constants/PathsServer';

export const registerUser = (createUserDTO: CreateUserDTO): Promise<ResponseData<UserResponseDTO | CreateUserDTO>> => {
    return fetchPut<UserResponseDTO | CreateUserDTO>(USER_REGISTRATION_PATH, createUserDTO);
};
