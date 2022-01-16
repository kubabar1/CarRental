import React from 'react';
import { Button } from 'react-bootstrap';
import './GenerateReport.scss';

export const GenerateReport = (): JSX.Element => {
    return (
        <div className={'download-file-container'}>
            <Button>Generate report</Button>
        </div>
    );
};
