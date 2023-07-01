import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column, HeaderProps } from 'react-table';
import { getBookingsAuditLogsList } from '@car-rental/shared/service';
import { RangeColumnFilter } from '../../components/table/tab_items/slider_column_filter/RangeColumnFilter';
import { BookingStatesSelectColumnFilter } from '../../components/table/tab_items/booking_states_select_column_filter/BookingStatesSelectColumnFilter';
import { BookingStateCodeEnum, Page, BookingAuditLogResponseDTO } from '@car-rental/shared/model';

export function BookingsAuditLogsListSubpage(): JSX.Element {
    const [bookingAuditLogPage, setBookingAuditLogPage] = useState<Page<BookingAuditLogResponseDTO> | undefined>(
        undefined
    );
    const columns = React.useMemo<Column<BookingAuditLogResponseDTO>[]>(
        () => [
            {
                id: 'id',
                Header: 'ID',
                accessor: 'id',
            },
            {
                id: 'userId',
                Header: 'User ID',
                accessor: 'userId',
            },
            {
                id: 'vehicleId',
                Header: 'Vehicle ID',
                accessor: 'vehicleId',
            },
            {
                id: 'bookingId',
                Header: 'Booking ID',
                accessor: 'bookingId',
            },
            {
                id: 'bookingStateCode',
                Header: 'Booking state',
                accessor: (row: BookingAuditLogResponseDTO) => {
                    switch (row.bookingCode as BookingStateCodeEnum) {
                        case BookingStateCodeEnum.CAN:
                            return 'canceled';
                        case BookingStateCodeEnum.REN:
                            return 'rented';
                        case BookingStateCodeEnum.RES:
                            return 'reserved';
                        case BookingStateCodeEnum.RET:
                            return 'returned';
                    }
                },
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingAuditLogResponseDTO>>) => {
                    return <BookingStatesSelectColumnFilter {...filterProps} />;
                },
            },
            {
                id: 'receiptDate',
                Header: 'Receipt date',
                accessor: (row: BookingAuditLogResponseDTO) => {
                    return row.receiptDate;
                },
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingAuditLogResponseDTO>>) => {
                    return <RangeColumnFilter inputType="date" {...filterProps} />;
                },
            },
            {
                id: 'returnDate',
                Header: 'Return date',
                accessor: (row: BookingAuditLogResponseDTO) => {
                    return row.returnDate;
                },
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingAuditLogResponseDTO>>) => {
                    return <RangeColumnFilter inputType="date" {...filterProps} />;
                },
            },
            {
                id: 'totalCost',
                Header: 'Total cost',
                accessor: 'totalCost',
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingAuditLogResponseDTO>>) => {
                    return <RangeColumnFilter inputType="number" {...filterProps} />;
                },
            },
        ],
        []
    );

    const fetchData = React.useCallback((pageIndex, pageSize, filter, sortBy, desc): Promise<void> => {
        return getBookingsAuditLogsList(pageIndex, pageSize, filter, sortBy, desc).then(
            (page: Page<BookingAuditLogResponseDTO>) => {
                setBookingAuditLogPage(page);
            }
        );
    }, []);

    return (
        <SubpageContainer>
            <SubpageHeader title={'Audit logs'} />
            <SubpageContent>
                <Table<BookingAuditLogResponseDTO>
                    columns={columns}
                    data={bookingAuditLogPage ? bookingAuditLogPage.content : []}
                    fetchData={fetchData}
                    pageCount={bookingAuditLogPage?.totalPages}
                />
            </SubpageContent>
        </SubpageContainer>
    );
}
