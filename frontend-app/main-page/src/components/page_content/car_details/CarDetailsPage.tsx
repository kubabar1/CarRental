import React from 'react';
import VehicleResponseDTO from '../../../model/VehicleResponseDTO';
import { endpoints } from '../../../constants/PathsAPI';
import { CarDetailsHeader } from './components/car_details_header/CarDetailsHeader';
import LocalisationResponseDTO from '../../../model/LocalisationResponseDTO';
import VehicleStatusResponseDTO from '../../../model/VehicleStatusResponseDTO';
import VehicleParametersResponseDTO from '../../../model/VehicleParametersResponseDTO';
import { CarStatus } from './components/car_status/CarStatus';
import VehicleStatCodeEnum from '../../../model/VehicleStatCodeEnum';
import { CarProperties } from './components/details_list/CarProperties';
import ReservationButton from './components/reservation_button/ReservationButton';
import { CommentList } from './components/comments/CommentList';
import { AddComment } from './components/comments/add_comment/AddComment';
import CommentResponseDTO from '../../../model/CommentResponseDTO';
import { RouteComponentProps, useParams, withRouter } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import Page from '../../../model/Page';

interface CarDetailsProperties extends RouteComponentProps<{ carId: string }> {
    isAuthenticated: boolean;
}

interface CarDetailsState {
    vehicle: VehicleResponseDTO | null;
    currentUserLogin: string | null;
    comments: CommentResponseDTO[] | null;
    commentsCurrentPage: number;
    loadCommentsCount: number;
}

function test() {
    console.log(useParams());
}

class CarDetailsPage extends React.Component<CarDetailsProperties, CarDetailsState> {
    constructor(props: CarDetailsProperties) {
        super(props);
        this.state = {
            vehicle: null,
            currentUserLogin: null,
            comments: null,
            commentsCurrentPage: 0,
            loadCommentsCount: 10,
        };
    }

    localisationResponseDTOMock = new LocalisationResponseDTO(
        1,
        'Poland',
        'warsaw',
        'ul. Wesola 21',
        'test@gmail.com',
        '123432123'
    );

    vehicleStatusResponseDTO = new VehicleStatusResponseDTO(VehicleStatCodeEnum.UAV, 'unavailable');

    vehicleParametersResponseDTO = new VehicleParametersResponseDTO(
        'sedan',
        2001,
        'LPG',
        124.12,
        'manual',
        false,
        4,
        5,
        'red',
        false,
        'ford_mustang_example.jpg',
        'Lorem ipsum, test, qwerty'
    );

    vehicleResponseDTOMock = new VehicleResponseDTO(
        1,
        '213324123',
        'Ford',
        'Mustang',
        151.22,
        this.localisationResponseDTOMock,
        this.vehicleStatusResponseDTO,
        this.vehicleParametersResponseDTO,
        false
    );

    comment = new CommentResponseDTO(1, 1, 'This is really good car', 'jan123', new Date(), 3.23);

    loadCommentsForPage = (carId: number, page: number = 0, perPageCount: number = 10) => {
        const commentsUrl: string = endpoints.commentsEndpoint(carId, page, perPageCount);
        fetch(commentsUrl)
            .then((response: Response) => response.json())
            .then((commentsPage: Page<CommentResponseDTO>) => {
                this.setState({
                    comments: commentsPage.content,
                });
            })
            .finally(() => {
                this.setState({ comments: [this.comment] }); // TODO: delete line
            });
    };

    loadComments = (carId: number) => {
        this.loadCommentsForPage(carId, 0);
    };

    loadMoreComments = (carId: number) => {
        const comments = this.state.comments;
        const currentCommentCount = comments ? comments.length : 0;
        const commentsToLoadCount = currentCommentCount + this.state.loadCommentsCount;
        this.loadCommentsForPage(carId, 0, commentsToLoadCount);
    };

    loadVehicleById = (vehicleId: number) => {
        const vehicleByIdUrl: string = endpoints.carByIdEndpoint(vehicleId);
        fetch(vehicleByIdUrl)
            .then((response: Response) => response.json())
            .then((vehicle: VehicleResponseDTO) => {
                this.setState({
                    vehicle: vehicle,
                });
            })
            .finally(() => {
                this.setState({ vehicle: this.vehicleResponseDTOMock }); // TODO: delete line
            });
    };

    componentDidMount() {
        const vehicleId: number = parseInt(this.props.match.params.carId);
        this.loadVehicleById(vehicleId);
        this.loadComments(vehicleId);
        // TODO: FETCH USER DATA
    }

    render() {
        const { isAuthenticated } = this.props;
        const { vehicle, currentUserLogin, comments } = this.state;
        return (
            <div>
                <div className="container col-md-8 offset-md-2 mt-4">
                    <div className="text-center">
                        {vehicle ? (
                            <div>
                                <CarDetailsHeader vehicle={vehicle} />
                                <hr className="mt-5" />
                                <CarStatus vehicle={vehicle} />
                                <hr className="mt-5" />
                                <CarProperties vehicle={vehicle} />
                                <hr className="my-3" />
                                {isAuthenticated && (
                                    <div>
                                        <ReservationButton vehicle={vehicle} />
                                        <hr className="my-3" />
                                    </div>
                                )}
                                <div className="text-left">
                                    <h3 className="mt-2 ml-3 mb-4">Comments</h3>
                                </div>
                                {isAuthenticated && (
                                    <AddComment
                                        loadComments={this.loadComments}
                                    />
                                )}
                                {comments && <CommentList comments={comments} />}
                                <button
                                    type="button"
                                    className="btn btn-primary my-5"
                                    onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                                        this.loadMoreComments(vehicle.id)
                                    }
                                >
                                    More comments
                                </button>
                            </div>
                        ) : (
                            <ClipLoader size={50} />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CarDetailsPage);
