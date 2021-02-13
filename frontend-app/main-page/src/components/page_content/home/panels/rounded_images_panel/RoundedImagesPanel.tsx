import React from 'react';
import { Link } from 'react-router-dom';
import { carListLink } from '../../../../../constants/Links';
import './RoundedImagesPanel.scss';
import sportCarRound from '../../../../../images/sport_car_round.jpeg';
import sedanCarRound from '../../../../../images/sedan_car_round.jpeg';
import suvCarRound from '../../../../../images/suv_car_round.jpeg';
import cabrioletCarRound from '../../../../../images/cabrio_car_round.jpeg';

export class RoundedImagesPanel extends React.Component {
    renderRoundedImage = (carCategoryName: string, image: string, imageAlt = 'Car image'): JSX.Element => {
        return (
            <div className="car-item col-sm-6 col-md-3">
                <Link to={carListLink} className="linkstyle_black">
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
                        {this.renderRoundedImage('Sportowe', sportCarRound)}
                        {this.renderRoundedImage('Sedan', sedanCarRound)}
                        {this.renderRoundedImage('SUV', suvCarRound)}
                        {this.renderRoundedImage('Kabriolet', cabrioletCarRound)}
                    </div>
                </div>
            </div>
        );
    }
}