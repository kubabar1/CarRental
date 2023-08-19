import { CreateUserDTO, UserResponseDTO, ResponseData } from '../model';
import { fetchPut } from './FetchUtil';
import { USER_SERVICE_ENDPOINTS } from '../constant';

export class RegistrationService {
    static registerUser = (createUserDTO: CreateUserDTO): Promise<ResponseData<UserResponseDTO | CreateUserDTO>> => {
        return fetchPut<UserResponseDTO | CreateUserDTO>(USER_SERVICE_ENDPOINTS.USER_REGISTRATION, createUserDTO);
    };
}
