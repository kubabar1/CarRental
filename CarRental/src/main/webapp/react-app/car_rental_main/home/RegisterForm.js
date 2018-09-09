import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import '../../../static/css/home.css';
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom'


class RegisterForm extends React.Component {

	constructor() {
		super();

		this.state = {
			citylist:null,
			selected_city:null,
			reception_date:null,
			reception_hour:null,
			return_date:null,
			return_hour:null,
			minReturnDate:null,
			maxReceptionDate:null
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

	getMinDate = () => {
		var today = new Date();
		var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
		var mm = tomorrow.getMonth() + 1;
		var dd = tomorrow.getDate();

		return [tomorrow.getFullYear(),
						(mm>9 ? '' : '0') + mm,
						(dd>9 ? '' : '0') + dd
				 	].join('-');
	};

	getMinDateReturn = () => {
		var today = new Date();
		var tomorrow = new Date(today.getTime() + (2*24 * 60 * 60 * 1000));
		var mm = tomorrow.getMonth() + 1;
		var dd = tomorrow.getDate();

		return [tomorrow.getFullYear(),
						(mm>9 ? '' : '0') + mm,
						(dd>9 ? '' : '0') + dd
				 	].join('-');

	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.history.push({
  		pathname: '/CarRental/reservation/data',
  		state: {
				selected_city:this.state.selected_city,
				reception_date:this.state.reception_date,
				reception_hour:this.state.reception_hour,
				return_date:this.state.return_date,
				return_hour:this.state.return_hour
			}
		});
	}

	handleInputChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		this.setState({
			[name]: value
		});
	}


	handleReceiptDateInputChange = (event) => {
		this.handleInputChange(event);

		const target = event.target;
		const value = target.value;

		const date = new Date(value);
		const next_day = new Date(date.getTime() + (24 * 60 * 60 * 1000));
		const mm = next_day.getMonth() + 1;
		const dd = next_day.getDate();

		const minReturnDate = [next_day.getFullYear(),(mm>9 ? '' : '0') + mm,(dd>9 ? '' : '0') + dd].join('-');

		this.setState({
			minReturnDate:minReturnDate
		});
	}

	handleReturnDateInputChange = (event) => {
		this.handleInputChange(event);

		const target = event.target;
		const value = target.value;

		const date = new Date(value);
		const next_day = new Date(date.getTime() - (24 * 60 * 60 * 1000));
		const mm = next_day.getMonth() + 1;
		const dd = next_day.getDate();

		const maxReceptionDate = [next_day.getFullYear(),(mm>9 ? '' : '0') + mm,(dd>9 ? '' : '0') + dd].join('-');

		console.log(maxReceptionDate);

		this.setState({
			maxReceptionDate:maxReceptionDate
		});
	}


	render () {
		const citylist = this.state.citylist;
		const minReturnDate = this.state.minReturnDate;
		const maxReceptionDate = this.state.maxReceptionDate;


		return (
      <div>
        <div id="car-rent-form-container" className="container col-xl-3 col-lg-4 col-md-5 col-sm-7 card card-body shadow mr-3">
            <form  onSubmit={this.handleSubmit}>
              <h3>Reserve car:</h3>
              <div className="form-group">
                <label>City:</label>
                <select id="selected_city" name="selected_city" required className="form-control" onChange={this.handleInputChange}>
                    <option value=""></option>
                    {citylist ? citylist.map(this.optionsList) : <option value=""></option>}
                </select>
              </div>
              <div className="form-group">
                <label>Reception date and hour:</label>
                <div className="input-group">
                  <input type="date" id="reception_date" name="reception_date" min={this.getMinDate()} max={maxReceptionDate ? maxReceptionDate : ""} className="form-control" required onChange={this.handleReceiptDateInputChange}/>
                  <input type="time" id="reception_hour" name="reception_hour" className="form-control" required onChange={this.handleInputChange}/>
                </div>
              </div>
              <div className="form-group">
                <label>Return date and hour:</label>
                <div className="input-group">
                  <input type="date" id="return_date" name="return_date" min={minReturnDate ? minReturnDate : this.getMinDateReturn()} className="form-control" required onChange={this.handleReturnDateInputChange}/>
                  <input type="time" id="return_hour" name="return_hour" className="form-control" required onChange={this.handleInputChange}/>
                </div>
              </div>
              <input type="submit" value="Reserve" className="btn btn-primary"/>
            </form>
          </div>
      </div>
		)
	}
}

export default withRouter(RegisterForm);
