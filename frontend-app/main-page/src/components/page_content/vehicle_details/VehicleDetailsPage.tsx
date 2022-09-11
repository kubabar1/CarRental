import React, { useEffect, useState } from 'react';
import { VehicleResponseDTO } from '../../../model/VehicleResponseDTO';
import { VehicleDetailsHeader } from './components/vehicle_details_header/VehicleDetailsHeader';
import { VehicleStatus } from './components/vehicle_status/VehicleStatus';
import { VehiclerProperties } from './components/details_list/VehiclerProperties';
import ReservationButton from './components/reservation_button/ReservationButton';
import { CommentList } from './components/comments/CommentList';
// import { AddComment } from './components/comments/add_comment/AddComment';
import { CommentResponseDTO } from '../../../model/CommentResponseDTO';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { getVehicleComments } from '../../../service/RatingService';
import { getVehicleById } from '../../../service/VehicleService';
import Page from '../../../model/Page';

interface CarDetailsProperties extends RouteComponentProps<{ carId: string }> {
    isAuthenticated: boolean;
}

export function VehicleDetailsPage(props: CarDetailsProperties): JSX.Element {
    const DEFAULT_START_COMMENTS_PAGE = 0;
    const DEFAULT_COMMENTS_COUNT = 5;
    const vehicleId = props.match.params.carId;
    const [totalCommentsCount, setTotalCommentsCount] = useState<number>(0);
    const [vehicle, setVehicle] = useState<VehicleResponseDTO | undefined>(undefined);
    const [comments, setComments] = useState<CommentResponseDTO[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(DEFAULT_START_COMMENTS_PAGE);

    useEffect(() => {
        getVehicleById(vehicleId).then((vehicleResponseDTO: VehicleResponseDTO) => {
            setVehicle(vehicleResponseDTO);
        });
        getVehicleComments(vehicleId, DEFAULT_START_COMMENTS_PAGE, DEFAULT_COMMENTS_COUNT).then(
            (commentResponseDTOS: Page<CommentResponseDTO>) => {
                setComments(commentResponseDTOS.content);
                setTotalCommentsCount(commentResponseDTOS.totalElements);
            }
        );
    }, [vehicleId]);

    const loadMoreComments = (): void => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getVehicleComments(vehicleId, nextPage, DEFAULT_COMMENTS_COUNT).then(
            (commentResponseDTOS: Page<CommentResponseDTO>) => {
                setComments([...comments, ...commentResponseDTOS.content]);
                console.log(totalCommentsCount);
            }
        );
    };

    return (
        <div>
            <div className="container col-md-8 offset-md-2 mt-4">
                <div className="text-center">
                    {vehicle ? (
                        <div>
                            <VehicleDetailsHeader vehicle={vehicle} />
                            <hr className="mt-5" />
                            <VehicleStatus vehicle={vehicle} />
                            <hr className="mt-5" />
                            <VehiclerProperties vehicle={vehicle} />
                            <hr className="my-3" />
                            {props.isAuthenticated && (
                                <div>
                                    <ReservationButton vehicle={vehicle} />
                                    <hr className="my-3" />
                                </div>
                            )}
                            <div className="text-left">
                                <h3 className="mt-2 ml-3 mb-4">Comments</h3>
                            </div>
                            {/*{props.isAuthenticated && <AddComment setComments={setComments} />}*/}
                            {comments && <CommentList comments={comments} />}
                            {totalCommentsCount > 0 && comments.length < totalCommentsCount && (
                                <button
                                    type="button"
                                    className="btn btn-primary my-5"
                                    onClick={() => loadMoreComments()}
                                >
                                    More comments
                                </button>
                            )}
                        </div>
                    ) : (
                        <ClipLoader size={50} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default withRouter(VehicleDetailsPage);
