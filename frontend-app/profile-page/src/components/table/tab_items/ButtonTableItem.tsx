import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import React from 'react';
import './ButtonTableItem.scss';
import { useHistory } from 'react-router-dom';
import { LocationState } from 'history';
import { OverlayInjectedProps } from 'react-bootstrap/Overlay';

export interface ButtonTableItemProps {
    buttonText: string | React.ReactNode;
    buttonRedirectPath?: string;
    buttonVariant?: string;
    buttonRedirectState?: LocationState;
    onClickAction?: () => void;
    tooltipMessage?: string;
}

export function ButtonTableItem({
    buttonText,
    buttonRedirectPath,
    buttonVariant = 'success',
    buttonRedirectState,
    onClickAction,
    tooltipMessage,
}: ButtonTableItemProps): JSX.Element {
    const history = useHistory();

    const renderTooltip = (props: OverlayInjectedProps) => <Tooltip {...props}>{tooltipMessage}</Tooltip>;

    const renderTableButton = (): JSX.Element => (
        <Button
            variant={buttonVariant}
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
                    {renderTableButton()}
                </OverlayTrigger>
            ) : (
                <div>{renderTableButton()}</div>
            )}
        </div>
    );
}
