import React from 'react';
import { InputFormGroup } from '../../components/form/form-group/input/InputFormGroup';
import { FormContainer } from '../../components/form/form-group/FormContainer';
import { UserUpdateDTO, UserResponseDTO } from '@car-rental/shared/model';
import { useHistory, useParams } from 'react-router-dom';
import { usersListPath } from '../../constants/Links';
import { useForm } from 'react-hook-form';
import { TranslationService, UserService } from '@car-rental/shared/service';

type UserEditFormValues = {
    name: string;
    surname: string;
    phone: string;
    birthDate: string;
};

interface UserEditForm {
    user: UserResponseDTO;
}

export function UserEditForm({ user }: UserEditForm): JSX.Element {
    const history = useHistory();
    const { userId } = useParams<{ userId: string }>();
    const { register, formState, handleSubmit } = useForm<UserEditFormValues>({
        mode: 'onChange',
        defaultValues: {
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            birthDate: user.birthDate,
        },
    });

    const onSubmit = (data: UserEditFormValues): void => {
        UserService.updateUserData(userId, new UserUpdateDTO(data.name, data.surname, data.phone, data.birthDate)).then(
            () => {
                history.push(usersListPath.link);
            }
        );
    };

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <InputFormGroup<UserEditFormValues>
                label={TranslationService.translate('nameEditUserSubpageLabel')}
                name={'name'}
                register={register}
                registerOptions={{ required: TranslationService.translate('nameEditUserSubpageRequired') }}
                error={formState.errors.name}
            />
            <InputFormGroup<UserEditFormValues>
                label={TranslationService.translate('surnameEditUserSubpageLabel')}
                name={'surname'}
                register={register}
                registerOptions={{ required: TranslationService.translate('surnameEditUserSubpageRequired') }}
                error={formState.errors.surname}
            />
            <InputFormGroup<UserEditFormValues>
                label={TranslationService.translate('phoneEditUserSubpageLabel')}
                name={'phone'}
                register={register}
                registerOptions={{ required: TranslationService.translate('phoneEditUserSubpageRequired') }}
                error={formState.errors.phone}
            />
            {/*// TODO: Add constrain for max date*/}
            <InputFormGroup<UserEditFormValues>
                label={TranslationService.translate('birthDateEditUserSubpageLabel')}
                name={'birthDate'}
                register={register}
                registerOptions={{ required: TranslationService.translate('birthDateEditUserSubpageRequired') }}
                error={formState.errors.birthDate}
            />
        </FormContainer>
    );
}
