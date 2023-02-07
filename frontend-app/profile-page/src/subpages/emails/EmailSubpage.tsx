import React, { ChangeEvent, useEffect, useState } from 'react';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { FormContainer } from '../../components/form/FormContainer';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { useHistory } from 'react-router-dom';
import { InputFormGroup } from '../../components/form/InputFormGroup';
import { TextAreaFormGroup } from '../../components/form/TextAreaFormGroup';
import { mapToOptionType, OptionType, SelectFormGroup } from '../../components/form/SelectFormGroup';
import { OnChangeValue } from 'react-select/dist/declarations/src/types';
import { UsersEmailsResponseDTO } from '../../model/UsersEmailsResponseDTO';
import { getAllUsersEmails } from '../../service/UserService';
import { sendEmails } from '../../service/EmailService';
import { MultipleRecipientsMailsDTO } from '../../model/MultipleRecipientsMailsDTO';
import { sendEmailPath } from '../../constants/Links';

interface EmailHistoryState {
    emailAddresses: string[] | undefined;
}

export function EmailSubpage(): JSX.Element {
    const history = useHistory<EmailHistoryState>();
    const [allEmailAddresses, setAllEmailAddresses] = useState<OptionType[]>([]);
    const [recipients, setRecipients] = useState<string[]>([]);
    const [emailSubject, setEmailSubject] = useState<string>('');
    const [emailText, setEmailText] = useState<string>('');
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);

    useEffect(() => {
        if (history.location.state && history.location.state.emailAddresses) {
            setRecipients(history.location.state.emailAddresses);
        }
        getAllUsersEmails().then((usersEmails: UsersEmailsResponseDTO) => {
            setAllEmailAddresses(usersEmails.emails.map(mapToOptionType));
        });
    }, [history.location.state]);

    useEffect(() => {
        if (!!recipients && !!emailSubject && !!emailText) {
            setIsSubmitButtonDisabled(false);
        } else {
            setIsSubmitButtonDisabled(true);
        }
    }, [recipients, emailSubject, emailText]);

    return (
        <SubpageContainer>
            <SubpageHeader title={'Send email - form'} />
            <SubpageContent>
                <FormContainer
                    onSubmit={() => {
                        if (!isSubmitButtonDisabled) {
                            setIsSubmitButtonDisabled(true);
                            sendEmails(new MultipleRecipientsMailsDTO(recipients, emailSubject, emailText)).then(() => {
                                setIsSubmitButtonDisabled(false);
                                history.push(sendEmailPath.link);
                            });
                        }
                    }}
                    isSubmitButtonDisabled={isSubmitButtonDisabled}
                    submitButtonValue={'Send'}
                >
                    <SelectFormGroup<true>
                        label={'Receivers:'}
                        name={'email_receivers'}
                        value={recipients.map(mapToOptionType)}
                        onChange={(newRecipients: OnChangeValue<OptionType, true>) => {
                            const newRecipientsArr: string[] = newRecipients
                                .filter(
                                    (recipient: OptionType): recipient is { value: string; label: string } =>
                                        recipient.value !== null
                                )
                                .map((recipient) => recipient.value);
                            setRecipients(newRecipientsArr);
                        }}
                        options={allEmailAddresses}
                        required
                        isMulti={true}
                    />
                    <InputFormGroup
                        label={'Subject:'}
                        name={'email_subject'}
                        value={emailSubject}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setEmailSubject(event.target.value);
                        }}
                        required
                    />
                    <TextAreaFormGroup
                        label={'Message:'}
                        name={'email_message'}
                        value={emailText}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                            setEmailText(event.target.value);
                        }}
                        required
                    />
                </FormContainer>
            </SubpageContent>
        </SubpageContainer>
    );
}
