import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

export class Model extends React.Component {

  optionsList = model=>{
      return <option key={model} name={model} id={model} value={model}>{model}</option>;
  }

	render () {

		const modellist = this.props.modellist;

		return (
      <div className="form-group">
        <label >Model:</label>
        <select  key="model" name="model" id="model" className="form-control" value={this.props.model || ""} onChange={this.props.handleInputChange}>
          <option value=""></option>
          {modellist ? modellist.map(this.optionsList) : <option value=""></option>}
        </select>
      </div>
		)
	}

}
