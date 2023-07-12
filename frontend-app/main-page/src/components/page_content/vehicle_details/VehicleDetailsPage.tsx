import React, { useEffect, useState } from 'react';
import { VehicleResponseDTO } from '@car-rental/shared/model';
import { VehicleDetailsHeader } from './components/vehicle_details_header/VehicleDetailsHeader';
import { VehicleStatus } from './components/vehicle_status/VehicleStatus';
import { VehicleProperties } from './components/details_list/VehicleProperties';
import ReservationButton from './components/reservation_button/ReservationButton';
import { CommentList } from './components/comments/CommentList';
import { AddComment } from './components/comments/add_comment/AddComment';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { RatingService, TranslationService, VehicleService } from '@car-rental/shared/service';
import './VehicleDetailsPage.scss';
import { VehicleEquipment } from './components/vehicle_equipment/VehicleEquipment';
import { CommentWithRateResponseDTO, AuthenticatedUserDTO, Page } from '@car-rental/shared/model';

interface CarDetailsProperties extends RouteComponentProps<{ carId: string }> {
    authenticatedUser: AuthenticatedUserDTO | undefined;
}

export function VehicleDetailsPage({ authenticatedUser, match }: CarDetailsProperties): JSX.Element {
    const DEFAULT_START_COMMENTS_PAGE = 0;
    const DEFAULT_COMMENTS_COUNT = 5;
    const vehicleId = match.params.carId;
    const [totalCommentsCount, setTotalCommentsCount] = useState<number>(0);
    const [vehicle, setVehicle] = useState<VehicleResponseDTO | undefined>(undefined);
    const [comments, setComments] = useState<CommentWithRateResponseDTO[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(DEFAULT_START_COMMENTS_PAGE);

    useEffect(() => {
        VehicleService.getVehicleById(vehicleId).then((vehicleResponseDTO: VehicleResponseDTO) => {
            setVehicle(vehicleResponseDTO);
        });
        RatingService.getVehicleComments(vehicleId, DEFAULT_START_COMMENTS_PAGE, DEFAULT_COMMENTS_COUNT).then(
            (commentResponseDTOS: Page<CommentWithRateResponseDTO>) => {
                setComments(commentResponseDTOS.content);
                setTotalCommentsCount(commentResponseDTOS.totalElements);
            }
        );
    }, [vehicleId]);

    const loadMoreComments = (): void => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        RatingService.getVehicleComments(vehicleId, nextPage, DEFAULT_COMMENTS_COUNT).then(
            (commentResponseDTOS: Page<CommentWithRateResponseDTO>) => {
                setComments([...comments, ...commentResponseDTOS.content]);
                console.log(totalCommentsCount);
            }
        );
    };

    const isAuthenticated = !!authenticatedUser && authenticatedUser.authenticated;

    return (
        <div className="vehicle-details-page">
            <div className="container col-md-8 offset-md-2 mt-4">
                <div className="text-center">
                    {vehicle ? (
                        <div>
                            <VehicleDetailsHeader vehicle={vehicle} />
                            <hr className="mt-5" />
                            <VehicleStatus vehicle={vehicle} />
                            <hr className="mt-5" />
                            <VehicleProperties vehicle={vehicle} />
                            <hr className="mt-5" />
                            <VehicleEquipment equipments={vehicle.equipments} />
                            <hr className="my-3" />
                            {isAuthenticated && (
                                <div>
                                    <ReservationButton vehicle={vehicle} />
                                    <hr className="my-3" />
                                </div>
                            )}
                            <div className="text-left">
                                <h3 className="mt-2 ml-3 mb-4">{TranslationService.translate('commentsHeader')}</h3>
                            </div>
                            {isAuthenticated && (
                                <AddComment
                                    setComments={setComments}
                                    authenticatedUser={authenticatedUser}
                                    vehicleId={vehicleId}
                                    comments={comments}
                                />
                            )}
                            {comments && <CommentList comments={comments} />}
                            {totalCommentsCount > 0 && comments.length < totalCommentsCount && (
                                <button
                                    type="button"
                                    className="btn btn-primary my-5 load-more-comments"
                                    onClick={() => loadMoreComments()}
                                >
                                    {TranslationService.translate('moreComments')}
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
