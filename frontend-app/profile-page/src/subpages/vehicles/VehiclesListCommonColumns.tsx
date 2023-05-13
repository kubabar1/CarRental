import React from 'react';
import { Column, HeaderProps } from 'react-table';
import { BookingResponseDTO } from '../../model/BookingResponseDTO';
import { RangeColumnFilter } from '../../components/table/tab_items/slider_column_filter/RangeColumnFilter';
import { LocationSelectColumnFilter } from '../../components/table/tab_items/location_select_column_filter/LocationSelectColumnFilter';
import { VehicleResponseDTO } from '../../model/VehicleResponseDTO';
import { VehicleOptionsDTO } from '../../model/VehicleOptionsDTO';
import { SelectColumnFilter } from '../../components/table/tab_items/select_column_filter/SelectColumnFilter';

export function vehiclesListCommonColumns(vehicleOptions: VehicleOptionsDTO | undefined): Column<VehicleResponseDTO>[] {
    return [
        {
            id: 'id',
            Header: 'ID',
            accessor: 'id',
        },
        {
            id: 'brand.brand',
            Header: 'Brand',
            accessor: 'brand',
            Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                return (
                    <SelectColumnFilter
                        options={
                            vehicleOptions
                                ? vehicleOptions.brands.map((brand) => {
                                      return {
                                          value: brand,
                                          label: brand,
                                      };
                                  })
                                : []
                        }
                        {...filterProps}
                    />
                );
            },
        },
        {
            id: 'model.model',
            Header: 'Model',
            accessor: 'model',
        },
        {
            id: 'dailyFee',
            Header: 'Daily fee',
            accessor: (vehicleResponseDTO: VehicleResponseDTO) => `${vehicleResponseDTO.dailyFee.toFixed(2)} $`,
            Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                return <RangeColumnFilter inputType="number" {...filterProps} />;
            },
        },
        {
            id: 'registration',
            Header: 'Registration',
            accessor: 'registration',
        },
        {
            id: 'locationId',
            Header: 'Location',
            accessor: 'locationId',
            Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                return <LocationSelectColumnFilter {...filterProps} />;
            },
        },
        {
            id: 'vehicleStatus',
            Header: 'Status',
            accessor: (vehicleResponseDTO: VehicleResponseDTO) => vehicleResponseDTO.vehicleStatus.description,
            Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                return (
                    <SelectColumnFilter
                        options={[
                            { value: 'UAV', label: 'unavailable' },
                            { value: 'AVI', label: 'available' },
                        ]}
                        {...filterProps}
                    />
                );
            },
        },
        {
            id: 'bestOffer',
            Header: 'Best offer',
            accessor: (vehicleResponseDTO: VehicleResponseDTO) => (vehicleResponseDTO.bestOffer ? 'true' : 'false'),
            Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                return (
                    <SelectColumnFilter
                        options={[
                            { value: 'true', label: 'true' },
                            { value: 'false', label: 'false' },
                        ]}
                        {...filterProps}
                    />
                );
            },
            disableSortBy: true,
        },
        {
            id: 'vehicleDetails.bodyType.bodyType',
            Header: 'Body type',
            accessor: (vehicleResponseDTO: VehicleResponseDTO) => vehicleResponseDTO.vehicleDetails.bodyType,
            Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                return (
                    <SelectColumnFilter
                        options={
                            vehicleOptions
                                ? vehicleOptions.bodyTypes.map((bodyType) => {
                                      return {
                                          value: bodyType,
                                          label: bodyType,
                                      };
                                  })
                                : []
                        }
                        {...filterProps}
                    />
                );
            },
        },
        {
            id: 'vehicleDetails.fuelType.fuelType',
            Header: 'Fuel type',
            accessor: (vehicleResponseDTO: VehicleResponseDTO) => vehicleResponseDTO.vehicleDetails.fuelType,
            Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                return (
                    <SelectColumnFilter
                        options={
                            vehicleOptions
                                ? vehicleOptions.fuelTypes.map((fuelType) => {
                                      return {
                                          value: fuelType,
                                          label: fuelType,
                                      };
                                  })
                                : []
                        }
                        {...filterProps}
                    />
                );
            },
        },
        {
            id: 'vehicleDetails.power',
            Header: 'Power',
            accessor: (vehicleResponseDTO: VehicleResponseDTO) => `${vehicleResponseDTO.vehicleDetails.power} HP`,
            Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                return <RangeColumnFilter inputType="number" {...filterProps} />;
            },
        },
        {
            id: 'vehicleDetails.productionYear',
            Header: 'Production year',
            accessor: (vehicleResponseDTO: VehicleResponseDTO) => vehicleResponseDTO.vehicleDetails.productionYear,
            Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                return <RangeColumnFilter inputType="number" {...filterProps} />;
            },
        },
    ];
}
