import ClipLoader from 'react-spinners/ClipLoader';
import React from 'react';
import './LoaderContainer.scss';

export interface LoaderContainerInterface {
    dataArrayLength: number;
    isLoaded: boolean;
    containerClass?: string;
    noDataMessage?: string;
    noDataMessageClass?: string;
    children?: JSX.Element | JSX.Element[] | string | string[];
}

export function LoaderContainer(props: LoaderContainerInterface): JSX.Element {
    return props.isLoaded ? (
        props.dataArrayLength ? (
            <div id={props.containerClass}>{props.children}</div>
        ) : (
            <div
                className={props.noDataMessageClass ? props.noDataMessageClass : 'search-result-none alert alert-info'}
            >
                {props.noDataMessage ? props.noDataMessage : 'No data with the given parameters found'}
            </div>
        )
    ) : (
        <ClipLoader size={50} />
    );
}
