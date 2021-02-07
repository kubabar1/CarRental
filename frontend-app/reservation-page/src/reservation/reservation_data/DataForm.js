import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../../main/static/css/main.css';
import '../../../../main/static/css/reservation_data.css';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class DataForm extends React.Component {

  constructor() {
    super();
    this.state = {
  		cityList:null,
      loaded:false,
      selected_city_data_form:null,
      reception_date_data_form:null,
      reception_hour_data_form:null,
      return_date_data_form:null,
      return_hour_data_form:null,
      selectedCar:null,
      inputError:false,
			minReturnDate:null,
			maxReceptionDate:null,
      userName:null,
      userSurname:null,
      userPhone:null,
      userEmail:null
    };
  }

  componentDidMount(){

  		fetch("http://localhost:8080/CarRental/locations")
      .then(response=>{
        response.json().then(json=>{
          this.setState({citylist:json});
        });
      });

    this.setState({
      selected_city_data_form:this.props.selectedCity,
      reception_date_data_form:this.props.receptionDate,
      reception_hour_data_form:this.props.receptionHour,
      return_date_data_form:this.props.returnDate,
      return_hour_data_form:this.props.returnHour,
      selectedCar:this.props.selectedCar
    });

    const url2="http://localhost:8080/CarRental/userdata/all";

    fetch(url2)
    .then(response => response.json())
    .then(data => {
        this.setState({
          userName:data.name,
          userSurname:data.surname,
          userPhone:data.phone,
          userEmail:data.email,
          loaded:true
        });
    }).catch(error => {})
  };


  optionsCityList = city=>{
      return <option key={city.id} name={city.city+"_"+city.id} id={city.city+"_"+city.id} value={city.id}>{city.city}</option>;
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


  onClickNext = (event) => {
    event.preventDefault();

    const validationData = this.validateData();
    const inputError = this.state.inputError;

    if(validationData){
      this.props.history.push({
        pathname: "/CarRental/reservation/selectcar",
        state: {
          selectedCity:this.state.selected_city_data_form,
          receptionDate:this.state.reception_date_data_form,
          receptionHour:this.state.reception_hour_data_form,
          returnDate:this.state.return_date_data_form,
          returnHour:this.state.return_hour_data_form,
          selectedCar:this.state.selectedCar
        }
      })
      this.setState({inputError:false});
    }else{
      this.setState({inputError:true});
    }

  }

  validateData = () => {
    const reception_date=this.state.reception_date_data_form;
    const reception_hour=this.state.reception_hour_data_form;
    const return_date=this.state.return_date_data_form;
    const return_hour=this.state.return_hour_data_form;
    const selected_city=this.state.selected_city_data_form;

    var test=true;

    if(reception_date==null || reception_hour==null || return_date==null || return_hour==null || selected_city==null){
      test = false;
    }

    if(reception_date=="" || reception_hour=="" || return_date=="" || return_hour=="" || selected_city==""){
      test = false;
    }

    var d1 = new Date(reception_date);
    var d2 = new Date(return_date);
    var d1time = d1.getTime();
    var d2time = d2.getTime();

    if(d1time>=d2time){
      test = false;
    }

    return test;


  }

  renderForm = () => {
    const minReturnDate = this.state.minReturnDate;
    const maxReceptionDate = this.state.maxReceptionDate;

    const name = this.state.userName;
    const surname = this.state.userSurname;
    const phone = this.state.userPhone;
    const email = this.state.userEmail;
    const citylist = this.state.citylist;

    const selected_city = this.state.selected_city_data_form;
    const selected_reception_date = this.state.reception_date_data_form;
    const selected_reception_hour = this.state.reception_hour_data_form;
    const selected_return_date = this.state.return_date_data_form;
    const selected_return_hour = this.state.return_hour_data_form;
    const selectedCar = this.state.selectedCar;

    const inputError = this.state.inputError;

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
              <input type="date" id="reception_date_data_form" name="reception_date_data_form" min={this.getMinDate()} max={maxReceptionDate ? maxReceptionDate : ""} className="form-control" onChange={this.handleReceiptDateInputChange} className="form-control" required value={selected_reception_date} />
            </div>
            <div className="form-group">
              <label>Reception hour:</label>
              <input type="time" id="reception_hour_data_form" name="reception_hour_data_form" className="form-control" required value={selected_reception_hour} onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
              <label>Return date:</label>
              <input type="date" id="return_date_data_form" name="return_date_data_form" min={minReturnDate ? minReturnDate : this.getMinDateReturn()} className="form-control" onChange={this.handleReturnDateInputChange} className="form-control" required value={selected_return_date} />
            </div>
            <div className="form-group">
              <label>Return hour:</label>
              <input type="time" id="return_hour_data_form" name="return_hour_data_form" className="form-control" required value={selected_return_hour} onChange={this.handleInputChange}/>
            </div>


            {inputError ? [
              <div key="input_Error" className="alert alert-danger my-4">
                Fill all fields with valid values.
              </div>
              ] : ""
            }

            <div className="row">
              <Link to={"/CarRental/"} className="linkstyle btn btn-lg btn-secondary btn-block col-md-2 ml-5">Home</Link>
              <button className="btn btn-lg btn-primary btn-block  col-md-2 ml-auto mr-5" onClick={this.onClickNext}>Next</button>
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
