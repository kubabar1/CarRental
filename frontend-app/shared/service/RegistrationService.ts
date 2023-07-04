import { CreateUserDTO, UserResponseDTO, ResponseData } from '../model';
import { fetchPut } from './FetchUtil';
import { USER_REGISTRATION_PATH } from '../constant';

export class RegistrationService {
    static registerUser = (createUserDTO: CreateUserDTO): Promise<ResponseData<UserResponseDTO | CreateUserDTO>> => {
        return fetchPut<UserResponseDTO | CreateUserDTO>(USER_REGISTRATION_PATH, createUserDTO);
    };
}
