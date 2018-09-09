import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../../static/css/main.css';
import '../../../../static/css/reservation_data.css';
import '../../../../static/css/reservation_car_selection.css';
import { Link } from 'react-router-dom'



export class CarItem extends React.Component{

  constructor() {
    super();
    this.state = {
      carId:null,
      brand:null,
      model:null,
      dailyFee:null,
      photoName:null
    };
  }

  componentDidMount(){
    this.setState({
      carId:this.props.carId,
      brand:this.props.brand,
      model:this.props.model,
      dailyFee:this.props.dailyFee,
      photoName:this.props.photoName
    });
  };

  render(){
    const brand=this.state.brand;
    const model=this.state.model;
    const dailyFee=this.state.dailyFee;
    const image_url='/CarRental/vehicles-img/'+this.state.photoName;

    return(
      <div className="car-single-item-reservation container card card-body shadow mx-4 my-3 text-center">
        <h5 className="mb-2">{brand} {model}</h5>
        <div className="car-img-container" style={{ backgroundImage : `url(${image_url})`,  backgroundPosition: "center",  backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        </div>
        <div className="text-center">
          <h3 className="mt-3">${dailyFee}</h3>
        </div>
      </div>
    );
  }

}
