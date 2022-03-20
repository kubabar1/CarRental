import React, { useEffect, useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { BookingAuditLogResponseDTO } from '../../model/BookingAuditLogResponseDTO';
import { getBookingsAuditLogsList } from '../../service/BookingAuditLogService';

export function BookingsAuditLogsListSubpage(): JSX.Element {
    const [bookingAuditLogList, setBookingAuditLogList] = useState<BookingAuditLogResponseDTO[]>([]);

    useEffect(() => {
        getBookingsAuditLogsList().then((bookingAuditLogResponseDTOS: BookingAuditLogResponseDTO[]) => {
            setBookingAuditLogList(bookingAuditLogResponseDTOS);
        });
    }, []);

    const columns = React.useMemo<Column<BookingAuditLogResponseDTO>[]>(
        () => [
            {
                Header: 'Revision ID',
                accessor: 'id',
            },
            {
                Header: 'Booking ID',
                accessor: 'bookingId',
            },
            {
                Header: 'Receipt date',
                accessor: 'receiptDate',
            },
            {
                Header: 'Return date',
                accessor: 'returnDate',
            },
            {
                Header: 'Total cost',
                accessor: 'totalCost',
            },
            {
                Header: 'User id',
                accessor: 'userId',
            },
            {
                Header: 'Vehicle id',
                accessor: 'vehicleId',
            },
            {
                Header: 'Booking code',
                accessor: 'bookingCode',
            },
        ],
        []
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'Bookings audit logs'} />
            <SubpageContent>
                <Table<BookingAuditLogResponseDTO> columns={columns} data={bookingAuditLogList} />
            </SubpageContent>
        </SubpageContainer>
    );
}
