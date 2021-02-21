import React from 'react';
import LocalisationResponseDTO from '../../../../../../model/LocalisationResponseDTO';

interface CitySelectionProps {
    selectedLocalisationId?: string;
    localisations: LocalisationResponseDTO[];
    setLocalisation: (localisationId: string) => void;
}

export function CitySelection(props: CitySelectionProps): JSX.Element {
    const { localisations, selectedLocalisationId } = props;

    const optionsList = (city: LocalisationResponseDTO): JSX.Element => {
        return (
            <option id={city.id.toString()} key={city.id} value={city.id}>
                {city.city}
            </option>
        );
    };

    return (
        <div className="form-group">
            <label>City:</label>
            <select
                id="selected_city"
                name="selected_city"
                required
                className="form-control"
                value={selectedLocalisationId ? selectedLocalisationId.toString() : ''}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => props.setLocalisation(event.target.value)}
            >
                <option value="" />
                {localisations ? localisations.map(optionsList) : <option value="" />}
            </select>
        </div>
    );
}
