import { FilterProps } from 'react-table';
import React from 'react';
import { SelectColumnFilter } from '../select_column_filter/SelectColumnFilter';
import { BookingAdminService } from '@car-rental/shared/service';
import { BookingStateDTO } from '@car-rental/shared/model';

export function BookingStatesSelectColumnFilter<D extends object>(filterProps: FilterProps<D>) {
    const [bookings, setBookings] = React.useState<BookingStateDTO[]>([]);

    React.useEffect(() => {
        BookingAdminService.getAllBookingStates().then((bookingsResponse: BookingStateDTO[]) => {
            setBookings(bookingsResponse);
        });
    }, []);

    return (
        <SelectColumnFilter
            options={bookings.map((bookingState: BookingStateDTO) => {
                return {
                    value: bookingState.bookingCode,
                    label: bookingState.description,
                };
            })}
            {...filterProps}
        />
    );
}
