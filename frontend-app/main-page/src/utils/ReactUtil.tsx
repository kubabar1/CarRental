import React from 'react';

export function optionsList(colour: string): JSX.Element {
    return (
        <option id={colour} key={colour} value={colour}>
            {colour}
        </option>
    );
}
