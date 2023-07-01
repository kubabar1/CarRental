import { FilteringParamsEnum } from '@car-rental/shared/model';
import qs from 'qs';

export const getPageFromUrl = (url: string): number => {
    return parseInt(qs.parse(url, { ignoreQueryPrefix: true }).page as string) || 0;
};

export const getCountFromUrl = (url: string): number => {
    return parseInt(qs.parse(url, { ignoreQueryPrefix: true }).count as string) || 0;
};

export const getVehicleFilteringParamsFromUrl = (locationSearch: string): Map<FilteringParamsEnum, string> => {
    return Object.keys(FilteringParamsEnum).reduce<Map<FilteringParamsEnum, string>>(
        (map: Map<FilteringParamsEnum, string>, paramKey: string) => {
            const filteringParam: FilteringParamsEnum =
                FilteringParamsEnum[paramKey as keyof typeof FilteringParamsEnum];
            const value: string = qs.parse(locationSearch, { ignoreQueryPrefix: true })[filteringParam] as string;
            if (value != undefined) {
                map.set(filteringParam, value);
            }
            return map;
        },
        new Map<FilteringParamsEnum, string>()
    );
};
