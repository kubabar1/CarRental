import React, { useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { carSelectSubpageLink, confirmationSubpageLink, reservationDataSubpageLink } from '../../../constants/Links';
import './ReservationCarSelect.scss';
import { Control, FieldPath, FieldValues, SubmitHandler, useWatch } from 'react-hook-form';
import { VehicleResponseDTO } from '../../../model/VehicleResponseDTO';
import { VehicleSelect } from './components/vehicle_select/VehicleSelect';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';
import { FieldError, Merge } from 'react-hook-form/dist/types';
import { VehicleModal } from './components/vehicle_modal/VehicleModal';
import { ReactHookFormStorage } from '../../../utils/StorageUtil';

interface ReservationCarSelectProperties<FieldValuesType extends FieldValues> {
    control: Control<FieldValuesType>;
    vehicleSelectName: FieldPath<FieldValuesType>;
    vehicles: VehicleResponseDTO[];
    onClickNext: UseFormHandleSubmit<FieldValuesType>;
    vehiclesError: Merge<FieldError, (FieldError | undefined)[]> | undefined;
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
                            <h2>{'Select vehicle'}</h2>
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
                                        {'Selected vehicle: '}
                                        <strong>
                                            {selectedVehicle && selectedVehicle.brand + ' ' + selectedVehicle.model}
                                        </strong>
                                    </div>
                                    <div className="mt-3">
                                        {'Price: '}
                                        <strong>{selectedVehicle && selectedVehicle.dailyFee} $</strong>
                                    </div>
                                </h4>
                                {vehiclesError && (
                                    <div key="input_Error" className="alert alert-danger my-4">
                                        Vehicle need to be selected.
                                    </div>
                                )}
                                <div className="row mb-3 mt-5">
                                    <Link
                                        to={reservationDataSubpageLink}
                                        className="linkstyle btn btn-lg btn-secondary btn-block col-md-3 ml-5"
                                    >
                                        Back
                                    </Link>
                                    <input
                                        type="submit"
                                        value="Next"
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
