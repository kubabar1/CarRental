import React from 'react';
import './AsideNav.scss';
import { loginLink, logoutLink, profileLink, registrationLink } from '../../constants/Links';

interface AsideNavProperties {
    isAuthenticated: boolean;
}

export class AsideNav extends React.Component<AsideNavProperties> {
    constructor(props: AsideNavProperties) {
        super(props);
        this.state = {
            isAuthenticated: false,
        };
    }

    renderLink = (name: string, link: string): JSX.Element => {
        return (
            <a href={link} className="linkstyle nav-link">
                <small>{name}</small>
            </a>
        );
    };

    render(): JSX.Element {
        const { isAuthenticated } = this.props;

        return (
            <nav id="aside-nav" className="navbar navbar-expand navbar-dark bg-dark">
                <ul className="navbar-nav pr-3 ml-auto">
                    <li className="nav-item p-2 ">
                        {isAuthenticated
                            ? this.renderLink('Profile', profileLink)
                            : this.renderLink('Log in', loginLink)}
                    </li>
                    <li className="nav-item p-2">
                        {isAuthenticated
                            ? this.renderLink('Log out', logoutLink)
                            : this.renderLink('Sign up', registrationLink)}
                    </li>
                </ul>
            </nav>
        );
    }
}
