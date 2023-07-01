import { fetchPost } from './FetchUtil';
import { MultipleRecipientsMailsDTO } from '../model';
import { SEND_EMAILS_TO_USERS } from '../constant/PathsAPI';

export class EmailService {
    static sendEmails = (multipleRecipientsMailsDTO: MultipleRecipientsMailsDTO): Promise<void> => {
        return new Promise<void>(() => {
            return fetchPost<MultipleRecipientsMailsDTO>(SEND_EMAILS_TO_USERS, multipleRecipientsMailsDTO);
        });
    };
}
