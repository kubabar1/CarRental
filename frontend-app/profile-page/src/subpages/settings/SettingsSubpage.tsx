import React, { useState } from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { FormGroup } from '../../components/form/FormGroup';
import { getCurrentUserData, updateUserSettings } from '../../service/UserService';
import { UserResponseDTO } from '../../model/UserResponseDTO';
import { FormContainer } from '../../components/form/FormContainer';
import { SettingsUpdateDTO } from '../../model/SettingsUpdateDTO';

export function SettingsSubpage(): JSX.Element {
    const currentUser: UserResponseDTO = getCurrentUserData();
    const [userLogin, setUserLogin] = useState<string>(currentUser.login);
    const [name, setName] = useState<string>(currentUser.name);
    const [surname, setSurname] = useState<string>(currentUser.surname);
    const [email, setEmail] = useState<string>(currentUser.email);
    const [phone, setPhone] = useState<string>(currentUser.phone);
    const [pesel, setPesel] = useState<string>(currentUser.pesel);
    const [birthDate, setBirthDate] = useState<string>(currentUser.birthDate.toISOString().slice(0, 10));

    return (
        <SubpageContainer>
            <SubpageHeader title={'Settings'} />
            <SubpageContent>
                <FormContainer
                    onSubmit={() => {
                        updateUserSettings(
                            new SettingsUpdateDTO(userLogin, name, surname, email, phone, pesel, birthDate)
                        );
                    }}
                >
                    <FormGroup label={'Login:'} name={'user_login'} value={userLogin} onChange={setUserLogin} />
                    <FormGroup label={'Name:'} name={'user_name'} value={name} onChange={setName} />
                    <FormGroup label={'Surname:'} name={'user_surname'} value={surname} onChange={setSurname} />
                    <FormGroup label={'E-mail:'} name={'user_email'} value={email} onChange={setEmail} />
                    <FormGroup label={'Phone:'} name={'user_phone'} value={phone} onChange={setPhone} />
                    <FormGroup label={'Pesel:'} name={'user_pesel'} value={pesel} onChange={setPesel} />
                    {/*// TODO: Add constrain for max date*/}
                    <FormGroup
                        label={'Birth date:'}
                        name={'user_birth_date'}
                        value={birthDate}
                        onChange={setBirthDate}
                        type={'date'}
                    />
                </FormContainer>
            </SubpageContent>
        </SubpageContainer>
    );
}
