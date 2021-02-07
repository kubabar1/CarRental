import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';
import {HeaderContainer} from "../tools/HeaderContainer.js"
import CarTable from "./CarTable.js"

export class ShowCarFeatures extends React.Component {

    constructor() {
      super();
      this.state = {
        featuresList:null,
        car_id:null,
        allFeaturesList:null,
        selectedEquipment:null
      };
    }

    renderFeaturesTable = () => {
      const featuresList = this.state.featuresList;

      return(
        <div className="p-3 table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Delete</th>
                <th>Equipment code</th>
                <th>Equipment description</th>
              </tr>
            </thead>
            <tbody>
              {featuresList ? featuresList.map(this.renderRow) : ""}
            </tbody>
          </table>
        </div>
      );
    }



    deleteEquipment = (eqCode) => {
      const car_id = this.state.car_id;
      const url="http://localhost:8080/CarRental/carlist/equipment/"+car_id;

      const item = {};

      item["equipmentCode"]=eqCode;

      fetch(url, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      }).then(response => {this.refreshLists(car_id)}).catch(error => {});
    }

    handleSubmitAddEquipment = (event) => {
      event.preventDefault();
      const selectedEquipment = this.state.selectedEquipment;
      const car_id = this.state.car_id;

      const item = {};

      item["equipmentCode"]=selectedEquipment;

      const url = "http://localhost:8080/CarRental/carlist/equipment/"+car_id;

      if(selectedEquipment!=null){
        fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        }).then(response => {this.refreshLists(car_id)}).catch(error => {});
      }

    }

    renderRow = (equipment) => {
      const eqCode = equipment.equipmentCode;
      return(
        <tr key={eqCode}>
          <td><button onClick={() => this.deleteEquipment(eqCode)} className={"btn btn-danger"} type="button">Delete</button></td>
          <td>{eqCode}</td>
          <td>{equipment.description}</td>
        </tr>
      );
    }

    handleInputChange = (event) => {
      const target = event.target;
      const car_id_v = target.value;

      this.setState({car_id:car_id_v});
      this.refreshLists(car_id_v);

    }

    handleOptionChange = (event) => {
      const target = event.target;
      const equipmentCode = target.value;

      this.setState({selectedEquipment:equipmentCode});
    }

    refreshLists = (car_id) => {
      fetch("http://localhost:8080/CarRental/carlist/"+car_id)
      .then(response => response.json())
      .then(data => {this.setState({featuresList:data.equipmentList})})
      .catch(error => this.setState({featuresList:null }));

      fetch("http://localhost:8080/CarRental/equipmentlist/"+car_id)
      .then(response => response.json())
      .then(data => this.setState({allFeaturesList:data}))
      .catch(error => this.setState({featuresList:null }));
    }

    renderFeatureOption = (feature) => {
      return(
        <option name={"feature_"+feature.equipmentCode} key={feature.equipmentCode} value={feature.equipmentCode}>{feature.description}</option>
      );
    }

    renderAddForm = () => {
      const loaded = this.state.loaded;
      const allFeaturesList = this.state.allFeaturesList;
      const selectedEquipment = this.state.selectedEquipment;

      return(
        <form onSubmit={this.handleSubmitAddEquipment}>
          <div className="row my-3">
            <label className="ml-5 mt-4">Equipment list:</label>
            <div className="mt-3 ml-3">
              <select id="features_list" name="features_list"  key="features_list" className="form-control "  value={selectedEquipment==null ? "null" : selectedEquipment} onChange={this.handleOptionChange}>
                <option key="dispabled_feature" name="dispabled_feature" value="null" disabled="disabled" >Choose equipment</option>
                {allFeaturesList.map(this.renderFeatureOption)}
              </select>
            </div>
            <div className="mt-3 ml-3">
              <input type="submit" value="Add" className="btn btn-primary"/>
            </div>
          </div>
        </form>
      );
    }

    handleSubmit = (event) => {
      event.preventDefault();
    }


  	render () {
      const car_id = this.state.car_id;
      const loaded = this.state.loaded;
      const featuresList = this.state.featuresList;
      const carlist = this.state.carlist;
      const allFeaturesList = this.state.allFeaturesList;

  		return (
        <div className="col-md-9 pl-0 pr-3">
          <div className="card">
            <HeaderContainer title={"Car equipment list"}/>
            <div className="card-body text-center">
              <div className="row my-3">
                <div className="form-group">
                  <form onSubmit={this.handleSubmit}>
                    <div className="row">
                      <label className="ml-5 mt-4">Car id:</label>
                      <div className="ml-2 mt-3">
                        <input type="number" className="form-control" name="car_id" onChange={this.handleInputChange}/>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <hr className="mb-3"></hr>
              {car_id && featuresList ? this.renderFeaturesTable() : ""}
            </div>
            {car_id && allFeaturesList ? this.renderAddForm() : ""}
          </div>
        </div>
  		)
  	}

  }
