import React, { useEffect, useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { getBookingChangesList } from '../../service/BookingService';
import { BookingChangeResponseDTO } from '../../model/BookingChangeResponseDTO';

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
                Header: 'User login',
                accessor: 'userLogin',
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
