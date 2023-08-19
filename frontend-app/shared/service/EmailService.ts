import { fetchPost } from './FetchUtil';
import { MultipleRecipientsMailsDTO, ResponseData } from '../model';
import { USER_SERVICE_ENDPOINTS } from '../constant';

export class EmailService {
    static sendEmails = (
        multipleRecipientsMailsDTO: MultipleRecipientsMailsDTO
    ): Promise<ResponseData<MultipleRecipientsMailsDTO>> => {
        return fetchPost<MultipleRecipientsMailsDTO>(
            USER_SERVICE_ENDPOINTS.SEND_EMAILS_TO_USERS,
            multipleRecipientsMailsDTO,
            `Email was sent`,
            `Cannot send email - error occurred`
        );
    };
}
