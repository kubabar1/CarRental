import React, { ChangeEvent } from 'react';
import LocalisationResponseDTO from "../../../../../../../model/LocalisationResponseDTO";

interface CitySelectionProperties {
    localisations: LocalisationResponseDTO[] | null;
    setLocalisation: (localisationId: number) => void;
}

const optionsList = (city: LocalisationResponseDTO) => {
    return (
        <option id={city.id.toString()} key={city.id} value={city.id}>
            {city.city}
        </option>
    );
};

export function CitySelection(props: CitySelectionProperties) {
    const { localisations } = props;

    return (
        <div className="form-group">
            <label>City:</label>
            <select
                id="selected_city"
                name="selected_city"
                required
                className="form-control"
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    props.setLocalisation(parseInt(event.target.value))
                }
            >
                <option value="" />
                {localisations ? localisations.map(optionsList) : <option value="" />}
            </select>
        </div>
    );
}
