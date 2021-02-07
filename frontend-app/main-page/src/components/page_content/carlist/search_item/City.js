import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

export class City extends React.Component {

	constructor() {
		super();

		this.state = {
			cityList:null
		};
	}

	componentDidMount(){
		fetch("http://localhost:8080/CarRental/carlistsearch/citylist")
		.then(response=>{
			response.json().then(json=>{
				this.setState({citylist:json});
			});
		});

	};

  optionsList = city=>{
      return <option key={city} name={city} id={city} value={city}>{city}</option>;
  }

	render () {
		const citylist = this.state.citylist;

		return (
      <div className="form-group">
        <label>Miasto:</label>
        <select  key="city" name="city" id="city" className="form-control" value={this.props.city || ""} onChange={this.props.handleInputChange}>
          <option value=""></option>
          {citylist ? citylist.map(this.optionsList) : <option value=""></option>}
        </select>
      </div>
		)
	}

}
