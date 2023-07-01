import { CreateUserDTO } from '../model';
import { UserResponseDTO } from '../model';
import { fetchPut, ResponseData } from './FetchUtil';
import { USER_REGISTRATION_PATH } from '../constant/PathsAPI';

export const registerUser = (createUserDTO: CreateUserDTO): Promise<ResponseData<UserResponseDTO | CreateUserDTO>> => {
    return fetchPut<UserResponseDTO | CreateUserDTO>(USER_REGISTRATION_PATH, createUserDTO);
};
