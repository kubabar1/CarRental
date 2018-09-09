import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../../static/css/main.css';
import '../../../../static/css/reservation_data.css';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class DataForm extends React.Component {

  constructor() {
    super();
    this.state = {
  		citylist:null,
      loaded:false,
      selected_city_data_form:null,
      reception_date_data_form:null,
      reception_hour_data_form:null,
      return_date_data_form:null,
      return_hour_data_form:null,
      selectedCar:null
    };
  }

  componentDidMount(){
  	fetch("http://localhost:8080/CarRental/carlistsearch/citylist")
  	.then(response=>{
  		response.json().then(json=>{
  			this.setState({citylist:json});
  		});
  	});

    this.setState({
      selected_city_data_form:this.props.selected_city,
      reception_date_data_form:this.props.reception_date,
      reception_hour_data_form:this.props.reception_hour,
      return_date_data_form:this.props.return_date,
      return_hour_data_form:this.props.return_hour,
      selectedCar:this.props.selectedCar
    });

    this.setState({loaded:true});
  };


  optionsCityList = city=>{
      return <option key={city} name={city} id={city} value={city}>{city}</option>;
  }

  getMinDate = () => {
    var today = new Date();
    var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
    var mm = tomorrow.getMonth() + 1;
    var dd = tomorrow.getDate();



    return  [tomorrow.getFullYear(),
              (mm>9 ? '' : '0') + mm,
              (dd>9 ? '' : '0') + dd
            ].join('-');
  };

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleCityInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const selectedCity = this.state.selected_city_data_form;

    if(selectedCity && (selectedCity!=value)){
      this.setState({
        selectedCar:null
      });
    }

    this.setState({
      selected_city_data_form:value
    });
  }

  renderForm = () => {

    const name = "Jan";
    const surname = "Kowalski";
    const phone = "423 645 765";
    const email = "jan@gmail.com";
    const citylist = this.state.citylist;

    const selected_city = this.state.selected_city_data_form;
    const selected_reception_date = this.state.reception_date_data_form;
    const selected_reception_hour = this.state.reception_hour_data_form;
    const selected_return_date = this.state.return_date_data_form;
    const selected_return_hour = this.state.return_hour_data_form;
    const selectedCar = this.state.selectedCar;

    return(
      <form>
        <div className="shadow card">
          <div className="card-header">
            <h1>Personal data:</h1>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Name:</label>
              <strong>{name}</strong>
            </div>
            <div className="form-group">
              <label>Surname:</label>
              <strong>{surname}</strong>
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <strong>{phone}</strong>
            </div>
            <div className="form-group">
              <label>E-mail:</label>
              <strong>{email}</strong>
            </div>
          </div>
        </div>


        <div className="shadow card mt-2">
          <div className="card-header">
            <h1>Rent data:</h1>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>City:</label>
              <select  id="selected_city_data_form" name="selected_city_data_form" value={selected_city} className="form-control" onChange={this.handleCityInputChange}>
                <option></option>
                {citylist ? citylist.map(this.optionsCityList) : <option value=""></option>}
              </select>
            </div>
            <div className="form-group">
              <label>Reception date:</label>
              <input type="date" id="reception_date_data_form" name="reception_date_data_form" min={this.getMinDate()} className="form-control" required value={selected_reception_date} onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
              <label>Reception hour:</label>
              <input type="time" id="reception_hour_data_form" name="reception_hour_data_form" className="form-control" required value={selected_reception_hour} onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
              <label>Return date:</label>
              <input type="date" id="return_date_data_form" name="return_date_data_form" min={this.getMinDate()} className="form-control" required value={selected_return_date} onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
              <label>Return hour:</label>
              <input type="time" id="return_hour_data_form" name="return_hour_data_form" className="form-control" required value={selected_return_hour} onChange={this.handleInputChange}/>
            </div>
            <div className="row">
              <Link to={"/CarRental/"} className="linkstyle btn btn-lg btn-secondary btn-block col-md-2 ml-5">Home</Link>
              <Link to={{
                pathname: "/CarRental/reservation/selectcar",
                state: {
          				selected_city:this.state.selected_city_data_form,
          				reception_date:this.state.reception_date_data_form,
          				reception_hour:this.state.reception_hour_data_form,
          				return_date:this.state.return_date_data_form,
          				return_hour:this.state.return_hour_data_form,
          				selectedCar:this.state.selectedCar
                }
              }} className="linkstyle btn btn-lg btn-primary btn-block  col-md-2 ml-auto mr-5">
                Next
              </Link>
            </div>
          </div>
        </div>
      </form>
    );
  }

	render () {
    const loaded = this.state.loaded;

		return (
      <div id="reservation-data-container" className="container col-md-6 offset-md-3 my-5 ">
        {loaded ? this.renderForm() :  <i className="fa fa-spinner fa-pulse fa-3x fa-fw "></i>}
      </div>
		)
	}

}

export default withRouter(DataForm);
