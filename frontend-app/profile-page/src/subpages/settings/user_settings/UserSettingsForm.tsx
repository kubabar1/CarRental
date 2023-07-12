import React from 'react';
import { InputFormGroup } from '../../../components/form/form-group/input/InputFormGroup';
import { AuthService, TranslationService, UserService } from '@car-rental/shared/service';
import { FormContainer } from '../../../components/form/form-group/FormContainer';
import { AuthenticatedUserDTO, UserUpdateDTO, UserResponseDTO, ResponseData } from '@car-rental/shared/model';
import './UserSettingsSubpage.scss';
import { useForm } from 'react-hook-form';

interface UserSettingsProps {
    authenticatedUser: AuthenticatedUserDTO;
    setAuthenticatedUser: (authenticatedUserDTO: AuthenticatedUserDTO) => void;
}

type UserSettingsFormValues = {
    name: string;
    surname: string;
    phone: string;
    birthDate: string;
};

export function UserSettingsForm({ authenticatedUser, setAuthenticatedUser }: UserSettingsProps): JSX.Element {
    const { register, formState, handleSubmit } = useForm<UserSettingsFormValues>({
        mode: 'onChange',
        defaultValues: {
            name: authenticatedUser.name,
            surname: authenticatedUser.surname,
            phone: authenticatedUser.phone,
            birthDate: authenticatedUser.birthDate,
        },
    });

    const onSubmit = (data: UserSettingsFormValues): void => {
        UserService.updateAuthorizedUserData(
            new UserUpdateDTO(data.name, data.surname, data.phone, data.birthDate)
        ).then((userResponse: ResponseData<UserResponseDTO>) => {
            if (userResponse.statusCode == 200 && !!userResponse.responseBody) {
                AuthService.getAuthenticatedUserData().then((authenticatedUserDTO: AuthenticatedUserDTO) =>
                    setAuthenticatedUser(authenticatedUserDTO)
                );
            }
        });
    };

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <InputFormGroup<UserSettingsFormValues>
                label={TranslationService.translate('nameUserSettingsFormLabel')}
                name={'name'}
                register={register}
                registerOptions={{ required: TranslationService.translate('nameRequiredUserSettingsForm') }}
                error={formState.errors.name}
            />
            <InputFormGroup<UserSettingsFormValues>
                label={TranslationService.translate('surnameUserSettingsFormLabel')}
                name={'surname'}
                register={register}
                registerOptions={{ required: TranslationService.translate('surnameRequiredUserSettingsForm') }}
                error={formState.errors.surname}
            />
            <InputFormGroup<UserSettingsFormValues>
                label={TranslationService.translate('phoneUserSettingsFormLabel')}
                name={'phone'}
                register={register}
                registerOptions={{ required: TranslationService.translate('phoneRequiredUserSettingsForm') }}
                error={formState.errors.phone}
            />
            {/*// TODO: Add constrain for max date*/}
            <InputFormGroup<UserSettingsFormValues>
                label={TranslationService.translate('birthDateUserSettingsFormLabel')}
                name={'birthDate'}
                register={register}
                registerOptions={{ required: TranslationService.translate('birthDateRequiredUserSettingsForm') }}
                error={formState.errors.birthDate}
                type={'date'}
            />
        </FormContainer>
    );
}
