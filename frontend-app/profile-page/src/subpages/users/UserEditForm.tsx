import React from 'react';
import { InputFormGroup } from '../../components/form/form-group/input/InputFormGroup';
import { FormContainer } from '../../components/form/form-group/FormContainer';
import { UserUpdateDTO, UserResponseDTO } from '@car-rental/shared/model';
import { useHistory, useParams } from 'react-router-dom';
import { usersListPath } from '../../constants/Links';
import { useForm } from 'react-hook-form';
import { UserService } from '@car-rental/shared/service';

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
                label={'Name:'}
                name={'name'}
                register={register}
                registerOptions={{ required: 'Name is required' }}
                error={formState.errors.name}
            />
            <InputFormGroup<UserEditFormValues>
                label={'Surname:'}
                name={'surname'}
                register={register}
                registerOptions={{ required: 'Surname is required' }}
                error={formState.errors.surname}
            />
            <InputFormGroup<UserEditFormValues>
                label={'Phone:'}
                name={'phone'}
                register={register}
                registerOptions={{ required: 'Phone is required' }}
                error={formState.errors.phone}
            />
            {/*// TODO: Add constrain for max date*/}
            <InputFormGroup<UserEditFormValues>
                label={'Birth date:'}
                name={'birthDate'}
                register={register}
                registerOptions={{ required: 'Birth date is required' }}
                error={formState.errors.birthDate}
            />
        </FormContainer>
    );
}
