import React, { useEffect, useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { BookingResponseDTO } from '../../model/BookingResponseDTO';
import { ButtonTableItem } from '../../components/table/tab_items/ButtonTableItem';
import {
    cancelAuthorizedUserBooking,
    getAuthenticatedUserReservedBookingsList,
} from '../../service/BookingUserService';

export function MyReservedBookingsListSubpage(): JSX.Element {
    const [bookingsList, setBookingList] = useState<BookingResponseDTO[]>([]);

    useEffect(() => {
        getAuthenticatedUserReservedBookingsList().then((bookingsListResponse: BookingResponseDTO[]) => {
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
                    return row.receiptDate;
                },
            },
            {
                Header: 'Return date',
                accessor: (row: BookingResponseDTO) => {
                    return row.returnDate;
                },
            },
            {
                Header: 'Location',
                accessor: (row: BookingResponseDTO) => {
                    return `${row.location.country}, ${row.location.city}, ${row.location.streetAndNb}`;
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
                Header: 'Cancel',
                accessor: (row: BookingResponseDTO) =>
                    ButtonTableItem('Cancel', undefined, 'danger', () => {
                        cancelAuthorizedUserBooking(row.id);
                        getAuthenticatedUserReservedBookingsList().then(
                            (bookingsListResponse: BookingResponseDTO[]) => {
                                setBookingList(bookingsListResponse);
                            }
                        );
                    }),
            },
        ],
        []
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'My reserved bookings list'} />
            <SubpageContent>
                <Table<BookingResponseDTO> columns={columns} data={bookingsList} />
            </SubpageContent>
        </SubpageContainer>
    );
}
