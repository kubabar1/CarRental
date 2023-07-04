import { endpoints } from '../constant';
import {
    UserEmailExistsDTO,
    PasswordResetRequestDTO,
    PasswordResetResponseDTO,
    PasswordResetDTO,
    ResponseData,
} from '../model';
import { fetchPost } from './FetchUtil';

export class ResetPasswordService {
    static checkIfUserWithEmailExists = (userEmail: string): Promise<ResponseData<UserEmailExistsDTO>> => {
        return fetchPost<UserEmailExistsDTO>(endpoints.isUserWithEmailExists, new PasswordResetRequestDTO(userEmail));
    };

    static sendResetPasswordEmail = (userEmail: string): Promise<ResponseData<PasswordResetResponseDTO>> => {
        return fetchPost<PasswordResetResponseDTO>(
            endpoints.sendResetPasswordEmail,
            new PasswordResetRequestDTO(userEmail)
        );
    };

    static resetUserPassword = (
        passwordResetDTO: PasswordResetDTO
    ): Promise<ResponseData<PasswordResetResponseDTO>> => {
        return fetchPost<PasswordResetResponseDTO>(endpoints.saveUserPasswordAfterReset, passwordResetDTO);
    };
}
