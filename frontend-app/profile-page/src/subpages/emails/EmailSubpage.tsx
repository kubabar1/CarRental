import React, { useEffect, useState } from 'react';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { FormContainer } from '../../components/form/form-group/FormContainer';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { useHistory } from 'react-router-dom';
import { InputFormGroup } from '../../components/form/form-group/input/InputFormGroup';
import { TextAreaFormGroup } from '../../components/form/form-group/text-area/TextAreaFormGroup';
import { mapToOptionType, OptionType, SelectFormGroup } from '../../components/form/form-group/select/SelectFormGroup';
import { UserService, EmailService, TranslationService } from '@car-rental/shared/service';
import { MultipleRecipientsMailsDTO, UsersEmailsResponseDTO, ResponseData } from '@car-rental/shared/model';
import { useForm } from 'react-hook-form';

interface EmailHistoryState {
    userEmail: string;
    userIds: string[];
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
    const { register, formState, control, handleSubmit, setValue } = useForm<EmailFormValues>({
        mode: 'onChange',
        defaultValues: {
            recipients: [],
            emailSubject: '',
            emailText: '',
        },
    });

    useEffect(() => {
        UserService.getAllUsersEmails().then((usersEmails: UsersEmailsResponseDTO) => {
            setAllEmailAddresses(usersEmails.emails.map(mapToOptionType));
        });
        if (history.location.state && history.location.state.userEmail) {
            setValue('recipients', [history.location.state.userEmail]);
        } else if (history.location.state && history.location.state.userIds) {
            UserService.getAllUsersEmailsByIds(history.location.state.userIds).then(
                (usersEmails: ResponseData<UsersEmailsResponseDTO>) => {
                    setValue('recipients', usersEmails.responseBody.emails);
                }
            );
        }
    }, [history.location.state, setValue]);

    const onSubmit = (data: EmailFormValues): void => {
        if (!isSubmitButtonDisabled) {
            setIsSubmitButtonDisabled(true);
            EmailService.sendEmails(
                new MultipleRecipientsMailsDTO(data.recipients, data.emailSubject, data.emailText)
            ).then(() => {
                setIsSubmitButtonDisabled(false);
                setValue('recipients', []);
                setValue('emailSubject', '');
                setValue('emailText', '');
            });
        }
    };

    return (
        <SubpageContainer>
            <SubpageHeader title={TranslationService.translate('sendEmailFormSubpageTitle')} />
            <SubpageContent>
                <FormContainer
                    onSubmit={handleSubmit(onSubmit)}
                    isSubmitButtonDisabled={isSubmitButtonDisabled}
                    submitButtonValue={TranslationService.translate('sendEmailFormSubpageSendButton')}
                >
                    <SelectFormGroup<EmailFormValues, true>
                        label={TranslationService.translate('recipientsSendEmailFormSubpageLabel')}
                        name={'recipients'}
                        control={control}
                        options={allEmailAddresses}
                        rules={{ required: TranslationService.translate('recipientsSendEmailFormSubpageRequired') }}
                        error={formState.errors.recipients?.message}
                        isMulti={true}
                    />
                    <InputFormGroup<EmailFormValues>
                        label={TranslationService.translate('emailSubjectSendEmailFormSubpageLabel')}
                        name={'emailSubject'}
                        register={register}
                        registerOptions={{
                            required: TranslationService.translate('emailSubjectSendEmailFormSubpageRequired'),
                        }}
                        error={formState.errors.emailSubject}
                    />
                    <TextAreaFormGroup<EmailFormValues>
                        label={TranslationService.translate('emailTextSendEmailFormSubpageLabel')}
                        name={'emailText'}
                        register={register}
                        registerOptions={{
                            required: TranslationService.translate('emailTextSendEmailFormSubpageRequired'),
                        }}
                        error={formState.errors.emailText}
                    />
                </FormContainer>
            </SubpageContent>
        </SubpageContainer>
    );
}
