import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './VehicleItem.scss';
import { VehicleResponseDTO } from '../../../../model/VehicleResponseDTO';
import { carImagesMainPageCarList } from '../../../../constants/PathsServer';
import StarRatingComponent from 'react-star-rating-component';
import { carDetailsByIdLink } from '../../../../constants/Links';

interface CarItemProperties {
    vehicle: VehicleResponseDTO;
}

export function VehicleItem(props: CarItemProperties): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [averageRate, setAverageRate] = useState<number | undefined>(undefined);

    useEffect(() => {
        // getVehicleRate(props.vehicle.id).then((averageRateResponseDTOS: AverageRateResponseDTO) => {
        //     setAverageRate(averageRateResponseDTOS.averageRate);
        // });
    }, [props.vehicle.id]);

    const vehicleImage: string = carImagesMainPageCarList(props.vehicle.vehicleDetails.photoName);

    return (
        <Link to={carDetailsByIdLink(props.vehicle.id)} style={{ textDecoration: 'none' }}>
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
                                                {props.vehicle.brand} {props.vehicle.model}
                                            </h3>
                                        </div>
                                        <div className="car-rank text-left">
                                            {averageRate && (
                                                <StarRatingComponent
                                                    name="rate2"
                                                    editing={false}
                                                    starCount={5}
                                                    value={averageRate}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="second-tile ml-auto">
                                        <div className="car-price">
                                            <h3 className="ml-auto">${props.vehicle.dailyFee}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="car-description text-left">
                                <p>{props.vehicle.vehicleDetails.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
