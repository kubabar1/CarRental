import { Link } from 'react-router-dom';
import React from 'react';
import './PagesList.scss';
import { aboutUsLink, bestOffersLink, carListLink, contactLink, homeLink } from '../../../constants/Links';
import { TranslationService } from '@car-rental/shared/service';

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
                {renderLink(TranslationService.translate('home'), homeLink)}
                {renderLink(TranslationService.translate('carList'), carListLink)}
                {renderLink(TranslationService.translate('bestOffers'), bestOffersLink)}
                {renderLink(TranslationService.translate('aboutUs'), aboutUsLink)}
                {renderLink(TranslationService.translate('contact'), contactLink)}
            </ul>
        </div>
    );
}
