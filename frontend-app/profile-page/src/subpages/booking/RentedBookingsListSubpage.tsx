import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { BookingResponseDTO, Page } from '@car-rental/shared/model';
import { BookingAdminService, TranslationService } from '@car-rental/shared/service';
import { ButtonTableItem } from '../../components/table/tab_items/button_table_item/ButtonTableItem';
import { bookingListCommonColumns } from './BookingListCommonColumns';

export function RentedBookingsListSubpage(): JSX.Element {
    const [bookingsPage, setBookingsPage] = useState<Page<BookingResponseDTO> | undefined>(undefined);

    const fetchData = React.useCallback(
        (pageIndex?: number, pageSize?: number, filter?: string, sortBy?: string, desc?: boolean): Promise<void> => {
            return BookingAdminService.getAllRentedBookingsList(pageIndex, pageSize, filter, sortBy, desc).then(
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
                Header: TranslationService.translate('returnBookingListColumn'),
                accessor: (row: BookingResponseDTO) => (
                    <ButtonTableItem
                        buttonText={TranslationService.translate('returnButtonBookingListColumn')}
                        buttonVariant={'success'}
                        onClickAction={() =>
                            BookingAdminService.returnBooking(row.id).then(() => {
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
            <SubpageHeader title={TranslationService.translate('allRentsSubpageTitle')} />
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
