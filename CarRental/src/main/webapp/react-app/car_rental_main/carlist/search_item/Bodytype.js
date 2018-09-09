import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

export class Bodytype extends React.Component {

	constructor() {
		super();

		this.state = {
			bodytypelist:null
		};
	}

	componentDidMount(){
		fetch("http://localhost:8080/CarRental/carlistsearch/bodytypelist")
		.then(response=>{
			response.json().then(json=>{
				this.setState({bodytypelist:json});
			});
		});

	};

  optionsList = bodytype=>{
      return <option key={bodytype} name={bodytype} id={bodytype} value={bodytype}>{bodytype}</option>;
  }

	render () {
		const bodytypelist = this.state.bodytypelist;

		return (
      <div className="form-group">
        <label>Typ nadwozia:</label>
        <select  key="bodytype" name="bodytype" id="bodytype" className="form-control" value={this.props.bodytype || ""} onChange={this.props.handleInputChange}>
          <option value=""></option>
          {bodytypelist ? bodytypelist.map(this.optionsList) : <option value=""></option>}
        </select>
      </div>
		)
	}

}
