import React from 'react';
import './AsideNav.scss';
import { loginLink, profileLink, registrationLink } from '../../constants/Links';
import { AuthenticatedUserDTO } from '../../model/AuthenticatedUserDTO';

interface AsideNavProperties {
    authenticatedUser: AuthenticatedUserDTO | undefined;
    logout: () => void;
}

export function AsideNav({ authenticatedUser, logout }: AsideNavProperties): JSX.Element {
    const renderLink = (name: string, link: string): JSX.Element => {
        return (
            <a href={link} className="linkstyle nav-link">
                <small>{name}</small>
            </a>
        );
    };

    const renderLogout = (name: string): JSX.Element => {
        return (
            <a
                className="linkstyle nav-link"
                onClick={(event) => {
                    event.preventDefault();
                    logout();
                }}
            >
                <small>{name}</small>
            </a>
        );
    };

    const isAuthenticated: boolean = !!authenticatedUser && authenticatedUser.authenticated;

    return (
        <nav id="aside-nav" className="navbar navbar-expand navbar-dark bg-dark">
            <ul className="navbar-nav pr-3 ml-auto">
                <li className="nav-item p-2 ">
                    {!!authenticatedUser && isAuthenticated
                        ? renderLink('Profile', profileLink)
                        : renderLink('Log in', loginLink)}
                </li>
                <li className="nav-item p-2">
                    {!!authenticatedUser && isAuthenticated
                        ? renderLogout('Log out')
                        : renderLink('Sign up', registrationLink)}
                </li>
            </ul>
        </nav>
    );
}
