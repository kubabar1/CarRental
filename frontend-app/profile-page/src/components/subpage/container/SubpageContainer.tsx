import React from 'react';
import './SubpageContainer.scss';

interface SubpageContainerProperties {
    children?: React.ReactNode;
}

export function SubpageContainer({ children }: SubpageContainerProperties): JSX.Element {
    return <div className="col-md-8 col-lg-9 col-xl-10 pl-0 subpage-container">{children}</div>;
}
