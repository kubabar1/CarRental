import React, { ChangeEvent, useEffect, useState } from 'react';
import { SubpageContainer } from '../../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../../components/subpage/content/SubpageContent';
import { InputFormGroup } from '../../../components/form/InputFormGroup';
import { getAuthorizedUserData, updateAuthorizedUserData } from '../../../service/UserService';
import { FormContainer } from '../../../components/form/FormContainer';
import { UserUpdateDTO } from '../../../model/UserUpdateDTO';
import { AuthenticatedUserDTO } from '../../../model/AuthenticatedUserDTO';
import './UserSettingsSubpage.scss';
import { UserResponseDTO } from '../../../model/UserResponseDTO';
import { ResponseData } from '../../../service/FetchUtil';

interface UserSettingsSubpageProps {
    setAuthenticatedUser: (authenticatedUserDTO: AuthenticatedUserDTO) => void;
}

export function UserSettingsSubpage({ setAuthenticatedUser }: UserSettingsSubpageProps): JSX.Element {
    const [name, setName] = useState<string | undefined>(undefined);
    const [surname, setSurname] = useState<string | undefined>(undefined);
    const [phone, setPhone] = useState<string | undefined>(undefined);
    const [birthDate, setBirthDate] = useState<string | undefined>(undefined);

    useEffect(() => {
        getAuthorizedUserData().then((authenticatedUserDTO: AuthenticatedUserDTO) => {
            setName(authenticatedUserDTO.name);
            setSurname(authenticatedUserDTO.surname);
            setPhone(authenticatedUserDTO.phone);
            setBirthDate(authenticatedUserDTO.birthDate);
        });
    }, []);

    return (
        <SubpageContainer className="settings-container">
            <SubpageHeader title={'Settings'} />
            <SubpageContent>
                <FormContainer
                    onSubmit={() => {
                        if (name && surname && phone && birthDate) {
                            updateAuthorizedUserData(new UserUpdateDTO(name, surname, phone, birthDate)).then(
                                (userResponse: ResponseData<UserResponseDTO>) => {
                                    if (userResponse.statusCode == 200 && !!userResponse.responseBody) {
                                        setName(userResponse.responseBody.name);
                                        setSurname(userResponse.responseBody.surname);
                                        setPhone(userResponse.responseBody.phone);
                                        setBirthDate(userResponse.responseBody.birthDate);
                                        getAuthorizedUserData().then((authenticatedUserDTO: AuthenticatedUserDTO) =>
                                            setAuthenticatedUser(authenticatedUserDTO)
                                        );
                                    }
                                }
                            );
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
