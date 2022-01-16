import { Button } from 'react-bootstrap';
import React from 'react';
import './ButtonTableItem.scss';
import { useHistory } from 'react-router-dom';

export function ButtonTableItem(
    buttonText: string,
    buttonRedirectPath?: string,
    buttonVariant = 'success',
    onClickAction?: () => void
): JSX.Element {
    const history = useHistory();

    return (
        <div className="button-table-item">
            <Button
                variant={buttonVariant}
                onClick={() => {
                    if (onClickAction) {
                        onClickAction();
                    }
                    if (buttonRedirectPath) {
                        history.push(buttonRedirectPath);
                    }
                }}
            >
                {buttonText}
            </Button>
        </div>
    );
}
