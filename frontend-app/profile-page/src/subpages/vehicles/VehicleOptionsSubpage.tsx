import React, { useEffect, useState } from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Table } from '../../components/table/Table';
import { Column } from 'react-table';
import { TranslationService, VehicleService } from '@car-rental/shared/service';
import { OnChangeValue } from 'react-select/dist/declarations/src/types';
import Select from 'react-select';
import './VehicleOptionsSubpage.scss';
import { ButtonTableItem } from '../../components/table/tab_items/button_table_item/ButtonTableItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AssocDetailsDTO, ModelAssocDetailsDTO, VehicleOptionsWithAssocCountDTO } from '@car-rental/shared/model';

enum OptionType {
    BRANDS = 'brands',
    MODELS = 'models',
    BODYTYPES = 'bodyTypes',
    FUELTYPES = 'fuelTypes',
    COLORS = 'colors',
}

type VehicleOption = {
    value: string;
    count: number;
};

type OptionSelectType = { value: OptionType; label: string };

type BrandSelectType = { value: string | null; label: string | null };

export interface VehicleOptionExt extends VehicleOption {
    id: string;
}

export function VehicleOptionsSubpage(): JSX.Element {
    const [vehicleOptions, setVehicleOptions] = useState<VehicleOptionsWithAssocCountDTO | undefined>(undefined);
    const [selectedOption, setSelectedOption] = useState<OptionType>(OptionType.BRANDS);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

    const translateOptionTypeHeader = (option: OptionType): string => {
        const translations: Record<OptionType, string> = {
            brands: TranslationService.translate('brandVehicleOptionTypeHeader'),
            models: TranslationService.translate('modelVehicleOptionTypeHeader'),
            bodyTypes: TranslationService.translate('bodyTypeVehicleOptionTypeHeader'),
            fuelTypes: TranslationService.translate('fuelTypeVehicleOptionTypeHeader'),
            colors: TranslationService.translate('colorVehicleOptionTypeHeader'),
        };
        return translations[option];
    };

    const getDeleteUrlForVehicleOption = (option: OptionType): string => {
        const deleteUrls: Record<OptionType, string> = {
            brands: 'brand',
            models: 'model',
            bodyTypes: 'body-type',
            fuelTypes: 'fuel-type',
            colors: 'color',
        };
        return deleteUrls[option];
    };

    const mapToVehicleOption = (val: OptionType): OptionSelectType => {
        return {
            value: val,
            label: translateOptionTypeHeader(val),
        };
    };

    const fetchData = React.useCallback((): Promise<void> => {
        return VehicleService.getVehicleOptionsWithAssoc().then(
            (vehicleDefaultParams: VehicleOptionsWithAssocCountDTO) => {
                setVehicleOptions({ ...vehicleDefaultParams });
            }
        );
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        setSelectedBrand(null);
    }, [selectedOption]);

    const columns = React.useMemo<Column<VehicleOptionExt>[]>(
        () => [
            {
                id: 'options',
                Header: TranslationService.translate('optionsVehicleOptionsSubpageLabel'),
                accessor: 'value',
                disableFilters: true,
                disableSortBy: true,
            },
            {
                id: 'actions',
                Header: TranslationService.translate('actionsVehicleOptionsSubpageLabel'),
                accessor: (vehicleOption: VehicleOptionExt) => {
                    return (
                        <ButtonTableItem
                            buttonText={<FontAwesomeIcon icon={faTrash} />}
                            onClickAction={() => {
                                VehicleService.deleteOption(
                                    getDeleteUrlForVehicleOption(selectedOption),
                                    vehicleOption.value
                                ).then(() => {
                                    fetchData();
                                });
                            }}
                            buttonVariant={'danger'}
                            tooltipMessage={
                                vehicleOption.count > 0
                                    ? `Cannot remove - ${vehicleOption.count} associated ${
                                          vehicleOption.count > 1 ? 'vehicles' : 'vehicle'
                                      } found`
                                    : 'Delete'
                            }
                            isDisabled={vehicleOption.count > 0}
                        />
                    );
                },
                disableFilters: true,
                disableSortBy: true,
            },
        ],
        [selectedOption, fetchData]
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={TranslationService.translate('vehicleOptionsSubpageTitle')} />
            <SubpageContent>
                <div className="select-vehicle-option-container row">
                    <label className="ml-5 mt-4 col-md-2">
                        {TranslationService.translate('vehicleOptionsSubpageOptionLabel')}
                    </label>
                    <Select<OptionSelectType>
                        className={'ml-4 mt-3 col-md-8'}
                        options={Object.keys(OptionType).map((v: string) => {
                            return mapToVehicleOption(OptionType[v as keyof typeof OptionType]);
                        })}
                        value={mapToVehicleOption(selectedOption)}
                        onChange={(val: OnChangeValue<OptionSelectType, false>) => {
                            if (val != null) {
                                setSelectedOption(val.value);
                            }
                        }}
                    />
                </div>
                {vehicleOptions && selectedOption === OptionType.MODELS && (
                    <div className="select-vehicle-option-container row">
                        <label className="ml-5 mt-4 col-md-2">
                            {TranslationService.translate('vehicleBrandSubpageOptionLabel')}
                        </label>
                        <Select<BrandSelectType>
                            className={'ml-4 mt-3 col-md-8'}
                            options={vehicleOptions.brands.map((o) => {
                                return {
                                    value: o.name,
                                    label: o.name,
                                };
                            })}
                            value={{ value: selectedBrand, label: selectedBrand }}
                            onChange={(val: OnChangeValue<BrandSelectType, false>) => {
                                if (val != null) {
                                    setSelectedBrand(val.value);
                                } else {
                                    setSelectedBrand(null);
                                }
                            }}
                        />
                    </div>
                )}
                {vehicleOptions && (
                    <Table<VehicleOptionExt>
                        tableContainerClassName={'vehicle-option-table-container'}
                        columns={columns}
                        data={(selectedOption === OptionType.MODELS
                            ? vehicleOptions.models.filter((m: ModelAssocDetailsDTO) => m.brand === selectedBrand)
                            : vehicleOptions[selectedOption]
                        ).map((v: AssocDetailsDTO) => {
                            return { id: v.name, value: v.name, count: v.count };
                        })}
                        fetchData={fetchData}
                    />
                )}
            </SubpageContent>
        </SubpageContainer>
    );
}
