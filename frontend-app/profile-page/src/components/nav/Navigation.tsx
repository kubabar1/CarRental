import React from 'react';
import { UserData } from './user_data/UserData';
import { SideNav } from './side_nav/SideNav';
import { UserResponseDTO } from '../../model/UserResponseDTO';
import { mapUserRolesDtoToStringArray } from '../../utils/UserUtils';

interface NavContainerProperties {
    currentUser: UserResponseDTO;
}

export const Navigation = ({ currentUser }: NavContainerProperties): JSX.Element => (
    <div className="col-md-3 px-0">
        <div id="accordion">
            <UserData currentUser={currentUser} />
            <SideNav userRoles={mapUserRolesDtoToStringArray(currentUser.userRoles)} />
        </div>
    </div>
);
