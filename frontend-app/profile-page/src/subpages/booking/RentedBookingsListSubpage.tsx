import React, { useEffect, useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { BookingResponseDTO } from '../../model/BookingResponseDTO';
import { getRentedBookingsList, returnBooking } from '../../service/BookingService';
import { ButtonTableItem } from '../../components/table/tab_items/ButtonTableItem';

export function RentedBookingsListSubpage(): JSX.Element {
    const [bookingsList, setBookingList] = useState<BookingResponseDTO[]>([]);

    useEffect(() => {
        getRentedBookingsList().then((bookingsListResponse: BookingResponseDTO[]) => {
            setBookingList(bookingsListResponse);
        });
    }, []);

    const columns = React.useMemo<Column<BookingResponseDTO>[]>(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'User ID',
                accessor: 'userId',
            },
            {
                Header: 'Vehicle ID',
                accessor: 'vehicleId',
            },
            {
                Header: 'Receipt date',
                accessor: (row: BookingResponseDTO) => {
                    return row.receiptDate.toLocaleDateString();
                },
            },
            {
                Header: 'Return date',
                accessor: (row: BookingResponseDTO) => {
                    return row.returnDate.toLocaleDateString();
                },
            },
            {
                Header: 'Location',
                accessor: (row: BookingResponseDTO) => {
                    return `${row.location.country}, ${row.location.city}, ${row.location.address}`;
                },
            },
            {
                Header: 'State',
                accessor: (row: BookingResponseDTO) => {
                    return row.bookingState.description;
                },
            },
            {
                Header: 'Total cost',
                accessor: 'totalCost',
            },
            {
                Header: 'Return',
                accessor: (row: BookingResponseDTO) =>
                    ButtonTableItem('Return', undefined, 'success', () => {
                        returnBooking(row.id);
                        getRentedBookingsList().then((bookingsListResponse: BookingResponseDTO[]) => {
                            setBookingList(bookingsListResponse);
                        });
                    }),
            },
        ],
        []
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'Rented bookings list'} />
            <SubpageContent>
                <Table<BookingResponseDTO> columns={columns} data={bookingsList} />
            </SubpageContent>
        </SubpageContainer>
    );
}
