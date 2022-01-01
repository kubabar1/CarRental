import React from 'react';
import './SubpageContainer.scss';

interface SubpageContainerProperties {
    children?: React.ReactNode;
}

export function SubpageContainer({ children }: SubpageContainerProperties): JSX.Element {
    return <div className="col-md-9 pl-0 subpage-container">{children}</div>;
}
