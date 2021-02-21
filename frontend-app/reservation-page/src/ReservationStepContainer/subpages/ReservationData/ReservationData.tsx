import React from 'react';
import LocalisationResponseDTO from '../../../model/LocalisationResponseDTO';
import { PersonalDataCard } from './cards/PersonalDataCard/PersonalDataCard';
import UserDataResponseDTO from '../../../model/UserDataResponseDTO';
import { ReservationDataCard } from './cards/ReservationDataCard/ReservationDataCard';

interface ReservationDataProperties {
    localisations?: LocalisationResponseDTO[];
    userData?: UserDataResponseDTO;
    selectedLocalisationId?: string;
    selectedReceptionDate?: Date;
    selectedReceptionHour?: string;
    selectedReturnDate?: Date;
    selectedReturnHour?: string;
    setLocalisation: (localisationId: string) => void;
    setReceptionDate: (receptionDate: Date) => void;
    setReceptionHour: (receptionHour: string) => void;
    setReturnDate: (returnDate: Date) => void;
    setReturnHour: (returnHour: string) => void;
    setStep: (step: number) => void;
}

export class ReservationData extends React.Component<ReservationDataProperties> {
    constructor(props: ReservationDataProperties) {
        super(props);
    }

    componentDidMount(): void {
        this.props.setStep(1);
    }

    render(): JSX.Element {
        const {
            selectedLocalisationId,
            selectedReceptionDate,
            selectedReturnDate,
            localisations,
            userData,
            setLocalisation,
            setReceptionDate,
            setReceptionHour,
            setReturnDate,
            setReturnHour,
            selectedReceptionHour,
            selectedReturnHour,
        } = this.props;

        return (
            <main>
                <div id="reservation-data-container" className="container col-md-6 offset-md-3 my-5 ">
                    <form>
                        {userData && <PersonalDataCard userData={userData} />}
                        {localisations && (
                            <ReservationDataCard
                                selectedLocalisationId={selectedLocalisationId}
                                receptionDate={selectedReceptionDate}
                                returnDate={selectedReturnDate}
                                receptionHour={selectedReceptionHour}
                                returnHour={selectedReturnHour}
                                localisations={localisations}
                                setLocalisation={setLocalisation}
                                setReceptionDate={setReceptionDate}
                                setReceptionHour={setReceptionHour}
                                setReturnDate={setReturnDate}
                                setReturnHour={setReturnHour}
                            />
                        )}
                    </form>
                </div>
            </main>
        );
    }
}
