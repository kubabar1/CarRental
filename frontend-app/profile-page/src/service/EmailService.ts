import { getAuthorizedUserData } from './UserService';
import { UserResponseDTO } from '../model/UserResponseDTO';

export const sendEmail = (userId: string, emailSubject: string, emailMessage: string): Promise<void> => {
    return new Promise<void>(() => {
        getAuthorizedUserData().then((authorizedUser: UserResponseDTO) => {
            console.log(
                `Sending email with subject '${emailSubject}' and message '${emailMessage}' to address '${authorizedUser.email}'`
            );
        });
    });
};
