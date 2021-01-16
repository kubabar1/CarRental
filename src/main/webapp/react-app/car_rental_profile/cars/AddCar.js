import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import {HeaderContainer} from '../tools/HeaderContainer.js'

export class AddCar extends React.Component {

    constructor(){
      super();


      this.state={
        car_brand:"",
        car_model:"",
        car_daily_fee:"",
        car_registration:"",
        car_location:"",
        car_vehicle_status:"AVI",
        car_best_offer:false,

        car_fuel_type:"",
        car_power:"",
        car_gearbox:"",
        car_front_wheels:false,
        car_doors_number:"",
        car_seats_number:"",
        car_metallic:false,
        car_description:"",
        car_body:"",
        car_production_year:"",
        car_color:"",
        car_image_name:"",

        car_equipment_list:null,

        citylist:null,

        image:null,

        loaded:false,

        errorPhoto:false,

        errorEmpty:false
      };
    }

    componentDidMount(){
      fetch("http://localhost:8080/CarRental/locations")
      .then(response=>{
        response.json().then(json=>{
          this.setState({
            citylist:json,
            loaded:true
          });
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
      this.setState({car_image_name:e.target.files[0].name})
    }

    createCarWrapper = () => {
      var item = {};
      var item2 = {};

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

    validate = () =>{
      if( this.state.car_brand=="" || this.state.car_brand==null ||
          this.state.car_model=="" || this.state.car_model==null ||
          this.state.car_daily_fee=="" || this.state.car_daily_fee==null ||
          this.state.car_registration=="" || this.state.car_registration==null ||
          this.state.car_location=="" || this.state.car_location==null ||
          this.state.car_vehicle_status=="" || this.state.car_vehicle_status==null ||

          this.state.car_body=="" || this.state.car_body==null ||
          this.state.car_fuel_type=="" || this.state.car_fuel_type==null ||
          this.state.car_power=="" || this.state.car_power==null ||
          this.state.car_gearbox=="" || this.state.car_gearbox==null ||
          this.state.car_doors_number=="" || this.state.car_model==null ||
          this.state.car_seats_number=="" || this.state.car_seats_number==null ||
          this.state.car_color=="" || this.state.car_color==null ||
          this.state.car_description=="" || this.state.car_description==null ||
          this.state.car_production_year=="" || this.state.car_production_year==null ||
          this.state.car_image_name=="" || this.state.car_image_name==null){
            this.setState({errorEmpty:true});
      }else{
        this.setState({errorEmpty:false});
      }
    }

    sendForm = () => {
      const carWrapper = this.createCarWrapper();
      const errorEmpty = this.state.errorEmpty;

      var formData = new FormData()

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

      const url = 'http://localhost:8080/CarRental/carlist';

      if(this.state.image!=null && errorEmpty==false){
        this.setState({errorPhoto:false});
        formData.append('image',this.state.image);
        fetch(url, {
          method: 'POST',
          body: formData
        });
        this.props.history.push({pathname: '/CarRental/profile'});
      }else{
        this.setState({errorPhoto:true});
      }

      if(this.state.image!=null){
        this.setState({errorPhoto:false});
      }


    }

    handleSubmit = (event) => {
  			event.preventDefault();
        this.validate();
        if(this.state.image==null){
          this.setState({errorPhoto:true});
        }else{
          this.setState({errorPhoto:false});
        }

        this.sendForm();

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
      const errorPhoto = this.state.errorPhoto;
      const errorEmpty = this.state.errorEmpty;

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
                    <input type="number" className="form-control" name="car_daily_fee" required value={this.state.car_daily_fee} onChange={this.handleInputChange}/>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <label className="ml-5 mt-4 col-md-2">Location:</label>
                  <div className="ml-4 mt-3 col-md-3">
                    <select name="car_location" className="form-control " required value={this.state.car_location} onChange={this.handleInputChange}>
                      <option key="dispabled_role" name="disabled_role" value="" disabled="disabled">Choose car location</option>
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
                  <label className="ml-5 mt-4 col-md-2">Car availability:</label>
                  <div className="ml-4 mt-3 col-md-3">
                    <select name="car_vehicle_status" className="form-control" required value={this.state.car_vehicle_status} onChange={this.handleInputChange} >
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
                      <option key="dispabled_role" name="disabled_role" value="" disabled="disabled">Choose body type</option>
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
                      <option key="dispabled_role" name="disabled_role" value="" disabled="disabled">Choose fuel type</option>
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
                      <option key="dispabled_role" name="disabled_role" value="" disabled="disabled">Choose car gearbox</option>
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
                      <option key="dispabled_role" name="disabled_role" value="" disabled="disabled">Choose car color</option>
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
                {errorPhoto ? this.showError("Add car image.") : ""}
              </div>


              <div className="ml-4 my-4 text-center">
                <input type="submit" value="Add" required className="btn btn-primary"/>
              </div>
            </form>
            {errorEmpty ? this.showError("Fill all fields.") : ""}
          </div>
      );
    }

    showError = (message) => {
      return(
        <div className="my-3 alert alert-danger">
          {message}
        </div>
      );
    }

  	render () {
      const loaded = this.state.loaded;

  		return (
          <div className="col-md-9 pl-0 pr-3 mb-3 text-center">
            <div className="card">
              <HeaderContainer title={"Car - add"}/>
              {loaded ? this.renderForm() : <i className="fa fa-spinner fa-pulse fa-3x fa-fw "></i>}
            </div>
          </div>
  		)
  	}

  }
