import React from 'react';
import LocalisationResponseDTO from '../../../../../model/LocalisationResponseDTO';
import './ReservationWidget.scss';
import { CitySelection } from './components/CitySelection';
import { ReceptionDateHour } from './components/ReceptionDateHour';
import { ReturnDateHour } from './components/ReturnDateHour';
import { RouteComponentProps } from 'react-router';

interface ReservationWidgetProperties extends RouteComponentProps {
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

    handleSubmit = (e: any) => {
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
            // this.props.history.push({
            //     pathname: ,
            //     state: {
            //         selectedCity: this.state.selectedCity,
            //         receptionDate: this.state.receptionDate,
            //         receptionHour: this.state.receptionHour,
            //         returnDate: this.state.returnDate,
            //         returnHour: this.state.returnHour,
            //     },
            // });
        }
    };

    setLocalisation = (localisationId: number) => {
        this.setState({
            selectedCityId: localisationId,
        });
    };

    setReceptionDate = (receptionDate: Date) => {
        this.setState({
            receptionDate: receptionDate,
        });
    };

    setReceptionHour = (receptionHour: number) => {
        this.setState({
            receptionHour: receptionHour,
        });
    };

    setReturnDate = (returnDate: Date) => {
        this.setState({
            returnDate: returnDate,
        });
    };

    setReturnHour = (returnHour: number) => {
        this.setState({
            returnHour: returnHour,
        });
    };

    private renderAuthError() {
        return this.state.authError
            ? [
                  <div className="alert alert-danger" key="auth_error">
                      You must be authenticated to reserve cars.
                  </div>,
              ]
            : '';
    }

    render() {
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
                        <input type="submit" value="Reserve" className="btn btn-primary" />
                    </form>
                </div>
            </div>
        );
    }
}
