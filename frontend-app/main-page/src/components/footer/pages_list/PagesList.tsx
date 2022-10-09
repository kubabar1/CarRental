import { Link } from 'react-router-dom';
import React from 'react';
import './PagesList.scss';
import { aboutUsLink, bestOffersLink, carListLink, contactLink, homeLink } from '../../../constants/Links';

export function PagesList(): JSX.Element {
    const renderLink = (name: string, target: string): JSX.Element => {
        return (
            <li>
                <Link to={target} className="link-style-black">
                    {name}
                </Link>
            </li>
        );
    };

    return (
        <div id="pages-list" className="col-lg-4 col-md-12">
            <ul>
                {renderLink('Home', homeLink)}
                {renderLink('Car list', carListLink)}
                {renderLink('Best offers', bestOffersLink)}
                {renderLink('About us', aboutUsLink)}
                {renderLink('Contact', contactLink)}
            </ul>
        </div>
    );
}
