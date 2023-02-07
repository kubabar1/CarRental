import React from 'react';
import { mapUserRolesDtoToStringArray } from '../../../utils/UserUtils';
import './UserRolesTableItem.scss';
import { UserRoleResponseDTO } from '../../../model/UserRoleResponseDTO';

interface UserRolesTableItemProps {
    userRoles: UserRoleResponseDTO[];
}

export function UserRolesTableItem({ userRoles }: UserRolesTableItemProps): JSX.Element {
    console.log('LLLLLLLLLLLLLLLLLLLL');
    console.log(userRoles);
    return (
        <div>
            {mapUserRolesDtoToStringArray(userRoles).map((userRole: string, id: number) => {
                return (
                    <div key={`${id}-${userRole}`} className={'user-roles-table-item'}>
                        {userRole}
                    </div>
                );
            })}
        </div>
    );
}
