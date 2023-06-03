import { FilterProps } from 'react-table';
import React from 'react';
import { SelectColumnFilter } from '../select_column_filter/SelectColumnFilter';
import { getAllBookingStates } from '../../../../service/BookingAdminService';
import { BookingStateDTO } from '../../../../model/BookingStateDTO';

export function BookingStatesSelectColumnFilter<D extends object>(filterProps: FilterProps<D>) {
    const [bookings, setBookings] = React.useState<BookingStateDTO[]>([]);

    React.useEffect(() => {
        getAllBookingStates().then((bookingsResponse: BookingStateDTO[]) => {
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