import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

interface DownloadAppLinkProps {
    shopName: string;
    shopLink: string;
    shopIcon: IconDefinition;
}

export function DownloadAppLink({ shopName, shopIcon, shopLink }: DownloadAppLinkProps) {
    return (
        <a className="download-app-link" href={shopLink} target="_blank" rel="noreferrer">
            <div className="download-app-link-icon">
                <FontAwesomeIcon icon={shopIcon} />
            </div>
            <div className="download-app-link-text">
                <div className="download-app-link-download-on-text">Download on the</div>
                <div className="download-app-link-shop-name">{shopName}</div>
            </div>
        </a>
    );
}
