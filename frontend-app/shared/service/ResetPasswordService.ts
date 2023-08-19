import {
    UserEmailExistsDTO,
    PasswordResetRequestDTO,
    PasswordResetResponseDTO,
    PasswordResetDTO,
    ResponseData,
} from '../model';
import { fetchPost } from './FetchUtil';
import { USER_SERVICE_ENDPOINTS } from '../constant';

export class ResetPasswordService {
    static checkIfUserWithEmailExists = (userEmail: string): Promise<ResponseData<UserEmailExistsDTO>> => {
        return fetchPost<UserEmailExistsDTO>(
            USER_SERVICE_ENDPOINTS.IS_USER_WITH_EMAIL_EXISTS,
            new PasswordResetRequestDTO(userEmail)
        );
    };

    static sendResetPasswordEmail = (userEmail: string): Promise<ResponseData<PasswordResetResponseDTO>> => {
        return fetchPost<PasswordResetResponseDTO>(
            USER_SERVICE_ENDPOINTS.SEND_RESET_PASSWORD_EMAIL,
            new PasswordResetRequestDTO(userEmail)
        );
    };

    static resetUserPassword = (
        passwordResetDTO: PasswordResetDTO
    ): Promise<ResponseData<PasswordResetResponseDTO>> => {
        return fetchPost<PasswordResetResponseDTO>(
            USER_SERVICE_ENDPOINTS.SAVE_USER_PASSWORD_AFTER_RESET,
            passwordResetDTO
        );
    };
}
