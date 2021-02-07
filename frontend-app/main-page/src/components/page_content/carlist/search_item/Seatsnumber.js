import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

export class Seatsnumber extends React.Component {

  constructor() {
  	super();
  }

	render () {
		return (
      <div className="form-group">
        <label>Liczba miejsc:</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">od</span>
          </div>
          <input key="placesNumberFrom" name="placesNumberFrom" id="placesNumberFrom" type="text" className="form-control" onChange={this.props.handleInputChange}/>

          <div className="input-group-prepend">
            <span className="input-group-text">do</span>
          </div>
          <input key="placesNumberTo" name="placesNumberTo" id="placesNumberTo" type="text" className="form-control" onChange={this.props.handleInputChange}/>
        </div>
      </div>
		)
	}

}
