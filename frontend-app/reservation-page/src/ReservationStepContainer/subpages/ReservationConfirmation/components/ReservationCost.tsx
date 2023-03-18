import React from 'react';
import { getBookingCost } from '../../../../service/BookingService';
import BookingCostRequestDTO from '../../../../model/BookingCostRequestDTO';
import BookingCostResponseDTO from '../../../../model/BookingCostResponseDTO';

interface ReservationCostProperties {
    selectedVehicleId: string;
    receptionDate: string;
    returnDate: string;
    renderFormGroupItem: (label: string, value: string) => JSX.Element;
}

export function ReservationCost({
    selectedVehicleId,
    receptionDate,
    returnDate,
    renderFormGroupItem,
}: ReservationCostProperties): JSX.Element {
    const [fullCost, setFullCost] = React.useState<number | undefined>(undefined);

    React.useEffect(() => {
        if (selectedVehicleId) {
            getBookingCost(new BookingCostRequestDTO(selectedVehicleId, receptionDate, returnDate)).then(
                (bookingCost: BookingCostResponseDTO) => {
                    setFullCost(bookingCost.totalCost);
                }
            );
        }
    }, [selectedVehicleId, receptionDate, returnDate]);

    return (
        <div>
            <h3>{'Reservation cost'}</h3>
            <hr />
            <div>{renderFormGroupItem('Cost: ', `${fullCost} $`)}</div>
        </div>
    );
}
