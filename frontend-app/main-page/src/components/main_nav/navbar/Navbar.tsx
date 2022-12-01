import React from 'react';
import './Navbar.scss';
import { NavbarLink } from './navbar_link/NavbarLink';
import { aboutUsLink, bestOffersLink, carListLink, contactLink, homeLink } from '../../../constants/Links';

interface NavbarProps {
    active: boolean;
    setTrue: () => void;
}

export function Navbar({ active, setTrue }: NavbarProps): JSX.Element {
    return (
        <div id="collapsible-navbar" className={active ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'}>
            <ul className="navbar-nav pr-3 ml-auto">
                <NavbarLink setTrue={setTrue} target={homeLink} name={'Home'} />
                <NavbarLink setTrue={setTrue} target={carListLink} name={'Car list'} />
                <NavbarLink setTrue={setTrue} target={bestOffersLink} name={'Best offers'} />
                <NavbarLink setTrue={setTrue} target={aboutUsLink} name={'About us'} />
                <NavbarLink setTrue={setTrue} target={contactLink} name={'Contact'} />
            </ul>
        </div>
    );
}
