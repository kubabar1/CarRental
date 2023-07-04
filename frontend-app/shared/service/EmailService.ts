import { fetchPost } from './FetchUtil';
import { MultipleRecipientsMailsDTO, ResponseData } from '../model';
import { SEND_EMAILS_TO_USERS } from '../constant';

export class EmailService {
    static sendEmails = (
        multipleRecipientsMailsDTO: MultipleRecipientsMailsDTO
    ): Promise<ResponseData<MultipleRecipientsMailsDTO>> => {
        return fetchPost<MultipleRecipientsMailsDTO>(
            SEND_EMAILS_TO_USERS,
            multipleRecipientsMailsDTO,
            `Email was sent`,
            `Cannot send email - error occurred`
        );
    };
}
