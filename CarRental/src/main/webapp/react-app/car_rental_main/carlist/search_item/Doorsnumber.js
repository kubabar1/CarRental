import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

export class Doorsnumber extends React.Component {

  constructor() {
  	super();
  }

	render () {
		return (
      <div className="form-group">
        <label>Liczba drzwi:</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">od</span>
          </div>
          <input key="doorsNumberFrom" name="doorsNumberFrom" id="doorsNumberFrom" type="text" className="form-control" onChange={this.props.handleInputChange}/>

          <div className="input-group-prepend">
            <span className="input-group-text">do</span>
          </div>
          <input key="doorsNumberTo" name="doorsNumberTo" id="doorsNumberTo" type="text" className="form-control" onChange={this.props.handleInputChange}/>
        </div>
      </div>
		)
	}

}
