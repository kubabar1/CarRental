import React, { useEffect, useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { BookingAuditLogResponseDTO } from '../../model/BookingAuditLogResponseDTO';
import { getBookingsAuditLogsList } from '../../service/BookingAuditLogService';
import { SubpagePagination } from '../../components/subpage/pagination/SubpagePagination';
import { useLocation } from 'react-router-dom';
import { getCountFromUrl, getPageFromUrl } from '../../../../main-page/src/utils/UrlUtil';
import Page from '../../../../main-page/src/model/Page';

export function BookingsAuditLogsListSubpage(): JSX.Element {
    const location = useLocation();
    const DEFAULT_PER_PAGE_COUNT = 10;
    const page: number = getPageFromUrl(location.search);
    const count: number = getCountFromUrl(location.search);

    const [perPageCount, setPerPageCount] = useState<number>(count <= 0 ? DEFAULT_PER_PAGE_COUNT : count);
    const [currentPage, setCurrentPage] = useState<number>(page);
    const [bookingAuditLogList, setBookingAuditLogList] = useState<Page<BookingAuditLogResponseDTO> | undefined>(
        undefined
    );
    const [totalPagesCount, setTotalPagesCount] = useState<number>(0);

    useEffect(() => {
        getBookingsAuditLogsList(currentPage, perPageCount).then(
            (bookingsListResponse: Page<BookingAuditLogResponseDTO>) => {
                if (currentPage > bookingsListResponse.totalPages - 1) {
                    setCurrentPage(bookingsListResponse.totalPages - 1);
                } else {
                    setBookingAuditLogList(bookingsListResponse);
                    setTotalPagesCount(bookingsListResponse.totalPages);
                }
            }
        );
    }, [currentPage, perPageCount]);

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
                {bookingAuditLogList && (
                    <Table<BookingAuditLogResponseDTO> columns={columns} data={bookingAuditLogList.content} />
                )}
            </SubpageContent>
            <SubpagePagination
                totalPagesCount={totalPagesCount}
                perPageCount={perPageCount}
                setPerPageCount={setPerPageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </SubpageContainer>
    );
}
