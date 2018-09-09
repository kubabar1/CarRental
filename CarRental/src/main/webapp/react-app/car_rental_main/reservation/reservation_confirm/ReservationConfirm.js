import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../../static/css/main.css';
import '../../../../static/css/reservation_data.css';
import {Logo} from '../Logo.js';
import {ReservationStep} from '../ReservationStep.js';
import { Link } from 'react-router-dom'


export class ReservationConfirm extends React.Component {

	constructor() {
    super();
    this.state = {
      step:3,
      name:"Jan",
      surname:"Kowalski",
      phone:"423 645 765",
      email:"jan@gmail.com",
      brand:null,
      model:null,
      dailyFee:null,

      selected_city:null,
      reception_date:null,
      reception_hour:null,
      return_date:null,
      return_hour:null,
			selectedCar:null,

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

		this.setState({
			selected_city:this.props.location.state.selected_city,
			reception_date:this.props.location.state.reception_date,
			reception_hour:this.props.location.state.reception_hour,
			return_date:this.props.location.state.return_date,
			return_hour:this.props.location.state.return_hour,
			selectedCar:this.props.location.state.selectedCar
		});

		this.setState({loaded:true});
	};

	countCost = (dailyFee,receptionDate,returnDate) => {
		const start = new Date(receptionDate);
		const stop = new Date(returnDate);
		const diff = (Math.abs(stop - start))/(24*60*60*1000);
		const cost = diff*dailyFee;

		return cost;
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
		const cost = this.countCost(dailyFee,receptionDate,returnDate);

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
                  <strong> {city}</strong>
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
                  <strong> {cost} $</strong>
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
                  <Link to={"/CarRental/reservation/succeed"} className="linkstyle btn btn-lg btn-success btn-block col-md-2 ml-auto mr-5">Rent car</Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
		)
	}
}
