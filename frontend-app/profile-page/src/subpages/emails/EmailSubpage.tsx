import React, { ChangeEvent, useEffect, useState } from 'react';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { FormContainer } from '../../components/form/FormContainer';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { useHistory, useParams } from 'react-router-dom';
import { InputFormGroup } from '../../components/form/InputFormGroup';
import { TextAreaFormGroup } from '../../components/form/TextAreaFormGroup';
import { sendEmailPath } from '../../constants/Links';
import { sendEmail } from '../../service/EmailService';

export function EmailSubpage(): JSX.Element {
    const history = useHistory();
    const { userId } = useParams<{ userId: string }>();
    const [emailSubject, setEmailSubject] = useState<string>('');
    const [emailMessage, setEmailMessage] = useState<string>('');
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);

    useEffect(() => {
        if (!!emailSubject && !!emailMessage) {
            setIsSubmitButtonDisabled(false);
        } else {
            setIsSubmitButtonDisabled(true);
        }
    }, [emailSubject, emailMessage]);

    return (
        <SubpageContainer>
            <SubpageHeader title={'Send email - form'} />
            <SubpageContent>
                <FormContainer
                    onSubmit={() => {
                        if (!!emailSubject && !!emailMessage) {
                            sendEmail(userId, emailSubject, emailMessage);
                            history.push(sendEmailPath);
                        }
                    }}
                    isSubmitButtonDisabled={isSubmitButtonDisabled}
                    submitButtonValue={'Send'}
                >
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
                        value={emailMessage}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                            setEmailMessage(event.target.value);
                        }}
                        required
                    />
                </FormContainer>
            </SubpageContent>
        </SubpageContainer>
    );
}
