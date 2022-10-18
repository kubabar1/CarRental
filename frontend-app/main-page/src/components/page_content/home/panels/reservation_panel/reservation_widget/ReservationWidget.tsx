import React from 'react';
import { CitySelection } from './components/CitySelection';
import { ReceptionDateHour } from './components/ReceptionDateHour';
import { ReturnDateHour } from './components/ReturnDateHour';
import LocalisationResponseDTO from '../../../../../../model/LocalisationResponseDTO';
import './ReservationWidget.scss';

interface ReservationWidgetProperties {
    isAuthenticated: boolean;
    localisations: LocalisationResponseDTO[] | null;
}

interface ReservationWidgetState {
    selectedCityId: number | null;
    receptionDate: Date | null;
    receptionHour: number | null;
    returnDate: Date | null;
    returnHour: number | null;
    minReturnDate: Date | null;
    maxReceptionDate: Date | null;
    authError: boolean;
}

export class ReservationWidget extends React.Component<ReservationWidgetProperties, ReservationWidgetState> {
    constructor(props: ReservationWidgetProperties) {
        super(props);
        this.state = {
            selectedCityId: null,
            receptionDate: null,
            receptionHour: null,
            returnDate: null,
            returnHour: null,
            minReturnDate: null,
            maxReceptionDate: null,
            authError: false,
        };
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const isAuthenticated = this.props.isAuthenticated;
        if (!isAuthenticated) {
            this.setState({
                authError: true,
            });
        } else {
            this.setState({
                authError: false,
            });
        }
    };

    setLocalisation = (localisationId: number): void => {
        this.setState({
            selectedCityId: localisationId,
        });
    };

    setReceptionDate = (receptionDate: Date): void => {
        this.setState({
            receptionDate: receptionDate,
        });
    };

    setReceptionHour = (receptionHour: number): void => {
        this.setState({
            receptionHour: receptionHour,
        });
    };

    setReturnDate = (returnDate: Date): void => {
        this.setState({
            returnDate: returnDate,
        });
    };

    setReturnHour = (returnHour: number): void => {
        this.setState({
            returnHour: returnHour,
        });
    };

    private renderAuthError(): JSX.Element {
        return this.state.authError ? (
            <div className="alert alert-danger" key="auth_error">
                You must be authenticated to reserve cars.
            </div>
        ) : (
            <div />
        );
    }

    render(): JSX.Element {
        const { localisations } = this.props;

        return (
            <div>
                <div
                    id="car-rent-form-container"
                    className="container col-xl-3 col-lg-4 col-md-5 col-sm-7 card card-body shadow mr-3"
                >
                    <form onSubmit={this.handleSubmit}>
                        <h3>Reserve car</h3>
                        <CitySelection localisations={localisations} setLocalisation={this.setLocalisation} />
                        <ReceptionDateHour
                            setReceptionDate={this.setReceptionDate}
                            setReceptionHour={this.setReceptionHour}
                            returnDate={this.state.returnDate}
                        />
                        <ReturnDateHour
                            setReturnDate={this.setReturnDate}
                            setReturnHour={this.setReturnHour}
                            receptionDate={this.state.receptionDate}
                        />
                        {this.renderAuthError()}
                        <input type="submit" value="Reserve" className="btn btn-primary reserve-widget-submit-button" />
                    </form>
                </div>
            </div>
        );
    }
}
