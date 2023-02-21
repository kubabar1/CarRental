import React, { useEffect, useState } from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { InputFormGroup } from '../../components/form/form-group/input/InputFormGroup';
import { getUserById, updateUserData } from '../../service/UserService';
import { UserResponseDTO } from '../../model/UserResponseDTO';
import { FormContainer } from '../../components/form/form-group/FormContainer';
import { UserUpdateDTO } from '../../model/UserUpdateDTO';
import { useHistory, useParams } from 'react-router-dom';
import { usersListPath } from '../../constants/Links';
import { useForm } from 'react-hook-form';

type UserEditFormValues = {
    name: string;
    surname: string;
    phone: string;
    birthDate: string;
};

export function UsersEditSubpage(): JSX.Element {
    const history = useHistory();
    const { userId } = useParams<{ userId: string }>();
    const [userBeforeUpdate, setUserBeforeUpdate] = useState<UserResponseDTO | undefined>(undefined);
    const { register, formState, handleSubmit } = useForm<UserEditFormValues>({
        mode: 'onChange',
        defaultValues: {
            name: userBeforeUpdate?.name,
        },
    });

    useEffect(() => {
        getUserById(userId).then((userBeforeUpdate: UserResponseDTO) => {
            setUserBeforeUpdate(userBeforeUpdate);
        });
    }, [userId]);

    const onSubmit = (data: UserEditFormValues): void => {
        updateUserData(userId, new UserUpdateDTO(data.name, data.surname, data.phone, data.birthDate)).then(() => {
            history.push(usersListPath.link);
        });
    };

    return (
        <SubpageContainer>
            <SubpageHeader title={'Edit user'} />
            <SubpageContent>
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
                        // defaultValue={userBeforeUpdate?.surname}
                        error={formState.errors.surname}
                    />
                    <InputFormGroup<UserEditFormValues>
                        label={'Phone:'}
                        name={'phone'}
                        register={register}
                        registerOptions={{ required: 'Phone is required' }}
                        // defaultValue={userBeforeUpdate?.phone}
                        error={formState.errors.phone}
                    />
                    {/*// TODO: Add constrain for max date*/}
                    <InputFormGroup<UserEditFormValues>
                        label={'Birth date:'}
                        name={'birthDate'}
                        register={register}
                        registerOptions={{ required: 'Birth date is required' }}
                        // defaultValue={userBeforeUpdate?.birthDate}
                        error={formState.errors.birthDate}
                    />
                </FormContainer>
            </SubpageContent>
        </SubpageContainer>
    );
}
