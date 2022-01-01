import React from 'react';

interface SubpageHeaderProperties {
    title: string;
}

export function SubpageHeader({ title }: SubpageHeaderProperties): JSX.Element {
    return (
        <div className="card">
            <div className="card-header text-center">
                <strong>{title}</strong>
            </div>
        </div>
    );
}
