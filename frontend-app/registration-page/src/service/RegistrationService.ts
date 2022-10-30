import { CreateUserDTO } from '../model/CreateUserDTO';
import { UserResponseDTO } from '../model/UserResponseDTO';
import { fetchPut } from './FetchUtil';
import { USER_REGISTRATION_PATH } from '../constants/PathsServer';

export const registerUser = (createUserDTO: CreateUserDTO): Promise<UserResponseDTO> => {
    return fetchPut<UserResponseDTO>(USER_REGISTRATION_PATH, createUserDTO);
};
