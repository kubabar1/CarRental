import React from 'react';
import './AboutCarRental.scss';
import shelby from '../../../../../images/shelby_gt500.jpg';
import { TranslationService } from '@car-rental/shared/service';

export function AboutCarRental(): JSX.Element {
    return (
        <div id="about-car-rental" className="container">
            <h1 className="mt-4">{TranslationService.translate('aboutUsHeader')}</h1>
            <div className="row mb-5">
                <div className="mt-4 col-md-6 car-image-container">
                    <img src={shelby} alt={'CarImage'} />
                </div>
                <div className="mt-4 col-md-6">
                    <p>{TranslationService.translate('aboutUsDescription2')}</p>
                </div>
            </div>
        </div>
    );
}
