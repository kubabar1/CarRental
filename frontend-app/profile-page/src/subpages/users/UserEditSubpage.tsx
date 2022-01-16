import React, { ChangeEvent, useState } from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { InputFormGroup } from '../../components/form/InputFormGroup';
import { getUserById, updateUserSettings } from '../../service/UserService';
import { UserResponseDTO } from '../../model/UserResponseDTO';
import { FormContainer } from '../../components/form/FormContainer';
import { SettingsUpdateDTO } from '../../model/SettingsUpdateDTO';
import { useHistory, useParams } from 'react-router-dom';
import { usersListPath } from '../../constants/Links';

export function UsersEditSubpage(): JSX.Element {
    const history = useHistory();
    const { userId } = useParams<{ userId: string }>();
    const editedUser: UserResponseDTO = getUserById(userId);
    const [userLogin, setUserLogin] = useState<string>(editedUser.login);
    const [name, setName] = useState<string>(editedUser.name);
    const [surname, setSurname] = useState<string>(editedUser.surname);
    const [email, setEmail] = useState<string>(editedUser.email);
    const [phone, setPhone] = useState<string>(editedUser.phone);
    const [pesel, setPesel] = useState<string>(editedUser.pesel);
    const [birthDate, setBirthDate] = useState<string>(editedUser.birthDate.toISOString().slice(0, 10));

    return (
        <SubpageContainer>
            <SubpageHeader title={'Edit user'} />
            <SubpageContent>
                <FormContainer
                    onSubmit={() => {
                        updateUserSettings(
                            userId,
                            new SettingsUpdateDTO(userLogin, name, surname, email, phone, pesel, birthDate)
                        );
                        history.push(usersListPath);
                    }}
                >
                    <InputFormGroup
                        label={'Login:'}
                        name={'user_login'}
                        value={userLogin}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setUserLogin(event.target.value);
                        }}
                    />
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
                        label={'E-mail:'}
                        name={'user_email'}
                        value={email}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setEmail(event.target.value);
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
                    <InputFormGroup
                        label={'Pesel:'}
                        name={'user_pesel'}
                        value={pesel}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setPesel(event.target.value);
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
