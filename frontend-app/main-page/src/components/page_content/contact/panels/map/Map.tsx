import React from 'react';
import './Map.scss';

interface MapProperties {
    lat: number;
    lng: number;
    text: string;
}

export function Map(props: MapProperties): JSX.Element {
    return <div>{props.text}</div>;
}
