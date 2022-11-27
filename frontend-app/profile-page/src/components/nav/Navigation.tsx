import React, { MouseEvent } from 'react';
import { UserData } from './user_data/UserData';
import { SideNav } from './side_nav/SideNav';
import { AuthenticatedUserDTO } from '../../model/AuthenticatedUserDTO';

interface NavContainerProperties {
    authenticatedUser: AuthenticatedUserDTO;
    runLogout: (e: MouseEvent) => void;
}

export const Navigation = ({ authenticatedUser, runLogout }: NavContainerProperties): JSX.Element => (
    <div className="col-md-4 col-lg-3 col-xl-2 px-0">
        <div id="accordion">
            <UserData authenticatedUser={authenticatedUser} />
            <SideNav userRoles={authenticatedUser.userRoles} runLogout={runLogout} />
        </div>
    </div>
);
