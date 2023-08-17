import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column, HeaderProps } from 'react-table';
import { BookingAuditLogService, TranslationService } from '@car-rental/shared/service';
import { RangeColumnFilter } from '../../components/table/tab_items/slider_column_filter/RangeColumnFilter';
import { BookingStatesSelectColumnFilter } from '../../components/table/tab_items/booking_states_select_column_filter/BookingStatesSelectColumnFilter';
import { BookingStateCodeEnum, Page, BookingAuditLogResponseDTO } from '@car-rental/shared/model';
import { translateBookingCode } from '../../utils/TranslationUtils';

export function BookingsAuditLogsListSubpage(): JSX.Element {
    const [bookingAuditLogPage, setBookingAuditLogPage] = useState<Page<BookingAuditLogResponseDTO> | undefined>(
        undefined
    );
    const columns = React.useMemo<Column<BookingAuditLogResponseDTO>[]>(
        () => [
            {
                id: 'id',
                Header: TranslationService.translate('idBookingAuditLogsColumn'),
                accessor: 'id',
            },
            {
                id: 'userId',
                Header: TranslationService.translate('userIdBookingAuditLogsColumn'),
                accessor: 'userId',
            },
            {
                id: 'vehicleId',
                Header: TranslationService.translate('vehicleIdBookingAuditLogsColumn'),
                accessor: 'vehicleId',
            },
            {
                id: 'bookingId',
                Header: TranslationService.translate('bookingIdBookingAuditLogsColumn'),
                accessor: 'bookingId',
            },
            {
                id: 'bookingStateCode',
                Header: TranslationService.translate('bookingStateBookingAuditLogsColumn'),
                accessor: (row: BookingAuditLogResponseDTO) =>
                    translateBookingCode(row.bookingCode as BookingStateCodeEnum),
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingAuditLogResponseDTO>>) => {
                    return <BookingStatesSelectColumnFilter {...filterProps} />;
                },
            },
            {
                id: 'receiptDate',
                Header: TranslationService.translate('receiptDateBookingAuditLogsColumn'),
                accessor: (row: BookingAuditLogResponseDTO) => {
                    return row.receiptDate;
                },
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingAuditLogResponseDTO>>) => {
                    return <RangeColumnFilter inputType="date" {...filterProps} />;
                },
            },
            {
                id: 'returnDate',
                Header: TranslationService.translate('returnDateBookingAuditLogsColumn'),
                accessor: (row: BookingAuditLogResponseDTO) => {
                    return row.returnDate;
                },
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingAuditLogResponseDTO>>) => {
                    return <RangeColumnFilter inputType="date" {...filterProps} />;
                },
            },
            {
                id: 'totalCost',
                Header: TranslationService.translate('totalCostBookingAuditLogsColumn'),
                accessor: (row: BookingAuditLogResponseDTO) => {
                    return `${row.totalCost} $`;
                },
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingAuditLogResponseDTO>>) => {
                    return <RangeColumnFilter inputType="number" {...filterProps} />;
                },
            },
        ],
        []
    );

    const fetchData = React.useCallback((pageIndex, pageSize, filter, sortBy, desc): Promise<void> => {
        return BookingAuditLogService.getBookingsAuditLogsList(pageIndex, pageSize, filter, sortBy, desc).then(
            (page: Page<BookingAuditLogResponseDTO>) => {
                setBookingAuditLogPage(page);
            }
        );
    }, []);

    return (
        <SubpageContainer>
            <SubpageHeader title={TranslationService.translate('auditLogsSubpageTitle')} />
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
