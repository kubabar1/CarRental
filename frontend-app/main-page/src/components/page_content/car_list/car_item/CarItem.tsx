import React from 'react';
import { Link } from 'react-router-dom';
import './CarItem.scss';
import VehicleResponseDTO from '../../../../model/VehicleResponseDTO';
import { endpoints } from '../../../../constants/PathsAPI';
import { carImagesMainPageCarList } from '../../../../constants/PathsServer';
import StarRatingComponent from 'react-star-rating-component';
import { carDetailsByIdLink } from '../../../../constants/Links';

interface CarItemProperties {
    vehicle: VehicleResponseDTO;
}

interface CarItemState {
    stars: number | null;
}

export class CarItem extends React.Component<CarItemProperties, CarItemState> {
    constructor(props: CarItemProperties) {
        super(props);

        this.state = {
            stars: null,
        };
    }

    componentDidMount(): void {
        fetch(endpoints.starsCountEndpoint(this.props.vehicle.id))
            .then((response: Response) => {
                response.json().then((starsCount: { stars: number }) => {
                    this.setState({ stars: starsCount.stars });
                });
            })
            .finally(() => {
                this.setState({
                    stars: 3.45, // TODO: REMOVE
                });
            });
    }

    render(): JSX.Element {
        const vehicle: VehicleResponseDTO = this.props.vehicle;
        const vehicleImage: string = carImagesMainPageCarList(vehicle.vehicleParameters.photoName);
        const stars: number | null = this.state.stars;

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
                                                {stars && (
                                                    <StarRatingComponent
                                                        name="rate2"
                                                        editing={false}
                                                        starCount={5}
                                                        value={stars}
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
                                    <p>{vehicle.vehicleParameters.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}
