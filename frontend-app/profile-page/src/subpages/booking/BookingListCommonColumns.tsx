import React from 'react';
import { Column, HeaderProps } from 'react-table';
import { BookingResponseDTO } from '../../model/BookingResponseDTO';
import { UserResponseDTO } from '../../model/UserResponseDTO';
import { RangeColumnFilter } from '../../components/table/tab_items/slider_column_filter/RangeColumnFilter';
import { LocationSelectColumnFilter } from '../../components/table/tab_items/location_select_column_filter/LocationSelectColumnFilter';

export function bookingListCommonColumns(): Column<BookingResponseDTO>[] {
    return [
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
            id: 'receiptDate',
            Header: 'Receipt date',
            accessor: (row: BookingResponseDTO) => {
                return row.receiptDate;
            },
            Filter: (filterProps: React.PropsWithChildren<HeaderProps<UserResponseDTO>>) => {
                return <RangeColumnFilter inputType="date" {...filterProps} />;
            },
        },
        {
            id: 'returnDate',
            Header: 'Return date',
            accessor: (row: BookingResponseDTO) => {
                return row.returnDate;
            },
            Filter: (filterProps: React.PropsWithChildren<HeaderProps<UserResponseDTO>>) => {
                return <RangeColumnFilter inputType="date" {...filterProps} />;
            },
        },
        {
            id: 'location',
            Header: 'Location',
            accessor: (row: BookingResponseDTO) => {
                return `${row.location.country}, ${row.location.city}, ${row.location.streetAndNb}`;
            },
            Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                return <LocationSelectColumnFilter {...filterProps} />;
            },
        },
        {
            id: 'totalCost',
            Header: 'Total cost',
            accessor: 'totalCost',
            Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                return <RangeColumnFilter inputType="number" {...filterProps} />;
            },
        },
    ];
}
