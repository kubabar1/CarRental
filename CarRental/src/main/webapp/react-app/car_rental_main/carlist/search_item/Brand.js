import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

export class Brand extends React.Component {

	constructor() {
		super();

		this.state = {
			brandlist:null
		};
	}

	componentDidMount(){
		fetch("http://localhost:8080/CarRental/carlistsearch/brandlist")
		.then(response=>{
			response.json().then(json=>{
				this.setState({brandlist:json});
			});
		});

	};

  optionsList = brandlt=>{
      const brand = brandlt;

      return <option key={brand} name={brand} id={brand} value={brand}>{brand}</option>;
  }




	render () {

		const brandlist = this.state.brandlist;

		return (
      <div className="form-group">
        <label >Marka:</label>
        <select  key="brand" name="brand" id="brand" className="form-control" value={this.props.brand || ""} onChange={this.props.handleInputChange}>
          <option value=""></option>
          {brandlist ? brandlist.map(this.optionsList) : <option value=""></option>}
        </select>
      </div>
		)
	}

}
