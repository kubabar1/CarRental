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

interface ReservationDataCardState {
    errorMessage?: string;
    redirect: boolean;
}

export class ReservationDataCard extends React.Component<ReservationDataCardProperties, ReservationDataCardState> {
    constructor(props: ReservationDataCardProperties) {
        super(props);
        this.state = {
            redirect: false,
        };
    }

    private onClickNext = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (this.validateReservationData()) {
            console.log('test');
            this.setState({
                redirect: true,
            });
        }
    };

    private validateReservationData = (): boolean => {
        const { receptionDate, receptionHour, returnDate, returnHour, selectedLocalisationId } = this.props;

        if (!receptionDate || !receptionHour || !returnDate || !returnHour || !selectedLocalisationId) {
            console.log('test1');
            this.setState({ errorMessage: 'All fields must be completed' });
            return false;
        }

        if (returnDate.getTime() < receptionDate.getTime()) {
            console.log('test2');
            this.setState({ errorMessage: 'Return date must be at least one day after reception date' });
            return false;
        }
        this.setState({ errorMessage: undefined });

        return true;
    };

    render(): JSX.Element {
        const {
            localisations,
            selectedLocalisationId,
            returnDate,
            receptionDate,
            receptionHour,
            returnHour,
        } = this.props;
        const { errorMessage, redirect } = this.state;

        console.log(errorMessage);

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
                            setLocalisation={this.props.setLocalisation}
                        />
                    )}
                    <ReceptionDateHourInputs
                        returnDate={returnDate}
                        receptionDate={receptionDate}
                        receptionHour={receptionHour}
                        setReceptionDate={this.props.setReceptionDate}
                        setReceptionHour={this.props.setReceptionHour}
                    />
                    <ReturnDateHourInputs
                        receptionDate={receptionDate}
                        returnDate={returnDate}
                        returnHour={returnHour}
                        setReturnDate={this.props.setReturnDate}
                        setReturnHour={this.props.setReturnHour}
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
                        <button
                            className="btn btn-lg btn-primary btn-block  col-md-2 ml-auto mr-5"
                            onClick={this.onClickNext}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}