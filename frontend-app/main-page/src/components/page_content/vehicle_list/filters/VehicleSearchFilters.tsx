import React from 'react';
import { VehicleFiltersParamsDTO } from '../../../../model/VehicleFiltersParamsDTO';
import { SearchSelectOption, SearchSelect } from './search_components/select/SearchSelect';
// import { SingleValue } from 'react-select';
// import { SearchMinMaxInput } from './search_components/min_max_input/SearchMinMaxInput';
import FilteringParamsEnum from '../../../../model/FilteringParamsEnum';
import { SingleValue } from 'react-select';
import { SearchMinMaxInput } from './search_components/min_max_input/SearchMinMaxInput';

interface CarSearchFiltersInterface {
    vehicleFiltersParams: VehicleFiltersParamsDTO;
    vehicleFilterModelsParam: string[];
    vehicleFilters: Map<FilteringParamsEnum, string | undefined>;
    setVehicleFilters: (value: Map<FilteringParamsEnum, string | undefined>) => void;
    handleFilterSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function VehicleSearchFilters({
    vehicleFiltersParams,
    vehicleFilterModelsParam,
    vehicleFilters,
    setVehicleFilters,
    handleFilterSubmit,
}: CarSearchFiltersInterface): JSX.Element {
    const mapToOptionType = (val?: string): SearchSelectOption => {
        if (val) {
            return {
                value: val,
                label: translate(val),
            };
        } else {
            return {
                value: null,
                label: null,
            };
        }
    };

    const translate = (val: string): string | null => {
        return val;
    };

    const renderSearchSelect = (
        searchLabel: string,
        filteringParam: FilteringParamsEnum,
        allFilteringOptions: string[]
    ) => {
        return (
            <SearchSelect
                label={searchLabel}
                value={mapToOptionType(vehicleFilters.get(filteringParam))}
                onChange={(newValue: SingleValue<SearchSelectOption>) => {
                    setVehicleFilters(
                        new Map(vehicleFilters).set(
                            filteringParam,
                            newValue == null || newValue.value == null ? undefined : newValue.value
                        )
                    );
                }}
                options={allFilteringOptions.map(mapToOptionType)}
            />
        );
    };

    const renderSearchMinMaxInput = (
        searchLabel: string,
        filteringParamMin: FilteringParamsEnum,
        filteringParamMax: FilteringParamsEnum
    ) => {
        return (
            <SearchMinMaxInput
                label={searchLabel}
                labelMin={'From:'}
                labelMax={'To:'}
                minValue={vehicleFilters.get(filteringParamMin)}
                maxValue={vehicleFilters.get(filteringParamMax)}
                setMinValue={(newValue: string | undefined) => {
                    setVehicleFilters(new Map(vehicleFilters).set(filteringParamMin, newValue));
                }}
                setMaxValue={(newValue: string | undefined) => {
                    setVehicleFilters(new Map(vehicleFilters).set(filteringParamMax, newValue));
                }}
            />
        );
    };

    return (
        <div className="card shadow">
            <div id="search-filter-container" className="card-body">
                <form onSubmit={handleFilterSubmit}>
                    {renderSearchSelect('Brand:', FilteringParamsEnum.BRAND_FIELD_FILTER, vehicleFiltersParams.brands)}
                    {renderSearchSelect('Model:', FilteringParamsEnum.MODEL_FIELD_FILTER, vehicleFilterModelsParam)}
                    {/*// TODO: uncomment after add handling for localisations*/}
                    {/*<SearchSelectItem*/}
                    {/*    label={'City:'}*/}
                    {/*    value={city}*/}
                    {/*    setValue={setCity}*/}
                    {/*    options={mapToFilterSelectOption(vehicleFilterParams.cities)}*/}
                    {/*/>*/}
                    {renderSearchSelect(
                        'Body type:',
                        FilteringParamsEnum.BODY_TYPE_FIELD_FILTER,
                        vehicleFiltersParams.bodyTypes
                    )}
                    {renderSearchSelect('Color:', FilteringParamsEnum.COLOR_FIELD_FILTER, vehicleFiltersParams.colors)}
                    {renderSearchMinMaxInput(
                        'Price:',
                        FilteringParamsEnum.DAILY_FEE_FROM_FILTER,
                        FilteringParamsEnum.DAILY_FEE_TO_FILTER
                    )}
                    {renderSearchMinMaxInput(
                        'Seats count:',
                        FilteringParamsEnum.DOORS_NUMBER_FROM_FILTER,
                        FilteringParamsEnum.DOORS_NUMBER_TO_FILTER
                    )}
                    {renderSearchMinMaxInput(
                        'Doors count:',
                        FilteringParamsEnum.DOORS_NUMBER_FROM_FILTER,
                        FilteringParamsEnum.DOORS_NUMBER_TO_FILTER
                    )}
                    {renderSearchMinMaxInput(
                        'Production year:',
                        FilteringParamsEnum.PRODUCTION_YEAR_FROM_FILTER,
                        FilteringParamsEnum.PRODUCTION_YEAR_TO_FILTER
                    )}
                    <input type="submit" value="Search" className="btn btn-primary" />
                </form>
            </div>
        </div>
    );
}
