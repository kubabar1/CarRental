import React from 'react';
import { Link } from 'react-router-dom';
import { carListLink } from '../../../../../constants/Links';
import './RoundedImagesPanel.scss';

const sportCarRound = require('../../../../../images/sport_car_round.jpeg');
const sedanCarRound = require('../../../../../images/sedan_car_round.jpeg');
const suvCarRound = require('../../../../../images/suv_car_round.jpeg');
const cabrioletCarRound = require('../../../../../images/cabrio_car_round.jpeg');

export class RoundedImagesPanel extends React.Component {
    renderRoundedImage = (carCategoryName: string, image: any, imageAlt: string = 'Car image') => {
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

    render() {
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
