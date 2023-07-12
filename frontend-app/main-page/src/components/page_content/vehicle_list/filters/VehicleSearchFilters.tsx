import React, { useEffect, useState } from 'react';
import { VehicleOptionsDTO, FilteringParamsEnum } from '@car-rental/shared/model';
import { SearchSelectOption, SearchSelect, mapToOptionType } from './search_components/select/SearchSelect';
import { SingleValue } from 'react-select';
import { SearchMinMaxInput } from './search_components/min_max_input/SearchMinMaxInput';
import './VehicleSearchFilters.scss';
import { TranslationService, VehicleService } from '@car-rental/shared/service';
import qs, { ParsedQs } from 'qs';

interface CarSearchFiltersInterface {
    // vehicleFilters: Map<FilteringParamsEnum, string | undefined>;
    handleFilterSubmit: (
        event: React.FormEvent<HTMLFormElement>,
        vehicleFilters: Map<FilteringParamsEnum, string | undefined>
    ) => void;
}

const getFilterRequestParam = (filteringParam: FilteringParamsEnum) => {
    const requestParams: ParsedQs = qs.parse(location.search, { ignoreQueryPrefix: true });
    return requestParams[filteringParam] as string | undefined;
};

export function VehicleSearchFilters({ handleFilterSubmit }: CarSearchFiltersInterface): JSX.Element {
    const [vehicleFiltersParams, setVehicleFiltersParams] = useState<VehicleOptionsDTO | undefined>(undefined);
    const [vehicleFilterModelsParam, setVehicleFilterModelsParam] = useState<string[]>([]);
    const [brand, setBrand] = useState<string | undefined>(
        getFilterRequestParam(FilteringParamsEnum.BRAND_FIELD_FILTER)
    );
    const [model, setModel] = useState<string | undefined>(
        getFilterRequestParam(FilteringParamsEnum.MODEL_FIELD_FILTER)
    );
    const [bodyType, setBodyType] = useState<string | undefined>(
        getFilterRequestParam(FilteringParamsEnum.BODY_TYPE_FIELD_FILTER)
    );
    const [color, setColor] = useState<string | undefined>(
        getFilterRequestParam(FilteringParamsEnum.COLOR_FIELD_FILTER)
    );
    const [minPrice, setMinPrice] = useState<string | undefined>(
        getFilterRequestParam(FilteringParamsEnum.DAILY_FEE_FROM_FILTER)
    );
    const [maxPrice, setMaxPrice] = useState<string | undefined>(
        getFilterRequestParam(FilteringParamsEnum.DAILY_FEE_TO_FILTER)
    );
    const [minSeatsCount, setMinSeatsCount] = useState<string | undefined>(
        getFilterRequestParam(FilteringParamsEnum.SEATS_NUMBER_FROM_FILTER)
    );
    const [maxSeatsCount, setMaxSeatsCount] = useState<string | undefined>(
        getFilterRequestParam(FilteringParamsEnum.SEATS_NUMBER_TO_FILTER)
    );
    const [minDoorsCount, setMinDoorsCount] = useState<string | undefined>(
        getFilterRequestParam(FilteringParamsEnum.DOORS_NUMBER_FROM_FILTER)
    );
    const [maxDoorsCount, setMaxDoorsCount] = useState<string | undefined>(
        getFilterRequestParam(FilteringParamsEnum.DOORS_NUMBER_TO_FILTER)
    );
    const [minProductionYear, setMinProductionYear] = useState<string | undefined>(
        getFilterRequestParam(FilteringParamsEnum.PRODUCTION_YEAR_FROM_FILTER)
    );
    const [maxProductionYear, setMaxProductionYear] = useState<string | undefined>(
        getFilterRequestParam(FilteringParamsEnum.PRODUCTION_YEAR_TO_FILTER)
    );

    useEffect(() => {
        VehicleService.getVehicleOptions().then((vehicleFilterParams: VehicleOptionsDTO) => {
            setVehicleFiltersParams(vehicleFilterParams);
        });
    }, []);

    useEffect(() => {
        if (brand) {
            VehicleService.getVehicleModelsByBrand(brand).then((models: string[]) => {
                setVehicleFilterModelsParam(models);
            });
        } else {
            setVehicleFilterModelsParam([]);
        }
    }, [brand]);

    const renderSearchSelect = (
        searchLabel: string,
        value: string | undefined,
        setValue: (value: string | undefined) => void,
        allFilteringOptions: string[]
    ) => {
        return (
            <SearchSelect
                label={searchLabel}
                value={mapToOptionType(value)}
                onChange={(newValue: SingleValue<SearchSelectOption>) => {
                    setValue(newValue == null || newValue.value == null ? undefined : newValue.value);
                }}
                options={allFilteringOptions.map(mapToOptionType)}
            />
        );
    };

    const renderSearchMinMaxInput = (
        searchLabel: string,
        filteringValueMin: string | undefined,
        filteringValueMax: string | undefined,
        setFilteringValueMin: (value: string | undefined) => void,
        setFilteringValueMax: (value: string | undefined) => void
    ) => {
        return (
            <SearchMinMaxInput
                label={searchLabel}
                labelMin={TranslationService.translate('fromFilter')}
                labelMax={TranslationService.translate('toFilter')}
                minValue={filteringValueMin}
                maxValue={filteringValueMax}
                setMinValue={(newValue: string | undefined) => {
                    setFilteringValueMin(newValue);
                }}
                setMaxValue={(newValue: string | undefined) => {
                    setFilteringValueMax(newValue);
                }}
            />
        );
    };

    const getVehicleFilters = (): Map<FilteringParamsEnum, string | undefined> => {
        const vehicleFilters: Map<FilteringParamsEnum, string | undefined> = new Map<
            FilteringParamsEnum,
            string | undefined
        >();
        vehicleFilters.set(FilteringParamsEnum.BRAND_FIELD_FILTER, brand);
        vehicleFilters.set(FilteringParamsEnum.MODEL_FIELD_FILTER, model);
        vehicleFilters.set(FilteringParamsEnum.BODY_TYPE_FIELD_FILTER, bodyType);
        vehicleFilters.set(FilteringParamsEnum.COLOR_FIELD_FILTER, color);
        vehicleFilters.set(FilteringParamsEnum.DAILY_FEE_FROM_FILTER, minPrice);
        vehicleFilters.set(FilteringParamsEnum.DAILY_FEE_TO_FILTER, maxPrice);
        vehicleFilters.set(FilteringParamsEnum.SEATS_NUMBER_FROM_FILTER, minSeatsCount);
        vehicleFilters.set(FilteringParamsEnum.SEATS_NUMBER_TO_FILTER, maxSeatsCount);
        vehicleFilters.set(FilteringParamsEnum.DOORS_NUMBER_FROM_FILTER, minDoorsCount);
        vehicleFilters.set(FilteringParamsEnum.DOORS_NUMBER_TO_FILTER, maxDoorsCount);
        vehicleFilters.set(FilteringParamsEnum.PRODUCTION_YEAR_FROM_FILTER, minProductionYear);
        vehicleFilters.set(FilteringParamsEnum.PRODUCTION_YEAR_TO_FILTER, maxProductionYear);
        return vehicleFilters;
    };

    return (
        <div className="card shadow">
            <div id="search-filter-container" className="card-body">
                <form
                    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        handleFilterSubmit(event, getVehicleFilters());
                    }}
                >
                    {vehicleFiltersParams &&
                        renderSearchSelect(
                            TranslationService.translate('brandFilter'),
                            brand,
                            setBrand,
                            vehicleFiltersParams.brands
                        )}
                    {vehicleFiltersParams &&
                        renderSearchSelect(
                            TranslationService.translate('modelFilter'),
                            model,
                            setModel,
                            vehicleFilterModelsParam
                        )}
                    {vehicleFiltersParams &&
                        renderSearchSelect(
                            TranslationService.translate('bodyTypeFilter'),
                            bodyType,
                            setBodyType,
                            vehicleFiltersParams.bodyTypes
                        )}
                    {vehicleFiltersParams &&
                        renderSearchSelect(
                            TranslationService.translate('colorFilter'),
                            color,
                            setColor,
                            vehicleFiltersParams.colors
                        )}
                    {renderSearchMinMaxInput(
                        TranslationService.translate('priceFilter'),
                        minPrice,
                        maxPrice,
                        setMinPrice,
                        setMaxPrice
                    )}
                    {renderSearchMinMaxInput(
                        TranslationService.translate('seatsCountFilter'),
                        minSeatsCount,
                        maxSeatsCount,
                        setMinSeatsCount,
                        setMaxSeatsCount
                    )}
                    {renderSearchMinMaxInput(
                        TranslationService.translate('doorsCountFilter'),
                        minDoorsCount,
                        maxDoorsCount,
                        setMinDoorsCount,
                        setMaxDoorsCount
                    )}
                    {renderSearchMinMaxInput(
                        TranslationService.translate('productionYearFilter'),
                        minProductionYear,
                        maxProductionYear,
                        setMinProductionYear,
                        setMaxProductionYear
                    )}
                    <input
                        type="submit"
                        value={TranslationService.translate('search')}
                        className="btn btn-primary search-filter-submit-button"
                    />
                </form>
            </div>
        </div>
    );
}
