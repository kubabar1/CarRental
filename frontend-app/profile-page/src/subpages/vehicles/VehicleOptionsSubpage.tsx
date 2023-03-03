import React, { useEffect, useState } from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Table } from '../../components/table/Table';
import { Column } from 'react-table';
import { deleteOption, getVehicleOptionsWithAssoc } from '../../service/VehicleService';
import { OnChangeValue } from 'react-select/dist/declarations/src/types';
import Select from 'react-select';
import './VehicleOptionsSubpage.scss';
import { VehicleOptionsWithAssocCountDTO } from '../../model/VehicleOptionsWithAssocCountDTO';
import { ButtonTableItem } from '../../components/table/tab_items/ButtonTableItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AssocDetailsDTO } from '../../model/AssocDetailsDTO';
import { ModelAssocDetailsDTO } from '../../model/ModelAssocDetailsDTO';

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

export function VehicleOptionsSubpage(): JSX.Element {
    const [vehicleOptions, setVehicleOptions] = useState<VehicleOptionsWithAssocCountDTO | undefined>(undefined);
    const [selectedOption, setSelectedOption] = useState<OptionType>(OptionType.BRANDS);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

    const loadVehicleOptions = (): void => {
        getVehicleOptionsWithAssoc().then((vehicleDefaultParams: VehicleOptionsWithAssocCountDTO) => {
            setVehicleOptions({ ...vehicleDefaultParams });
        });
    };

    const translateOptionTypeHeader = (option: OptionType): string => {
        const translations: Record<OptionType, string> = {
            brands: 'Brands',
            models: 'Models',
            bodyTypes: 'Body types',
            fuelTypes: 'Fuel types',
            colors: 'Colors',
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

    useEffect(() => {
        loadVehicleOptions();
    }, []);

    useEffect(() => {
        setSelectedBrand(null);
    }, [selectedOption]);

    const columns = React.useMemo<Column<VehicleOption>[]>(
        () => [
            {
                Header: 'Options',
                accessor: 'value',
            },
            {
                Header: 'Actions',
                accessor: (vehicleOption: VehicleOption) => {
                    return (
                        <ButtonTableItem
                            buttonText={<FontAwesomeIcon icon={faTrash} />}
                            onClickAction={() => {
                                console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL');
                                console.log(selectedOption);
                                deleteOption(getDeleteUrlForVehicleOption(selectedOption), vehicleOption.value).then(
                                    () => {
                                        loadVehicleOptions();
                                    }
                                );
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
            },
        ],
        [selectedOption]
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'Vehicle options'} />
            <SubpageContent>
                <div className="select-vehicle-option-container row">
                    <label className="ml-5 mt-4 col-md-2">{'Option:'}</label>
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
                        <label className="ml-5 mt-4 col-md-2">{'Brand:'}</label>
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
                    <Table<VehicleOption>
                        tableContainerClassName={'vehicle-option-table-container'}
                        columns={columns}
                        data={(selectedOption === OptionType.MODELS
                            ? vehicleOptions.models.filter((m: ModelAssocDetailsDTO) => m.brand === selectedBrand)
                            : vehicleOptions[selectedOption]
                        ).map((v: AssocDetailsDTO) => {
                            return { value: v.name, count: v.count };
                        })}
                    />
                )}
            </SubpageContent>
        </SubpageContainer>
    );
}
