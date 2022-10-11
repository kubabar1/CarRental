import React, { ChangeEvent, useEffect, useState } from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { InputFormGroup } from '../../components/form/InputFormGroup';
import { getAuthorizedUserData, updateAuthorizedUserData } from '../../service/UserService';
import { UserResponseDTO } from '../../model/UserResponseDTO';
import { FormContainer } from '../../components/form/FormContainer';
import { UserUpdateDTO } from '../../model/UserUpdateDTO';

export function SettingsSubpage(): JSX.Element {
    const [name, setName] = useState<string | undefined>(undefined);
    const [surname, setSurname] = useState<string | undefined>(undefined);
    const [phone, setPhone] = useState<string | undefined>(undefined);
    const [pesel, setPesel] = useState<string | undefined>(undefined);
    const [birthDate, setBirthDate] = useState<string | undefined>(undefined);

    useEffect(() => {
        getAuthorizedUserData().then((authorizedUser: UserResponseDTO) => {
            setName(authorizedUser.name);
            setSurname(authorizedUser.surname);
            setPhone(authorizedUser.phone);
            setPesel(authorizedUser.pesel);
            setBirthDate(authorizedUser.birthDate);
        });
    }, []);

    return (
        <SubpageContainer>
            <SubpageHeader title={'Settings'} />
            <SubpageContent>
                <FormContainer
                    onSubmit={() => {
                        if (name && surname && phone && birthDate && pesel) {
                            updateAuthorizedUserData(new UserUpdateDTO(name, surname, phone, birthDate, pesel));
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