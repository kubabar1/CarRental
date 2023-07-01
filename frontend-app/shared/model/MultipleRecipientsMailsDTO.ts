export class MultipleRecipientsMailsDTO {
    recipients: string[];
    subject: string;
    text: string;

    constructor(recipients: string[], subject: string, text: string) {
        this.recipients = recipients;
        this.subject = subject;
        this.text = text;
    }
}
