import { getAuthorizedUserData } from './UserService';
import { AuthenticatedUserDTO } from '../model/AuthenticatedUserDTO';

export const sendEmail = (userId: string, emailSubject: string, emailMessage: string): Promise<void> => {
    return new Promise<void>(() => {
        getAuthorizedUserData().then((authenticatedUserDTO: AuthenticatedUserDTO) => {
            console.log(
                `Sending email with subject '${emailSubject}' and message '${emailMessage}' to address '${authenticatedUserDTO.email}'`
            );
        });
    });
};
