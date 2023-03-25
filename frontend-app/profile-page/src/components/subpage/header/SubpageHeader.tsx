import React from 'react';
import './SubpageHeader.scss';

interface SubpageHeaderProperties {
    title: string;
}

export function SubpageHeader({ title }: SubpageHeaderProperties): JSX.Element {
    return (
        <div className="subpage-header card">
            <div className="card-header text-center">
                <strong>{title}</strong>
            </div>
        </div>
    );
}
