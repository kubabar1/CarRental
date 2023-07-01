import React from 'react';
import { Link } from 'react-router-dom';
import './VehicleItem.scss';
import { VehicleResponseDTO } from '@car-rental/shared/model';
import { carImagesMainPageCarList } from '../../../../constants/PathsServer';
import StarRatingComponent from 'react-star-rating-component';
import { carDetailsByIdLink } from '../../../../constants/Links';

interface CarItemProperties {
    vehicle: VehicleResponseDTO;
}

export function VehicleItem({ vehicle }: CarItemProperties): JSX.Element {
    const vehicleImage: string = carImagesMainPageCarList(vehicle.vehicleDetails.imageName);

    return (
        <Link to={carDetailsByIdLink(vehicle.id)} style={{ textDecoration: 'none' }}>
            <div className="item">
                <div className="container-car-search card card-body shadow-sm my-4">
                    <div className="row">
                        <div
                            className="car-img-container col-md-3 home-card-view flex-center"
                            style={{
                                backgroundImage: `url(${vehicleImage})`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                            }}
                        />
                        <div className="car-info-container col-md-8">
                            <div className="car-main-info-container ">
                                <div className="row col">
                                    <div className="first-tile ml-2">
                                        <div className="car-name">
                                            <h3>
                                                {vehicle.brand} {vehicle.model}
                                            </h3>
                                        </div>
                                        <div className="car-rank text-left">
                                            {vehicle.averageRate && (
                                                <StarRatingComponent
                                                    name="rate2"
                                                    editing={false}
                                                    starCount={5}
                                                    value={vehicle.averageRate}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="second-tile ml-auto">
                                        <div className="car-price">
                                            <h3 className="ml-auto">${vehicle.dailyFee}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="car-description text-left">
                                <p>{vehicle.vehicleDetails.description}</p>
                            </div>
                        </div>
                    </div>
                    {vehicle.bestOffer && (
                        <div className="alert alert-danger special-offer-vehicle-item" role="alert">
                            BEST OFFER
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
