import React from 'react';
import { Link } from 'react-router-dom';
import { carListLink } from '../../../../../constants/Links';
import './RoundedImagesPanel.scss';
import coupeCarRound from '../../../../../images/coupe_car_round.jpeg';
import sedanCarRound from '../../../../../images/sedan_car_round.jpeg';
import suvCarRound from '../../../../../images/suv_car_round.jpeg';
import hatchbackCarRound from '../../../../../images/hatchback_car_round.jpeg';

export class RoundedImagesPanel extends React.Component {
    renderRoundedImage = (
        carCategoryName: string,
        image: string,
        link: string,
        imageAlt = 'Car image'
    ): JSX.Element => {
        return (
            <div className="car-item col-sm-6 col-md-3">
                <Link to={link} className="linkstyle_black">
                    <img src={image} className="img-responsive" alt={imageAlt} />
                    <div className="text-under-round-image">
                        <h2>{carCategoryName}</h2>
                    </div>
                </Link>
            </div>
        );
    };

    render(): JSX.Element {
        return (
            <div id="car-types-round-images">
                <div className="container mt-5 mb-4">
                    <div className="row">
                        {this.renderRoundedImage('Coupe', coupeCarRound, `${carListLink}?bodyType=Coupe`)}
                        {this.renderRoundedImage('Sedan', sedanCarRound, `${carListLink}?bodyType=Sedan`)}
                        {this.renderRoundedImage('SUV', suvCarRound, `${carListLink}?bodyType=SUV`)}
                        {this.renderRoundedImage('Hatchback', hatchbackCarRound, `${carListLink}?bodyType=Hatchback`)}
                    </div>
                </div>
            </div>
        );
    }
}
