import React, { ChangeEvent, useEffect, useState } from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { InputFormGroup } from '../../components/form/InputFormGroup';
import { getUserById, updateUserData } from '../../service/UserService';
import { UserResponseDTO } from '../../model/UserResponseDTO';
import { FormContainer } from '../../components/form/FormContainer';
import { UserUpdateDTO } from '../../model/UserUpdateDTO';
import { useHistory, useParams } from 'react-router-dom';
import { usersListPath } from '../../constants/Links';

export function UsersEditSubpage(): JSX.Element {
    const history = useHistory();
    const { userId } = useParams<{ userId: string }>();

    const [name, setName] = useState<string | undefined>(undefined);
    const [surname, setSurname] = useState<string | undefined>(undefined);
    const [phone, setPhone] = useState<string | undefined>(undefined);
    const [birthDate, setBirthDate] = useState<string | undefined>(undefined);

    useEffect(() => {
        getUserById(userId).then((authorizedUser: UserResponseDTO) => {
            setName(authorizedUser.name);
            setSurname(authorizedUser.surname);
            setPhone(authorizedUser.phone);
            setBirthDate(authorizedUser.birthDate);
        });
    }, [userId]);

    return (
        <SubpageContainer>
            <SubpageHeader title={'Edit user'} />
            <SubpageContent>
                <FormContainer
                    onSubmit={() => {
                        if (name && surname && phone && birthDate) {
                            updateUserData(userId, new UserUpdateDTO(name, surname, phone, birthDate));
                            history.push(usersListPath);
                        }
                    }}
                >
                    <InputFormGroup
                        label={'Name:'}
                        name={'user_name'}
                        value={name}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setName(event.target.value);
                        }}
                    />
                    <InputFormGroup
                        label={'Surname:'}
                        name={'user_surname'}
                        value={surname}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setSurname(event.target.value);
                        }}
                    />
                    <InputFormGroup
                        label={'Phone:'}
                        name={'user_phone'}
                        value={phone}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setPhone(event.target.value);
                        }}
                    />
                    {/*// TODO: Add constrain for max date*/}
                    <InputFormGroup
                        label={'Birth date:'}
                        name={'user_birth_date'}
                        value={birthDate}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setBirthDate(event.target.value);
                        }}
                        type={'date'}
                    />
                </FormContainer>
            </SubpageContent>
        </SubpageContainer>
    );
}
