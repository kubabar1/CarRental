import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../../main/static/css/main.css';
import '../../../../main/static/css/reservation_data.css';
import {Logo} from '../Logo.js';
import {ReservationStep} from '../ReservationStep.js';
import { Link } from 'react-router-dom'


export class ReservationConfirm extends React.Component {

	constructor() {
    super();
    this.state = {
			user_id:null,
      step:3,
      name:null,
      surname:null,
      phone:null,
      email:null,
      brand:null,
      model:null,
      dailyFee:null,

      selected_city:null,
      reception_date:null,
      reception_hour:null,
      return_date:null,
      return_hour:null,
			selectedCar:null,
			fullCost:null,

			selected_city_name:null,

      loaded:false
    };
  }

	componentDidMount(){
		fetch("http://localhost:8080/CarRental/carlist/allcars")
		.then(response=>{
			response.json().then(json=>{
				this.setState({carlist:json});
			});
		});

		const url="http://localhost:8080/CarRental/carlist/"+this.props.location.state.selectedCar;


    fetch(url)
    .then(response=>{
      response.json().then(json=>{
        this.setState({
					brand:json.brand,
					model:json.model,
					dailyFee:json.dailyFee
				});
      });
    });

		const url2="http://localhost:8080/CarRental/userdata/all";

    fetch(url2)
    .then(response => response.json())
    .then(data => {
        this.setState({
					user_id:data.id,
          name:data.name,
          surname:data.surname,
          phone:data.phone,
          email:data.email,
					selected_city:this.props.location.state.selected_city,
					reception_date:this.props.location.state.reception_date,
					reception_hour:this.props.location.state.reception_hour,
					return_date:this.props.location.state.return_date,
					return_hour:this.props.location.state.return_hour,
					selectedCar:this.props.location.state.selectedCar
        });
				this.countCost(data.id);
    }).catch(error => {})

		fetch("http://localhost:8080/CarRental/locations/"+this.props.location.state.selected_city)
		.then(response=>{
			response.json().then(json=>{
				this.setState({selected_city_name:json.city});
			});
		});



		this.setState({loaded:true});
	};

	createBookingWrapper = (userId) => {
		const item = {};

		item['userId']=userId;
		item['vehicleId']=this.props.location.state.selectedCar;
		item['locationId']=this.props.location.state.selected_city;
		item['receiptDate']=this.props.location.state.reception_date+" "+this.props.location.state.reception_hour+":00";
		item['returnDate']=this.props.location.state.return_date+" "+this.props.location.state.return_hour+":00";
		item['bookingStateCode']='RES';
		item['rentingEmployee']=null;
		item['totalCost']=this.state.fullCost;

		return item;
	}

	countCost = (userId) => {
		const bookingWrapper = JSON.stringify(this.createBookingWrapper(userId));

		const url = 'http://localhost:8080/CarRental/booking/cost';


		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: bookingWrapper
		}).then(response => response.json())
		.then(json => {this.setState({fullCost:json.fullCost})})
		.catch(error => {});
	}

	addBooking = () => {
			const bookingWrapper = JSON.stringify(this.createBookingWrapper(this.state.user_id));
			const url = 'http://localhost:8080/CarRental/booking/reserve';


			fetch(url, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: bookingWrapper
			})
			.catch(error => {});

	}

	onClickNext = (event) => {
		event.preventDefault();

		this.addBooking();

		this.props.history.push({
			pathname: "/CarRental/reservation/succeed"
		})
	}

	render () {
    const name=this.state.name;
    const surname=this.state.surname;
    const phone = this.state.phone;
    const email = this.state.email;
    const city = this.state.selected_city;
    const receptionDate = this.state.reception_date;
    const receptionHour = this.state.reception_hour;
    const returnDate = this.state.return_date;
    const returnHour = this.state.return_hour;
    const brand = this.state.brand;
    const model = this.state.model;
    const dailyFee = this.state.dailyFee;
		const selected_city_name = this.state.selected_city_name;


		const fullCost = this.state.fullCost;

		const loaded = this.state.loaded;

		if(loaded && fullCost==null){
		}

		return (
      <main>
        <Logo/>
        <ReservationStep step={3}/>
        <div id="reservation-data-container" className="container col-md-6 offset-md-3 my-5 ">
          <form>
            <div className="shadow card">
              <div className="card-header">
                <h1>Confirm reservation</h1>
              </div>
              <div className="card-body">

                <div className="form-group">
                  <label>Name: </label>
                  <strong> {name}</strong>
                </div>

                <div className="form-group">
                  <label>Surname: </label>
                  <strong> {surname}</strong>
                </div>

                <div className="form-group">
                  <label>Phone: </label>
                  <strong> {phone}</strong>
                </div>

                <div className="form-group">
                  <label>E-mail: </label>
                  <strong> {email}</strong>
                </div>

                <hr></hr>

                <div className="form-group">
                  <label>City: </label>
                  <strong> {selected_city_name}</strong>
                </div>

                <div className="form-group">
                  <label>Reception date: </label>
                  <strong> {receptionDate}</strong>
                </div>

                <div className="form-group">
                  <label>Reception hour: </label>
                  <strong> {receptionHour}</strong>
                </div>

                <div className="form-group">
                  <label>Return date: </label>
                  <strong> {returnDate}</strong>
                </div>

                <div className="form-group">
                  <label>Return hour: </label>
                  <strong> {returnHour}</strong>
                </div>

                <div className="form-group">
                  <label>Selected car: </label>
                  <strong> {brand} {model}</strong>
                </div>

                <div className="form-group">
                  <label>Cost: </label>
                  <strong> {fullCost ? fullCost : ""} $</strong>
                </div>

                <hr></hr>

                <div className="row mt-4">
									<Link to={{
										pathname: "/CarRental/reservation/selectcar",
										state: {
											selected_city:this.state.selected_city,
											reception_date:this.state.reception_date,
											reception_hour:this.state.reception_hour,
											return_date:this.state.return_date,
											return_hour:this.state.return_hour,
											selectedCar:this.state.selectedCar
										}
									}} className="linkstyle btn btn-lg btn-secondary btn-block col-md-2 ml-5">
										Back
									</Link>
									<button className="btn btn-lg btn-success btn-block  col-md-2 ml-auto mr-5" onClick={this.onClickNext}>Rent car</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
		)
	}
}
