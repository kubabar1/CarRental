import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';
import {HeaderContainer} from "../tools/HeaderContainer.js"

export class AddRole extends React.Component {

  constructor() {
    super();
    this.state = {
      user_id:null,
      rolesList:null,
      selected_users_role:null,
      loaded:false
    };
  }

	componentDidMount(){
    fetch("http://localhost:8080/CarRental/roleslist/absentroles/"+this.props.match.params.user_id)
		.then(response=>{
			response.json().then(json=>{
				this.setState({
          user_id:this.props.match.params.user_id,
				  rolesList:json,
          loaded:true
			  });
		  });
    });
  }

  handleSubmitAdd = (event) => {
    event.preventDefault();
    const selected_users_role = this.state.selected_users_role;
    const url = "http://localhost:8080/CarRental/userlist/adduserrole/"+this.props.match.params.user_id;

    var item={};

    item["id"]=selected_users_role;

    console.log(item);
    console.log(JSON.stringify(item));

    if(selected_users_role!=null){
      fetch(url, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(item),
      });
    }
  }

  handleInputChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;

    console.log(value);

    this.setState({selected_users_role:value});

  }

  renderAllOptions = (rolesList) =>{
      return(
        <select id="users_roles" name="users_role" key="users_roles" className="form-control" onChange={this.handleInputChange} defaultValue={"null"}>
          <option key="dispabled_role" name="disabled_role" value="null" disabled="disabled">Choose role</option>
          {rolesList.map(this.renderOption)}
        </select>
      );
  }

  renderOption = (role) => {
    return(
      <option name={"role_"+role.id} key={"role_"+role.id} value={role.id}>{role.type}</option>
    );
  }


	render () {
    const loaded = this.state.loaded;
    const rolesList = this.state.rolesList;

		return (
      <div className="col-md-9 pl-0 pr-3">
        <div className="card">
          <HeaderContainer title={"Add role"}/>
          <div className="card-body text-center">
            <form onSubmit={this.handleSubmitAdd}>
              <label className="ml-5 mt-4 mx-auto">Choose role:</label>
              <div className="mt-3 ml-3 col-md-5 mx-auto">
                {rolesList ? this.renderAllOptions(rolesList) : ""}
              </div>
              <div className="mt-3 mx-auto">
                <input type="submit" value="Add" className="btn btn-primary"/>
              </div>
            </form>
          </div>
        </div>
      </div>
		)
	}

}
