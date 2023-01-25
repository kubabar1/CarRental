import { endpoints } from '../constants/PathsApi';
import { UserEmailExistsDTO } from '../model/UserEmailExistsDTO';
import { PasswordResetRequestDTO } from '../model/PasswordResetRequestDTO';
import { PasswordResetResponseDTO } from '../model/PasswordResetResponseDTO';
import { PasswordResetDTO } from '../model/PasswordResetDTO';

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

export interface ResponseData<T> {
    statusCode: number;
    responseBody: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export async function fetchPost<T>(getPath: string, data?: any): Promise<ResponseData<T>> {
    return fetch(getPath, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        ...(!!data && { body: JSON.stringify(data) }),
    }).then((res: Response) => {
        if (res.status >= 200 && res.status < 300) {
            console.log('POST OK');
        } else {
            console.log('POST NOK');
        }
        return res.json().then((data) => {
            return { statusCode: res.status, responseBody: data };
        });
    });
}
