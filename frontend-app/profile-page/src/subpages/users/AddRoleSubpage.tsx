import React, { useEffect, useState } from 'react';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { useParams } from 'react-router-dom';
import { TranslationService, UserService } from '@car-rental/shared/service';
import { UserResponseDTO } from '@car-rental/shared/model';
import { AddRoleForm } from './AddRoleForm';

export function AddRoleSubpage(): JSX.Element {
    const { userId } = useParams<{ userId: string }>();
    const [userRolesBeforeUpdate, setUserRolesBeforeUpdate] = useState<string[] | undefined>(undefined);

    useEffect(() => {
        UserService.getUserById(userId).then((userBeforeUpdate: UserResponseDTO) => {
            setUserRolesBeforeUpdate(userBeforeUpdate.userRoles.map((role) => role.id));
        });
    }, [userId]);

    return (
        <SubpageContainer>
            <SubpageHeader title={TranslationService.translate('addUserRoleSubpageTitle')} />
            <SubpageContent>
                {userRolesBeforeUpdate && <AddRoleForm currentUserRoles={userRolesBeforeUpdate} />}
            </SubpageContent>
        </SubpageContainer>
    );
}
