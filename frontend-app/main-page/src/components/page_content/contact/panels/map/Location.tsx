import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Map } from './Map';

export function Location() {
    const defaultProps = {
        center: {
            lat: 52.23,
            lng: 21.01,
        },
        zoom: 11,
    };

    return (
        <div style={{ height: '500px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: '' }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <Map lat={52.230774} lng={21.006348} text={''} />
            </GoogleMapReact>
        </div>
    );
}
