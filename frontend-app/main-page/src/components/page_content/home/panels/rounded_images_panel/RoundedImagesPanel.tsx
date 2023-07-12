import React from 'react';
import { Link } from 'react-router-dom';
import { carListLink } from '../../../../../constants/Links';
import './RoundedImagesPanel.scss';
import coupeCarRound from '../../../../../images/coupe_car_round.jpeg';
import sedanCarRound from '../../../../../images/sedan_car_round.jpeg';
import suvCarRound from '../../../../../images/suv_car_round.jpeg';
import hatchbackCarRound from '../../../../../images/hatchback_car_round.jpeg';
import { TranslationService } from '@car-rental/shared/service';

export function RoundedImagesPanel(): JSX.Element {
    const renderRoundedImage = (
        carCategoryName: string,
        image: string,
        link: string,
        imageAlt = 'Car image'
    ): JSX.Element => {
        return (
            <div className="car-item col-12 col-sm-6 col-md-4 col-lg-3">
                <Link to={link} className="link-style-black">
                    <img src={image} className="img-responsive" alt={imageAlt} />
                    <div className="text-under-round-image">
                        <h2>{carCategoryName}</h2>
                    </div>
                </Link>
            </div>
        );
    };

    return (
        <div id="car-types-round-images">
            <div className="container car-types-round-images-container">
                <div className="row">
                    {renderRoundedImage(
                        TranslationService.translate('coupe'),
                        coupeCarRound,
                        `${carListLink}?bodyType=Coupe`
                    )}
                    {renderRoundedImage(
                        TranslationService.translate('sedan'),
                        sedanCarRound,
                        `${carListLink}?bodyType=Sedan`
                    )}
                    {renderRoundedImage(
                        TranslationService.translate('suv'),
                        suvCarRound,
                        `${carListLink}?bodyType=SUV`
                    )}
                    {renderRoundedImage(
                        TranslationService.translate('hatchback'),
                        hatchbackCarRound,
                        `${carListLink}?bodyType=Hatchback`
                    )}
                </div>
            </div>
        </div>
    );
}
