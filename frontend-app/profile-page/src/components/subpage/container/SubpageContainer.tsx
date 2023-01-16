import React from 'react';
import './SubpageContainer.scss';

interface SubpageContainerProperties {
    className?: string;
    children?: React.ReactNode;
}

export function SubpageContainer({ className, children }: SubpageContainerProperties): JSX.Element {
    return (
        <div className={`"col-md-8 col-lg-9 col-xl-10 pl-0 subpage-container"${className ? ` ${className}` : ''}`}>
            {children}
        </div>
    );
}
