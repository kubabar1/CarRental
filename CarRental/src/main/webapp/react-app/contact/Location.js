import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/contact.css';
import GoogleMapReact from 'google-map-react';
import {Map} from './Map.js';

export class Location extends React.Component {
  static defaultProps = {
    center: {
      lat: 52.23,
      lng: 21.01
    },
    zoom: 11
  };

  render() {
    return (
      <div style={{ height: '500px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Map
            lat={52.230774}
            lng={21.006348}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
