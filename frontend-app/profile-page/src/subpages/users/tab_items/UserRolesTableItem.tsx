import React from 'react';
import { UserResponseDTO } from '../../../model/UserResponseDTO';
import { mapUserRolesDtoToStringArray } from '../../../utils/UserUtils';
import './UserRolesTableItem.scss';

export function UserRolesTableItem({ userRoles }: UserResponseDTO): JSX.Element {
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
