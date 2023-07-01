import React from 'react';
import { BookingCostRequestDTO, BookingCostResponseDTO, ResponseData } from '@car-rental/shared/model';
import { BookingUserService } from '@car-rental/shared/service';

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
            BookingUserService.getBookingCost(
                new BookingCostRequestDTO(selectedVehicleId, receptionDate, returnDate)
            ).then((bookingCost: ResponseData<BookingCostResponseDTO>) => {
                setFullCost(bookingCost.responseBody.totalCost);
            });
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
