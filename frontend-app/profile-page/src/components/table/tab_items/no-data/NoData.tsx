import React from 'react';
import './NoData.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { TranslationService } from '@car-rental/shared/service';

export function NoData(): JSX.Element {
    return (
        <tbody>
            <tr>
                <td colSpan={100}>
                    <div className="no-data-container">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="no-data-magnifying-icon" />
                        <p className="no-data-no-results-found">{TranslationService.translate('noResultsFoundText')}</p>
                        <p className="no-data-adjust-filters">{TranslationService.translate('adjustFiltersText')}</p>
                    </div>
                </td>
            </tr>
        </tbody>
    );
}
