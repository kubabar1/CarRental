import React, { useEffect, useState } from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { getUserById } from '../../service/UserService';
import { UserResponseDTO } from '../../model/UserResponseDTO';
import { useParams } from 'react-router-dom';
import { UserEditForm } from './UserEditForm';

export function UsersEditSubpage(): JSX.Element {
    const { userId } = useParams<{ userId: string }>();
    const [userBeforeUpdate, setUserBeforeUpdate] = useState<UserResponseDTO | undefined>(undefined);

    useEffect(() => {
        getUserById(userId).then((userBeforeUpdate: UserResponseDTO) => {
            setUserBeforeUpdate(userBeforeUpdate);
        });
    }, [userId]);

    return (
        <SubpageContainer>
            <SubpageHeader title={'Edit user'} />
            <SubpageContent>{userBeforeUpdate && <UserEditForm user={userBeforeUpdate} />}</SubpageContent>
        </SubpageContainer>
    );
}
