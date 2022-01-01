import React from 'react';
import { UserResponseDTO } from '../../model/UserResponseDTO';
import { mapUserRolesDtoToStringArray } from '../../utils/UserUtils';

export function UserRolesTableItem({ userRoles }: UserResponseDTO): JSX.Element {
    return (
        <div>
            {mapUserRolesDtoToStringArray(userRoles).map((userRole: string, id: number) => {
                return (
                    <div
                        key={`${id}-${userRole}`}
                        style={{
                            display: 'block',
                            color: 'white',
                            backgroundColor: '#cd3d37',
                            padding: '3px',
                            margin: '2px',
                            fontSize: '15px',
                            borderRadius: '10px',
                            textAlign: 'center',
                            lineHeight: '20px',
                            fontWeight: 'bold',
                        }}
                    >
                        {userRole}
                    </div>
                );
            })}
        </div>
    );
}

UserRolesTableItem.displayName = 'UserRolesTableItem';
