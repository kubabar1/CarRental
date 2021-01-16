import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';
import {HeaderContainer} from '../tools/HeaderContainer.js'

export class EditCar extends React.Component {

  constructor(){
    super();


    this.state={
      car_id:null,

      car_brand:null,
      car_model:null,
      car_daily_fee:null,
      car_registration:null,
      car_location:null,
      car_vehicle_status:null,
      car_best_offer:null,

      car_fuel_type:null,
      car_power:null,
      car_gearbox:null,
      car_front_wheels:null,
      car_doors_number:null,
      car_seats_number:null,
      car_metallic:null,
      car_description:null,
      car_body:null,
      car_production_year:null,
      car_color:null,
      car_image_name:null,

      car_equipment_list:null,

      citylist:null,

      image:null,

      loaded:false
    };
  }

  componentDidMount(){
    const url="http://localhost:8080/CarRental/carlist/"+this.props.match.params.car_id;
    fetch(url)
    .then(response=>{
      response.json().then(json=>{

        this.setState({
          car_id:this.props.match.params.car_id,

          car_brand:json.brand,
          car_model:json.model,
          car_daily_fee:json.dailyFee,
          car_registration:json.registration,
          car_location:json.locationId,
          car_vehicle_status:json.vehicleStatus,
          car_best_offer:json.bestOffer==1?true:false,

          car_body:json.vehicleParameters.bodytype,
          car_fuel_type:json.vehicleParameters.fuelType,
          car_power:json.vehicleParameters.power,
          car_gearbox:json.vehicleParameters.gearbox,
          car_front_wheels:json.vehicleParameters.frontWheelDrive==1?true:false,
          car_doors_number:json.vehicleParameters.doorsNumber,
          car_seats_number:json.vehicleParameters.seatsNumber,
          car_color:json.vehicleParameters.color,
          car_metallic:json.vehicleParameters.metallic==1?true:false,
          car_description:json.vehicleParameters.description,
          car_production_year:json.vehicleParameters.productionYear,
          car_image_name:json.vehicleParameters.photoName,

          car_equipment_list:json.equipmentList,

          loaded:true
        });
      });
    });

    fetch("http://localhost:8080/CarRental/locations")
    .then(response=>{
      response.json().then(json=>{
        this.setState({citylist:json});
      });
    });

  }


  listOptions = optionElement=>{
      return <option key={optionElement} name={optionElement} id={optionElement} value={optionElement}>{optionElement}</option>;
  }

  listOptionsCity = optionElement=>{
      return <option key={optionElement.id+"_"+optionElement.city} name={optionElement.id+"_"+optionElement.city} id={optionElement.id+"_"+optionElement.city} value={optionElement.id}>{optionElement.city}</option>;
  }

  setImage = (e) => {
    e.preventDefault();
    this.setState({image:e.target.files[0]})
  }

  createCarWrapper = () => {
    var item = {};
    var item2 = {};

    item["id"] = this.state.car_id;
    item["brand"] = this.state.car_brand;
    item["model"] = this.state.car_model;
    item["dailyFee"] = this.state.car_daily_fee;
    item["registration"] = this.state.car_registration;
    item["location"] = this.state.car_location;
    item["vehicleStatus"] = this.state.car_vehicle_status;
    item["bestOffer"] = this.state.car_best_offer==true ? 1 : 0;

    item["bodytype"] = this.state.car_body;
    item["fuelType"] = this.state.car_fuel_type;
    item["power"] = this.state.car_power;
    item["gearbox"] = this.state.car_gearbox;
    item["frontWheelDrive"] = this.state.car_front_wheels==true ? 1 : 0;
    item["doorsNumber"] = this.state.car_doors_number;
    item["seatsNumber"] = this.state.car_seats_number;
    item["color"] = this.state.car_color;
    item["metallic"] = this.state.car_metallic==true ? 1 : 0;
    item["description"] = this.state.car_description;
    item["productionYear"] = this.state.car_production_year;
    item["photoName"] = this.state.car_image_name;

    return item;
  }

  sendForm = () => {
    const carWrapper = this.createCarWrapper();

    var formData = new FormData()

    formData.append('id',carWrapper["id"]);
    formData.append('brand',carWrapper["brand"]);
    formData.append('model',carWrapper["model"]);
    formData.append('dailyFee',carWrapper["dailyFee"]);
    formData.append('registration',carWrapper["registration"]);
    formData.append('location',carWrapper["location"]);
    formData.append('vehicleStatus',carWrapper["vehicleStatus"]);
    formData.append('bestOffer',carWrapper["bestOffer"]);
    formData.append('bodytype',carWrapper["bodytype"]);
    formData.append('fuelType',carWrapper["fuelType"]);
    formData.append('power',carWrapper["power"]);
    formData.append('gearbox',carWrapper["gearbox"]);
    formData.append('frontWheelDrive',carWrapper["frontWheelDrive"]);
    formData.append('doorsNumber',carWrapper["doorsNumber"]);
    formData.append('seatsNumber',carWrapper["seatsNumber"]);
    formData.append('color',carWrapper["color"]);
    formData.append('metallic',carWrapper["metallic"]);
    formData.append('description',carWrapper["description"]);
    formData.append('productionYear',carWrapper["productionYear"]);
    formData.append('photoName',carWrapper["photoName"]);


    if(this.state.image!=null){
      formData.append('image',this.state.image);
    }

    const url = 'http://localhost:8080/CarRental/carlist/'+this.state.car_id;

    fetch(url, {
      method: 'POST',
      body: formData
    });
  }

  handleSubmit = (event) => {
			event.preventDefault();
      this.sendForm();

      this.props.history.push({pathname: '/CarRental/profile/carslist'});
	}

	handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
	}

  renderForm = () => {
    const citylist = this.state.citylist;

    return(
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="row">
                <label className="ml-5 mt-4 col-md-2">Brand:</label>
                <div className="ml-4 mt-3 col-md-3">
                  <input type="text" className="form-control" name="car_brand" required value={this.state.car_brand} onChange={this.handleInputChange} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <label className="ml-5 mt-4 col-md-2">Model:</label>
                <div className="ml-4 mt-3 col-md-3">
                  <input type="text" className="form-control" name="car_model" required value={this.state.car_model} onChange={this.handleInputChange}/>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <label className="ml-5 mt-4 col-md-2">Registration:</label>
                <div className="ml-4 mt-3 col-md-3">
                  <input type="text" className="form-control" name="car_registration" required value={this.state.car_registration} onChange={this.handleInputChange}/>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <label className="ml-5 mt-4 col-md-2">Daily fee:</label>
                <div className="ml-4 mt-3 col-md-3">
                  <input type="text" className="form-control" name="car_daily_fee" required value={this.state.car_daily_fee} onChange={this.handleInputChange}/>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <label className="ml-5 mt-4 col-md-2">Location:</label>
                <div className="ml-4 mt-3 col-md-3">
                  <select name="car_location" className="form-control " required value={this.state.car_location} onChange={this.handleInputChange}>
                    {citylist ? citylist.map(this.listOptionsCity) : ""}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <label className="ml-5 mt-4 col-md-2">Best offer:</label>
                <div className="ml-4 mt-4  col-md-3">
                  <input type="checkbox" name="car_best_offer" checked={this.state.car_best_offer} onChange={this.handleInputChange}/>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <label className="ml-5 mt-4 col-md-2">Fuel type:</label>
                <div className="ml-4 mt-3 col-md-3">
                  <select name="car_vehicle_status" className="form-control" required value={this.state.car_vehicle_status} onChange={this.handleInputChange}>
                    <option value={"AVI"}>AVI</option>
                    <option value={"UAV"}>UAV</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <label className="ml-5 mt-4 col-md-2">Car body type:</label>
                <div className="ml-4 mt-3 col-md-3">
                  <select name="car_body" className="form-control " required value={this.state.car_body} onChange={this.handleInputChange}>
                    <option value={"Coupe"}>Coupe</option>
                    <option value={"SUV"}>SUV</option>
                    <option value={"Sedan"}>Sedan</option>
                    <option value={"Hatchback"}>Hatchback</option>
                    <option value={"Minivan"}>Minivan</option>
                    <option value={"Van"}>Van</option>
                    <option value={"Kombi"}>Kombi</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <label className="ml-5 mt-4 col-md-2">Production year:</label>
                <div className="ml-4 mt-3 col-md-3">
                  <input type="number" className="form-control" name="car_production_year" required value={this.state.car_production_year} onChange={this.handleInputChange}/>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <label className="ml-5 mt-4 col-md-2">Fuel type:</label>
                <div className="ml-4 mt-3 col-md-3">
                  <select name="car_fuel_type" className="form-control" required value={this.state.car_fuel_type} onChange={this.handleInputChange}>
                    <option value={"Petrol"}>Petrol</option>
                    <option value={"LPG"}>LPG</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <label className="ml-5 mt-4 col-md-2">Power:</label>
                <div className="ml-4 mt-3 col-md-3">
                  <input type="number" className="form-control" name="car_power" required value={this.state.car_power} onChange={this.handleInputChange}/>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <label className="ml-5 mt-4 col-md-2">Gearbox:</label>
                <div className="ml-4 mt-3 col-md-3">
                  <select name="car_gearbox" className="form-control" required value={this.state.car_gearbox} onChange={this.handleInputChange}>
                    <option value="auto" >auto</option>
                    <option value="man">man</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <label className="ml-5 mt-4 col-md-2">Front wheel drive:</label>
                <div className="ml-4 mt-4 col-md-3">
                  <input type="checkbox" name="car_front_wheels" checked={this.state.car_front_wheels} onChange={this.handleInputChange}/>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <label className="ml-5 mt-4 col-md-2">Doors number:</label>
                <div className="ml-4 mt-3 col-md-3">
                  <input type="number" className="form-control" name="car_doors_number" required value={this.state.car_doors_number} onChange={this.handleInputChange}/>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <label className="ml-5 mt-4 col-md-2">Seats number:</label>
                <div className="ml-4 mt-3 col-md-3">
                  <input type="number" className="form-control" name="car_seats_number" required value={this.state.car_seats_number} onChange={this.handleInputChange}/>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <label className="ml-5 mt-4 col-md-2">Color:</label>
                <div className="ml-4 mt-3 col-md-3">
                  <select name="car_color" className="form-control" required value={this.state.car_color} onChange={this.handleInputChange}>
                    <option value="Red" >Red</option>
                    <option value="White">White</option>
                    <option value="Black">Black</option>
                    <option value="Blue">Blue</option>
                    <option value="Grey">Grey</option>
                    <option value="Beige">Beige</option>
                    <option value="Brown">Brown</option>
                    <option value="Orange">Orange</option>
                    <option value="Claret">Claret</option>
                    <option value="Silver">Silver</option>
                    <option value="Green">Green</option>
                    <option value="Golden">Golden</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Pink">Pink</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <label className="ml-5 mt-4 col-md-2">Metalic:</label>
                <div className="ml-4 mt-4  col-md-3">
                  <input type="checkbox" name="car_metallic" checked={this.state.car_metallic} onChange={this.handleInputChange}/>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <label className="ml-5 mt-4 col-md-2">Description:</label>
                <div className="ml-4 mt-3 col-md-3">
                  <textarea rows="4" className="form-control" name="car_description" required value={this.state.car_description} onChange={this.handleInputChange}/>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <label className="ml-5 mt-4 col-md-2 file-label">Photo:</label>
                <div className="ml-4 mt-4  col-md-3 custom-file">
                  <input type="file" name="car_photo_name" accept="image/*" onChange={this.setImage}/>
                </div>
              </div>
            </div>


            <div className="ml-4 my-4 text-center">
              <input type="submit" value="Update" className="btn btn-primary"/>
            </div>
          </form>
        </div>
    );
  }

	render () {
    const loaded = this.state.loaded;

		return (
        <div className="col-md-9 pl-0 pr-3 mb-3 text-center">
          <div className="card">
            <HeaderContainer title={"Car - edit"}/>
            {loaded ? this.renderForm() : <i className="fa fa-spinner fa-pulse fa-3x fa-fw "></i>}
          </div>
        </div>
		)
	}

}
