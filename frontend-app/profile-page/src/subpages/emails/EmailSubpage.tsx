import React, { useEffect, useState } from 'react';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { FormContainer } from '../../components/form/form-group/FormContainer';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { useHistory } from 'react-router-dom';
import { InputFormGroup } from '../../components/form/form-group/input/InputFormGroup';
import { TextAreaFormGroup } from '../../components/form/form-group/text-area/TextAreaFormGroup';
import { mapToOptionType, OptionType, SelectFormGroup } from '../../components/form/form-group/select/SelectFormGroup';
import { UsersEmailsResponseDTO } from '../../model/UsersEmailsResponseDTO';
import { getAllUsersEmails } from '../../service/UserService';
import { sendEmails } from '../../service/EmailService';
import { MultipleRecipientsMailsDTO } from '../../model/MultipleRecipientsMailsDTO';
import { sendEmailPath } from '../../constants/Links';
import { useForm } from 'react-hook-form';

interface EmailHistoryState {
    emailAddress: string;
}

type EmailFormValues = {
    recipients: string[];
    emailSubject: string;
    emailText: string;
};

export function EmailSubpage(): JSX.Element {
    const history = useHistory<EmailHistoryState>();
    const [allEmailAddresses, setAllEmailAddresses] = useState<OptionType[]>([]);
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(false);
    const { register, formState, control, handleSubmit } = useForm<EmailFormValues>({
        mode: 'onChange',
        defaultValues: React.useMemo(() => {
            return {
                recipients:
                    history.location.state && history.location.state.emailAddress
                        ? [history.location.state.emailAddress]
                        : [],
                emailSubject: '',
                emailText: '',
            };
        }, [allEmailAddresses]),
    });

    useEffect(() => {
        getAllUsersEmails().then((usersEmails: UsersEmailsResponseDTO) => {
            setAllEmailAddresses(usersEmails.emails.map(mapToOptionType));
        });
    }, []);

    const onSubmit = (data: EmailFormValues): void => {
        if (!isSubmitButtonDisabled) {
            setIsSubmitButtonDisabled(true);
            sendEmails(new MultipleRecipientsMailsDTO(data.recipients, data.emailSubject, data.emailText)).then(() => {
                setIsSubmitButtonDisabled(false);
            });
        }
    };

    return (
        <SubpageContainer>
            <SubpageHeader title={'Send email - form'} />
            <SubpageContent>
                <FormContainer
                    onSubmit={handleSubmit(onSubmit)}
                    isSubmitButtonDisabled={isSubmitButtonDisabled}
                    submitButtonValue={'Send'}
                >
                    <SelectFormGroup<EmailFormValues, true>
                        label={'Receivers:'}
                        name={'recipients'}
                        control={control}
                        options={allEmailAddresses}
                        rules={{ required: 'Recipients are required' }}
                        error={formState.errors.recipients}
                        isMulti={true}
                    />
                    <InputFormGroup<EmailFormValues>
                        label={'Subject:'}
                        name={'emailSubject'}
                        register={register}
                        registerOptions={{ required: 'Subject is required' }}
                        error={formState.errors.emailSubject}
                    />
                    <TextAreaFormGroup<EmailFormValues>
                        label={'Message:'}
                        name={'emailText'}
                        register={register}
                        registerOptions={{ required: 'Description is required' }}
                        error={formState.errors.emailText}
                    />
                </FormContainer>
            </SubpageContent>
        </SubpageContainer>
    );
}
