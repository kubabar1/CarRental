import React from 'react';
import './AsideNav.scss';
import { loginLink, profileLink, registrationLink } from '../../constants/Links';
import { AuthenticatedUserDTO } from '@car-rental/shared/model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { TranslationService } from '@car-rental/shared/service';

interface AsideNavProperties {
    language: string;
    authenticatedUser: AuthenticatedUserDTO | undefined;
    logout: () => void;
    setLanguage: (language: string) => void;
}

export function AsideNav({ language, authenticatedUser, logout, setLanguage }: AsideNavProperties): JSX.Element {
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
                onClick={(event: React.MouseEvent) => {
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
            <ul className="navbar-nav pl-3 mr-auto lang-navbar-nav">
                <li className="lang-glob-icon">
                    <FontAwesomeIcon icon={faGlobe} />
                </li>
                <li
                    className={classNames('lang', { 'active-lang': language === 'en' })}
                    onClick={() => {
                        setLanguage('en');
                    }}
                >
                    en
                </li>
                <li>|</li>
                <li
                    className={classNames('lang', { 'active-lang ': language === 'pl' })}
                    onClick={() => {
                        setLanguage('pl');
                    }}
                >
                    pl
                </li>
            </ul>
            <ul className="navbar-nav pr-3 ml-auto">
                <li className="nav-item p-2">
                    {!!authenticatedUser && isAuthenticated
                        ? renderLink(TranslationService.translate('profile'), profileLink)
                        : renderLink(TranslationService.translate('logIn'), loginLink)}
                </li>
                <li className="nav-item p-2">
                    {!!authenticatedUser && isAuthenticated
                        ? renderLogout(TranslationService.translate('logOut'))
                        : renderLink(TranslationService.translate('signUp'), registrationLink)}
                </li>
            </ul>
        </nav>
    );
}
