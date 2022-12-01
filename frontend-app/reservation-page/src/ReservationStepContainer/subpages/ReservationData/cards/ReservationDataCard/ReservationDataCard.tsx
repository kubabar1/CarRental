import React from 'react';
import { CitySelection } from './components/CitySelection';
import { ReceptionDateHourInputs } from './components/ReceptionDateHourInputs';
import { ReturnDateHourInputs } from './components/ReturnDateHourInputs';
import './ReservationDataCard.scss';
import { Redirect } from 'react-router-dom';
import LocalisationResponseDTO from '../../../../../model/LocalisationResponseDTO';
import { carSelectSubpageLink } from '../../../../../constants/Links';
import { endpoints } from '../../../../../constants/PathsAPI';

interface ReservationDataCardProperties {
    selectedLocalisationId?: string;
    receptionDate?: Date;
    returnDate?: Date;
    receptionHour?: string;
    returnHour?: string;
    localisations: LocalisationResponseDTO[];
    setLocalisation: (localisationId: string) => void;
    setReceptionDate: (receptionDate: Date) => void;
    setReceptionHour: (receptionHour: string) => void;
    setReturnDate: (returnDate: Date) => void;
    setReturnHour: (returnHour: string) => void;
}

export function ReservationDataCard({
    localisations,
    selectedLocalisationId,
    returnDate,
    receptionDate,
    receptionHour,
    returnHour,
    setReceptionDate,
    setReceptionHour,
    setReturnDate,
    setReturnHour,
    setLocalisation,
}: ReservationDataCardProperties): JSX.Element {
    const [redirect, setRedirect] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);

    const onClickNext = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (validateReservationData()) {
            setRedirect(true);
        }
    };

    const validateReservationData = (): boolean => {
        if (!receptionDate || !receptionHour || !returnDate || !returnHour || !selectedLocalisationId) {
            setErrorMessage('All fields must be completed');
            return false;
        }

        if (returnDate.getTime() < receptionDate.getTime()) {
            setErrorMessage('Return date must be at least one day after reception date');
            return false;
        }
        setErrorMessage(undefined);
        return true;
    };

    if (redirect && !errorMessage) {
        return <Redirect to={carSelectSubpageLink} push />;
    }

    return (
        <div id="reservation-data-card" className="shadow card mt-2">
            <div className="card-header">
                <h1>Reservation data:</h1>
            </div>
            <div className="card-body">
                {localisations && (
                    <CitySelection
                        localisations={localisations}
                        selectedLocalisationId={selectedLocalisationId}
                        setLocalisation={setLocalisation}
                    />
                )}
                <ReceptionDateHourInputs
                    returnDate={returnDate}
                    receptionDate={receptionDate}
                    receptionHour={receptionHour}
                    setReceptionDate={setReceptionDate}
                    setReceptionHour={setReceptionHour}
                />
                <ReturnDateHourInputs
                    receptionDate={receptionDate}
                    returnDate={returnDate}
                    returnHour={returnHour}
                    setReturnDate={setReturnDate}
                    setReturnHour={setReturnHour}
                />
                {errorMessage && (
                    <div key="inputError" className="alert alert-danger my-4">
                        {errorMessage}
                    </div>
                )}
                <div className="row">
                    <a href={endpoints.homeEndpoint} className="home-link ml-5">
                        Home
                    </a>
                    <button className="btn btn-lg btn-primary btn-block  col-md-2 ml-auto mr-5" onClick={onClickNext}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
