import React from 'react';
import { InputFormGroup } from '../../../components/form/form-group/input/InputFormGroup';
import { getAuthorizedUserData, updateAuthorizedUserData } from '../../../service/UserService';
import { FormContainer } from '../../../components/form/form-group/FormContainer';
import { UserUpdateDTO } from '../../../model/UserUpdateDTO';
import { AuthenticatedUserDTO } from '../../../model/AuthenticatedUserDTO';
import './UserSettingsSubpage.scss';
import { UserResponseDTO } from '../../../model/UserResponseDTO';
import { ResponseData } from '../../../service/FetchUtil';
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
        updateAuthorizedUserData(new UserUpdateDTO(data.name, data.surname, data.phone, data.birthDate)).then(
            (userResponse: ResponseData<UserResponseDTO>) => {
                if (userResponse.statusCode == 200 && !!userResponse.responseBody) {
                    getAuthorizedUserData().then((authenticatedUserDTO: AuthenticatedUserDTO) =>
                        setAuthenticatedUser(authenticatedUserDTO)
                    );
                }
            }
        );
    };

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <InputFormGroup<UserSettingsFormValues>
                label={'Name:'}
                name={'name'}
                register={register}
                registerOptions={{ required: 'Name is required' }}
                error={formState.errors.name}
            />
            <InputFormGroup<UserSettingsFormValues>
                label={'Surname:'}
                name={'surname'}
                register={register}
                registerOptions={{ required: 'Surname is required' }}
                error={formState.errors.surname}
            />
            <InputFormGroup<UserSettingsFormValues>
                label={'Phone:'}
                name={'phone'}
                register={register}
                registerOptions={{ required: 'Phone is required' }}
                error={formState.errors.phone}
            />
            {/*// TODO: Add constrain for max date*/}
            <InputFormGroup<UserSettingsFormValues>
                label={'Birth date:'}
                name={'birthDate'}
                register={register}
                registerOptions={{ required: 'Birth date is required' }}
                error={formState.errors.birthDate}
                type={'date'}
            />
        </FormContainer>
    );
}