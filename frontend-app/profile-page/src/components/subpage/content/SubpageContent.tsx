import React from 'react';
import './SubpageContent.scss';

interface SubpageContentProperties {
    children?: React.ReactNode;
}

export function SubpageContent({ children }: SubpageContentProperties): JSX.Element {
    return <div className="subpage-content-container">{children}</div>;
}
