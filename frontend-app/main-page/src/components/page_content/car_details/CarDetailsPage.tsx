import React from 'react';
import VehicleResponseDTO from '../../../model/VehicleResponseDTO';
import { endpoints } from '../../../constants/PathsAPI';
import { CarDetailsHeader } from './components/car_details_header/CarDetailsHeader';
import { CarStatus } from './components/car_status/CarStatus';
import { CarProperties } from './components/details_list/CarProperties';
import ReservationButton from './components/reservation_button/ReservationButton';
import { CommentList } from './components/comments/CommentList';
import { AddComment } from './components/comments/add_comment/AddComment';
import CommentResponseDTO from '../../../model/CommentResponseDTO';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import Page from '../../../model/Page';
import { commentMock, vehicleResponseDTOMock } from '../../../constants/MockData';

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

    loadCommentsForPage = (carId: number, page = 0, perPageCount = 10) => {
        const commentsUrl: string = endpoints.commentsEndpoint(carId, page, perPageCount);
        fetch(commentsUrl)
            .then((response: Response) => response.json())
            .then((commentsPage: Page<CommentResponseDTO>) => {
                this.setState({
                    comments: commentsPage.content,
                });
            })
            .finally(() => {
                this.setState({ comments: [commentMock] }); // TODO: delete line
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
                this.setState({ vehicle: vehicleResponseDTOMock }); // TODO: delete line
            });
    };

    componentDidMount(): void {
        const vehicleId: number = parseInt(this.props.match.params.carId);
        this.loadVehicleById(vehicleId);
        this.loadComments(vehicleId);
        // TODO: FETCH USER DATA
    }

    render(): JSX.Element {
        const { isAuthenticated } = this.props;
        const { vehicle, comments } = this.state;
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
                                {isAuthenticated && <AddComment loadComments={this.loadComments} />}
                                {comments && <CommentList comments={comments} />}
                                <button
                                    type="button"
                                    className="btn btn-primary my-5"
                                    onClick={() => this.loadMoreComments(vehicle.id)}
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
