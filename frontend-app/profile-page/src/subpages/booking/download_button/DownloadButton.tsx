import React from 'react';
import { Button } from 'react-bootstrap';
import './DownloadButton.scss';

export const DownloadButton = (): JSX.Element => {
    return (
        <div className={'download-file-container'}>
            <Button>Download file</Button>
        </div>
    );
};
