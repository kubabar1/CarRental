import { Link } from 'react-router-dom';
import React from 'react';
import { homeLink } from '../../../constants/Links';
import './Copyright.scss';

export function Copyright(): JSX.Element {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <div id="footer-copyright" className="text-center">
            © {year} Copyright:{' '}
            <Link to={homeLink} className="linkstyle_white font-weight-bold">
                CarRental
            </Link>
        </div>
    );
}
