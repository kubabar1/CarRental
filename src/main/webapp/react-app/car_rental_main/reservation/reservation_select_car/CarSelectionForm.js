import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../../static/css/main.css';
import '../../../../static/css/reservation_data.css';
import '../../../../static/css/reservation_car_selection.css';
import {CarItem} from './CarItem.js';
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';

class CarSelectionForm extends React.Component{

  constructor() {
    super();
    this.state = {
      carlist:null,
      selectedCar:null,
      brandAndModel:null,

      selected_city:null,
      reception_date:null,
      reception_hour:null,
      return_date:null,
      return_hour:null,

      inputError:false,

      loaded:false
    };
  }

  componentDidMount(){
    const url="http://localhost:8080/CarRental/carlist?city="+this.props.location.state.selected_city;
    fetch(url)
    .then(response=>{
      response.json().then(json=>{
        this.setState({carlist:json});
      });
    });

    const selectedVehicle=this.props.location.state.selectedCar ? this.props.location.state.selectedCar: null;

    if(selectedVehicle){
        this.setBrandAndModel(selectedVehicle);
    }

    this.setState({
      selected_city:this.props.location.state.selected_city,
      reception_date:this.props.location.state.reception_date,
      reception_hour:this.props.location.state.reception_hour,
      return_date:this.props.location.state.return_date,
      return_hour:this.props.location.state.return_hour,
      selectedCar:selectedVehicle
    });

    this.setState({loaded:true});
  };

  createCarItem = car=>{
      return <div id={car.id} key={car.id} className="col-xl-3 col-lg-4 col-md-6" onClick={(e) => this.handleClick(car.id)}><CarItem carId={car.id} dailyFee={car.dailyFee} brand={car.brand} model={car.model} photoName={car.vehicleParameters.photoName}/></div>;
  }

  handleClick = (clicked_id) => {
    this.setState({selectedCar:clicked_id});
    this.setBrandAndModel(clicked_id);
  }

  setBrandAndModel = (clicked_id) => {
    const url="http://localhost:8080/CarRental/carlist/"+clicked_id;

    fetch(url)
    .then(response=>{
      response.json().then(json=>{
        this.setState({brandAndModel:(json.brand+" "+json.model)});
      });
    });
  }

  onClickNext = (event) => {
    event.preventDefault();
    const selectedCar = this.state.selectedCar;

    const inputError = this.state.inputError;

    if(selectedCar!=null){
      this.props.history.push({
        pathname: "/CarRental/reservation/confirm",
        state: {
          selected_city:this.state.selected_city,
          reception_date:this.state.reception_date,
          reception_hour:this.state.reception_hour,
          return_date:this.state.return_date,
          return_hour:this.state.return_hour,
          selectedCar:this.state.selectedCar
        }
      })
      this.setState({inputError:false});
    }else{
      this.setState({inputError:true});
    }

  }


  renderContent = () => {
    const carlist = this.state.carlist;
    const selectedCar = this.state.selectedCar;
    const inputError = this.state.inputError;


    return(
      <form>
        <div className="shadow card">
          <div className="card-header">
            <h1>Select car:</h1>
          </div>
          <div id="car-item-container" className="card-body">
            <div className="row justify-content-center">
              {carlist ? carlist.map(this.createCarItem) : <i className="fa fa-spinner fa-pulse fa-3x fa-fw "></i>}
            </div>
          </div>

          <div className="shadow card mt-3">
            <div className="card-body">
              <h4 className="ml-4 mt-3">Selected car: <strong>{this.state.brandAndModel ? this.state.brandAndModel : ""}</strong></h4>
              {inputError ? [
                <div key="input_Error" className="alert alert-danger my-4">
                  Fill all fields with valid values.
                </div>
                ] : ""
              }
              <div className="row mb-3 mt-5">
                <Link to={{
                  pathname: "/CarRental/reservation/data",
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
                <button className="btn btn-lg btn-primary btn-block  col-md-2 ml-auto mr-5" onClick={this.onClickNext}>Next</button>
              </div>
            </div>
          </div>

        </div>
      </form>
    );
  }

  render(){
    const loaded = this.state.loaded;

    return(
      <div className="container col-md-8 offset-md-2 my-5 ">
        {loaded ? this.renderContent() : <div></div>}
      </div>
    );
  }

}

export default withRouter(CarSelectionForm);
