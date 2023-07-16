import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { confirmationSubpageLink, reservationDataSubpageLink } from '../../../constants/Links';
import './ReservationCarSelect.scss';
import { Auto, Control, FieldValues, PathString, SubmitHandler, useWatch } from 'react-hook-form';
import { VehicleResponseDTO } from '@car-rental/shared/model';
import { VehicleSelect } from './components/vehicle_select/VehicleSelect';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';
import { FieldError } from 'react-hook-form/dist/types';
import { VehicleModal } from './components/vehicle_modal/VehicleModal';
import { ReactHookFormStorage } from '../../../utils/StorageUtil';
import { TranslationService } from '@car-rental/shared/service';

interface ReservationCarSelectProperties<FieldValuesType extends FieldValues> {
    control: Control<FieldValuesType>;
    vehicleSelectName: Auto.FieldPath<FieldValuesType, PathString>;
    vehicles: VehicleResponseDTO[];
    onClickNext: UseFormHandleSubmit<FieldValuesType>;
    vehiclesError: FieldError | undefined;
    reservationStorage: ReactHookFormStorage<FieldValuesType>;
}

export function ReservationCarSelect<FieldValuesType extends FieldValues>({
    control,
    vehicleSelectName,
    vehicles,
    onClickNext,
    reservationStorage,
    vehiclesError,
}: ReservationCarSelectProperties<FieldValuesType>): JSX.Element {
    const [modalVehicleDetailsId, setModalVehicleDetailsId] = React.useState<string | undefined>(undefined);
    const history = useHistory();
    const selectedVehicleId = useWatch({ name: vehicleSelectName, control: control });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickNext: SubmitHandler<FieldValuesType> = (): any | Promise<any> => {
        history.push(confirmationSubpageLink);
    };

    const selectedVehicleModalDetails: VehicleResponseDTO | undefined = vehicles.find(
        (vehicle: VehicleResponseDTO) => vehicle.id === modalVehicleDetailsId
    );

    const selectedVehicle: VehicleResponseDTO | undefined = selectedVehicleId
        ? vehicles.find((vehicle: VehicleResponseDTO) => vehicle.id == selectedVehicleId)
        : undefined;

    return (
        <main>
            <div className="select-vehicle-container container col-md-8 offset-md-2 my-5 ">
                <form onSubmit={onClickNext(handleClickNext)}>
                    <div className="shadow card">
                        <div className="card-header text-center">
                            <h2>{TranslationService.translate('reservationCarSelectHeader')}</h2>
                        </div>
                        <div className="car-item-container card-body">
                            {vehicles && (
                                <VehicleSelect
                                    name={vehicleSelectName}
                                    control={control}
                                    vehicles={vehicles}
                                    setModalVehicleDetailsId={setModalVehicleDetailsId}
                                    reservationStorage={reservationStorage}
                                />
                            )}
                        </div>
                        <div className="shadow card mt-3">
                            <div className="card-body">
                                <h4 className="ml-4 mt-3">
                                    <div>
                                        {TranslationService.translate('selectedVehicleReservationCarSelectLabel')}
                                        <strong>
                                            {selectedVehicle && selectedVehicle.brand + ' ' + selectedVehicle.model}
                                        </strong>
                                    </div>
                                    <div className="mt-3">
                                        {TranslationService.translate('priceReservationCarSelectLabel')}
                                        <strong>{selectedVehicle && `${selectedVehicle.dailyFee} $`}</strong>
                                    </div>
                                </h4>
                                {vehiclesError && (
                                    <div key="input_Error" className="alert alert-danger my-4">
                                        {TranslationService.translate('carSelectReservationCarSelectLabelError')}
                                    </div>
                                )}
                                <div className="row mb-3 mt-5">
                                    <Link
                                        to={reservationDataSubpageLink}
                                        className="linkstyle btn btn-lg btn-secondary btn-block col-md-3 ml-5"
                                    >
                                        {TranslationService.translate('carSelectReservationCarSelectBackButton')}
                                    </Link>
                                    <input
                                        type="submit"
                                        value={TranslationService.translate('carSelectReservationCarSelectNextButton')}
                                        className="next-button btn btn-lg btn-primary btn-block  col-md-3 ml-auto mr-5 mt-0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {selectedVehicleModalDetails && (
                <VehicleModal
                    isOpen={!!selectedVehicleModalDetails}
                    closeModal={() => setModalVehicleDetailsId(undefined)}
                    selectedVehicleModalDetails={selectedVehicleModalDetails}
                />
            )}
        </main>
    );
}
