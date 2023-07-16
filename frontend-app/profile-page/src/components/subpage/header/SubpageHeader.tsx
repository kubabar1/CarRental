import React from 'react';
import './SubpageHeader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { TranslationService } from '@car-rental/shared/service';

interface SubpageHeaderProperties {
    title: string;
}

export function SubpageHeader({ title }: SubpageHeaderProperties): JSX.Element {
    const [language, setLanguage] = React.useState<string>(TranslationService.getLanguageCookie());

    return (
        <div className="subpage-header card">
            <div className="card-header">
                <strong>{title}</strong>
                <div className="navbar-nav lang-navbar-nav">
                    <li className="lang-glob-icon">
                        <FontAwesomeIcon icon={faGlobe} />
                    </li>
                    <li
                        className={classNames('lang', { 'active-lang': language === 'en' })}
                        onClick={() => {
                            setLanguage('en');
                            TranslationService.changeLanguage('en');
                            location.reload();
                        }}
                    >
                        en
                    </li>
                    <li>|</li>
                    <li
                        className={classNames('lang', { 'active-lang ': language === 'pl' })}
                        onClick={() => {
                            setLanguage('pl');
                            TranslationService.changeLanguage('pl');
                            location.reload();
                        }}
                    >
                        pl
                    </li>
                </div>
            </div>
        </div>
    );
}
