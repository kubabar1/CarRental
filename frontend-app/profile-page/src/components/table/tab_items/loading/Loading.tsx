import React from 'react';
import './Loading.scss';
import ClipLoader from 'react-spinners/ClipLoader';

export function Loading(): JSX.Element {
    return (
        <div className="table-loading-container">
            <ClipLoader size={50} />
            <p className="table-loading-data-message">Loading data</p>
        </div>
    );
}
