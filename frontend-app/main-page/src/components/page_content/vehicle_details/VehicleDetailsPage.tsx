import React, { useEffect, useState } from 'react';
import { VehicleResponseDTO } from '../../../model/VehicleResponseDTO';
import { VehicleDetailsHeader } from './components/vehicle_details_header/VehicleDetailsHeader';
import { VehicleStatus } from './components/vehicle_status/VehicleStatus';
import { VehiclerProperties } from './components/details_list/VehiclerProperties';
import ReservationButton from './components/reservation_button/ReservationButton';
import { CommentList } from './components/comments/CommentList';
import { AddComment } from './components/comments/add_comment/AddComment';
import { CommentResponseDTO } from '../../../model/CommentResponseDTO';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { getVehicleComments } from '../../../service/RatingService';
import { getVehicleById } from '../../../service/VehicleService';

interface CarDetailsProperties extends RouteComponentProps<{ carId: string }> {
    isAuthenticated: boolean;
}

export function VehicleDetailsPage(props: CarDetailsProperties): JSX.Element {
    const vehicleId = props.match.params.carId;
    const [vehicle, setVehicle] = useState<VehicleResponseDTO | undefined>(undefined);
    const [comments, setComments] = useState<CommentResponseDTO[]>([]);

    useEffect(() => {
        getVehicleById(vehicleId).then((vehicleResponseDTO: VehicleResponseDTO) => {
            setVehicle(vehicleResponseDTO);
        });
        getVehicleComments(vehicleId).then((commentResponseDTOS: CommentResponseDTO[]) => {
            setComments(commentResponseDTOS);
        });
    }, [vehicleId]);

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
                            {props.isAuthenticated && <AddComment setComments={setComments} />}
                            {comments && <CommentList comments={comments} />}
                            {/*<button*/}
                            {/*    type="button"*/}
                            {/*    className="btn btn-primary my-5"*/}
                            {/*    onClick={() => this.loadMoreComments(vehicle.id)}*/}
                            {/*>*/}
                            {/*    More comments*/}
                            {/*</button>*/}
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
