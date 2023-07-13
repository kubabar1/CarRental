import React from 'react';
import okIcon from '../../../images/ok-icon.png';
import notOkIcon from '../../../images/not-ok-icon.png';
import './ReservationStatusComponent.scss';
import { endpoints } from '../../../constants/PathsAPI';
import { TranslationService } from '@car-rental/shared/service';

export enum ReservationStatus {
    OK = 'ok',
    NOK = 'nok',
}

interface ReservationStatusComponentProps {
    reservationStatus: ReservationStatus;
}

export function ReservationStatusComponent(props: ReservationStatusComponentProps): JSX.Element {
    const isStatusOk: boolean = props.reservationStatus === ReservationStatus.OK;
    return (
        <div className="container my-5 full-body-reservation-confirm">
            <div className="col-md-4 offset-md-4 card-body shadow-lg">
                <div className="ok-icon-div">
                    <img className="mb-2 ok-icon" src={isStatusOk ? okIcon : notOkIcon} alt="" />
                </div>
                <h1 className="h3 mb-4 font-weight-normal text-center">
                    {isStatusOk
                        ? TranslationService.translate('reservationSuccessMessage')
                        : TranslationService.translate('reservationFailedMessage')}
                </h1>
                <p className="login-link pl-3">
                    <a href={endpoints.homeEndpoint} className="linkstyle">
                        {TranslationService.translate('homeLink')}
                    </a>
                </p>
            </div>
        </div>
    );
}
