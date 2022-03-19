import React, { useEffect, useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { BookingChangeResponseDTO } from '../../model/BookingChangeResponseDTO';
import { getBookingChangesList } from '../../service/BookingChangesService';

export function BookingChangesListSubpage(): JSX.Element {
    const [bookingChangesList, setBookingChangesList] = useState<BookingChangeResponseDTO[]>([]);

    useEffect(() => {
        getBookingChangesList().then((bookingChangesListResponse: BookingChangeResponseDTO[]) => {
            setBookingChangesList(bookingChangesListResponse);
        });
    }, []);

    const columns = React.useMemo<Column<BookingChangeResponseDTO>[]>(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Booking ID',
                accessor: 'bookingId',
            },
            {
                Header: 'Change date',
                accessor: 'changeDate',
            },
            {
                Header: 'User ID',
                accessor: 'userId',
            },
            {
                Header: 'IP address',
                accessor: 'ipAddress',
            },
        ],
        []
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'Booking changes list'} />
            <SubpageContent>
                <Table<BookingChangeResponseDTO> columns={columns} data={bookingChangesList} />
            </SubpageContent>
        </SubpageContainer>
    );
}
