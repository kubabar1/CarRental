import React from 'react';
import { Link } from 'react-router-dom';
import './MainNav.scss';
import { homeLink } from '../../constants/Links';
import { Navbar } from './navbar/Navbar';
import carLogo from '../../images/car_logo.png';

export function MainNav(): JSX.Element {
    const [active, setActive] = React.useState<boolean>(false);

    const toggleClass = (): void => {
        setActive(!active);
    };

    return (
        <nav id="main-nav" className="navbar navbar-expand-lg navbar-light sticky-top">
            <Link to={homeLink} className="navbar-brand pl-5 linkstyle">
                <img id="main-nav-logo-img" src={carLogo} alt="Logo" />
            </Link>
            <button className="navbar-toggler" type="button" onClick={toggleClass}>
                <span className="navbar-toggler-icon" />
            </button>
            <Navbar active={active} setTrue={() => setActive(true)} />
        </nav>
    );
}
