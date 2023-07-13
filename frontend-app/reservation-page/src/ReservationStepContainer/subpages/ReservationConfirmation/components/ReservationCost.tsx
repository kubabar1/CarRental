import React from 'react';
import { BookingCostRequestDTO, BookingCostResponseDTO, ResponseData } from '@car-rental/shared/model';
import { BookingUserService, TranslationService } from '@car-rental/shared/service';

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
            <h3>{TranslationService.translate('reservationCostHeader')}</h3>
            <hr />
            <div>{renderFormGroupItem(TranslationService.translate('reservationCostCostLabel'), `${fullCost} $`)}</div>
        </div>
    );
}
