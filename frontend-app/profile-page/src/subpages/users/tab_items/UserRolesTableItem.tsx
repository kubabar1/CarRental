import React from 'react';
import { mapUserRolesDtoToStringArray } from '../../../utils/UserUtils';
import './UserRolesTableItem.scss';
import { UserRoleResponseDTO } from '@car-rental/shared/model';

interface UserRolesTableItemProps {
    userRoles: UserRoleResponseDTO[];
}

export function UserRolesTableItem({ userRoles }: UserRolesTableItemProps): JSX.Element {
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
