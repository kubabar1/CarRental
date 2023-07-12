import React from 'react';
import './Loading.scss';
import ClipLoader from 'react-spinners/ClipLoader';
import { TranslationService } from '@car-rental/shared/service';

export function Loading(): JSX.Element {
    return (
        <div className="table-loading-container">
            <ClipLoader size={50} />
            <p className="table-loading-data-message">{TranslationService.translate('loadingDataText')}</p>
        </div>
    );
}
