import React from 'react';

export function optionsList(colour: string) {
    return (
        <option id={colour} key={colour} value={colour}>
            {colour}
        </option>
    );
};