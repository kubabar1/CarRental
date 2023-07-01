import { endpoints } from '../constant/PathsAPI';
import { UserEmailExistsDTO } from '../model';
import { PasswordResetRequestDTO } from '../model';
import { PasswordResetResponseDTO } from '../model';
import { PasswordResetDTO } from '../model';
import { fetchPost, ResponseData } from './FetchUtil';

export const checkIfUserWithEmailExists = (userEmail: string): Promise<ResponseData<UserEmailExistsDTO>> => {
    return fetchPost<UserEmailExistsDTO>(endpoints.isUserWithEmailExists, new PasswordResetRequestDTO(userEmail));
};

export const sendResetPasswordEmail = (userEmail: string): Promise<ResponseData<PasswordResetResponseDTO>> => {
    return fetchPost<PasswordResetResponseDTO>(
        endpoints.sendResetPasswordEmail,
        new PasswordResetRequestDTO(userEmail)
    );
};

export const resetUserPassword = (
    passwordResetDTO: PasswordResetDTO
): Promise<ResponseData<PasswordResetResponseDTO>> => {
    return fetchPost<PasswordResetResponseDTO>(endpoints.saveUserPasswordAfterReset, passwordResetDTO);
};
