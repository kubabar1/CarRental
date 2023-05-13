import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import React from 'react';
import './ButtonTableItem.scss';
import { useHistory } from 'react-router-dom';
import { LocationState } from 'history';
import { OverlayInjectedProps } from 'react-bootstrap/Overlay';
import { Variant } from 'react-bootstrap/types';

export interface ButtonTableItemProps {
    buttonText: string | React.ReactNode;
    buttonRedirectPath?: string;
    buttonVariant?: Variant;
    buttonRedirectState?: LocationState;
    onClickAction?: () => void;
    tooltipMessage?: string;
    isDisabled?: boolean;
}

export function ButtonTableItem({
    buttonText,
    buttonRedirectPath,
    buttonVariant = 'success',
    buttonRedirectState,
    onClickAction,
    tooltipMessage,
    isDisabled = false,
}: ButtonTableItemProps): JSX.Element {
    const history = useHistory();

    const renderTooltip = (props: OverlayInjectedProps) => <Tooltip {...props}>{tooltipMessage}</Tooltip>;

    const renderTableButton = (): JSX.Element => (
        <Button
            disabled={isDisabled}
            variant={buttonVariant}
            className={isDisabled ? 'disabled-table-button' : 'table-button'}
            onClick={() => {
                if (onClickAction) {
                    onClickAction();
                }
                if (buttonRedirectPath) {
                    history.push(buttonRedirectPath, buttonRedirectState);
                }
            }}
        >
            {buttonText}
        </Button>
    );

    return (
        <div className="button-table-item">
            {tooltipMessage ? (
                <OverlayTrigger placement="top" overlay={renderTooltip}>
                    <div style={{ display: 'inline-block', cursor: 'not-allowed' }}>{renderTableButton()}</div>
                </OverlayTrigger>
            ) : (
                <div>{renderTableButton()}</div>
            )}
        </div>
    );
}
