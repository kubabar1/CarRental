import { fetchPost } from './FetchUtil';
import { SEND_EMAILS_TO_USERS } from '../constants/PathsAPI';
import { MultipleRecipientsMailsDTO } from '../model/MultipleRecipientsMailsDTO';

export const sendEmails = (multipleRecipientsMailsDTO: MultipleRecipientsMailsDTO): Promise<void> => {
    return new Promise<void>(() => {
        return fetchPost<MultipleRecipientsMailsDTO>(SEND_EMAILS_TO_USERS, multipleRecipientsMailsDTO);
    });
};
