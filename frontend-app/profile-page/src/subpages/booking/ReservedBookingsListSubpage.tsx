import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { BookingResponseDTO, Page } from '@car-rental/shared/model';
import { cancelBooking, getAllReservedBookingsList, rentBooking } from '@car-rental/shared/service';
import { ButtonTableItem } from '../../components/table/tab_items/button_table_item/ButtonTableItem';
import { bookingListCommonColumns } from './BookingListCommonColumns';

export function ReservedBookingsListSubpage(): JSX.Element {
    const [bookingsPage, setBookingsPage] = useState<Page<BookingResponseDTO> | undefined>(undefined);

    const fetchData = React.useCallback(
        (pageIndex?: number, pageSize?: number, filter?: string, sortBy?: string, desc?: boolean): Promise<void> => {
            return getAllReservedBookingsList(pageIndex, pageSize, filter, sortBy, desc).then(
                (page: Page<BookingResponseDTO>) => {
                    setBookingsPage(page);
                }
            );
        },
        []
    );

    const columns = React.useMemo<Column<BookingResponseDTO>[]>(
        () => [
            ...bookingListCommonColumns(),
            {
                id: 'rent',
                Header: 'Rent',
                accessor: (row: BookingResponseDTO) => (
                    <ButtonTableItem
                        buttonText={'Rent'}
                        onClickAction={() =>
                            rentBooking(row.id).then(() => {
                                fetchData();
                            })
                        }
                    />
                ),
                disableFilters: true,
                disableSortBy: true,
            },
            {
                id: 'cancel',
                Header: 'Cancel',
                accessor: (row: BookingResponseDTO) => (
                    <ButtonTableItem
                        buttonText={'Cancel'}
                        buttonVariant={'danger'}
                        onClickAction={() =>
                            cancelBooking(row.id).then(() => {
                                fetchData();
                            })
                        }
                    />
                ),
                disableFilters: true,
                disableSortBy: true,
            },
        ],
        [fetchData]
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'All reservations'} />
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
