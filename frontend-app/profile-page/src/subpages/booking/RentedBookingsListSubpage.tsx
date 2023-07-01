import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { BookingResponseDTO, Page } from '@car-rental/shared/model';
import { getAllRentedBookingsList, returnBooking } from '@car-rental/shared/service';
import { ButtonTableItem } from '../../components/table/tab_items/button_table_item/ButtonTableItem';
import { bookingListCommonColumns } from './BookingListCommonColumns';

export function RentedBookingsListSubpage(): JSX.Element {
    const [bookingsPage, setBookingsPage] = useState<Page<BookingResponseDTO> | undefined>(undefined);

    const fetchData = React.useCallback(
        (pageIndex?: number, pageSize?: number, filter?: string, sortBy?: string, desc?: boolean): Promise<void> => {
            return getAllRentedBookingsList(pageIndex, pageSize, filter, sortBy, desc).then(
                (bookingsListResponse: Page<BookingResponseDTO>) => {
                    setBookingsPage(bookingsListResponse);
                }
            );
        },
        []
    );

    const columns = React.useMemo<Column<BookingResponseDTO>[]>(
        () => [
            ...bookingListCommonColumns(),
            {
                id: 'return',
                Header: 'Return',
                accessor: (row: BookingResponseDTO) => (
                    <ButtonTableItem
                        buttonText={'Return'}
                        buttonVariant={'success'}
                        onClickAction={() =>
                            returnBooking(row.id).then(() => {
                                fetchData();
                            })
                        }
                    />
                ),
                disableSortBy: true,
                disableFilters: true,
            },
        ],
        [fetchData]
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'All rents'} />
            <SubpageContent>
                <Table<BookingResponseDTO>
                    columns={columns}
                    data={bookingsPage ? bookingsPage.content : []}
                    fetchData={fetchData}
                    pageCount={bookingsPage?.totalPages}
                />
            </SubpageContent>
        </SubpageContainer>
    );
}
