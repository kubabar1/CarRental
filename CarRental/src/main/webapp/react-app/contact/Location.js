import * as React from "react";
import {PropTypes} from "react"
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/contact.css';
import GoogleMap from "react-google-map"

export class Location extends React.Component {

  render() {

    const Map = (googleMaps) => (
      <div>
        <GoogleMap
          zoom={8}
          center={{lat: 52.226126, lng:21.0110623}}
        />
      </div>
    )

    Map.propTypes = {
      googleMaps: PropTypes.object.isRequired,
    }

     return(
      <div>
        <Map/>
      </div>
     );
  }

}
