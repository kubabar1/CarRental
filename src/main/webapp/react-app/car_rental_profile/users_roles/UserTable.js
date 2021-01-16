import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';

class UserTable extends React.Component {

  renderRow = (user) => {
    const url = "/CarRental/profile/addrole/"+user.id;

    return(
      <tr key={user.id}>
        <td><Link to={url} className="linkstyle btn btn-success custom-width">Add role</Link></td>
        <td>{user.id}</td>
        <td>{user.login}</td>
        <td>{user.name}</td>
        <td>{user.surname}</td>
        <td>{this.getUserRoles(user.userRolesList)}</td>
      </tr>
    );
  }

  getUserRoles = (userRoles) => {
		const objs = [];
    const userRolesSize = userRoles.length;

    var str = '';
    for(var i=0; i<userRolesSize; i++){
      str += userRoles[i].type+' ';
    }

		return str;
  }

	render () {
    const userlist = this.props.userList;

		return (
      <div className="p-3 table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Edit</th>
              <th>Id</th>
              <th>Login</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Roles</th>
            </tr>
          </thead>
          <tbody>
            {userlist ? userlist.map(this.renderRow) : ""}
          </tbody>
        </table>
      </div>
		)
	}

}

export default withRouter(UserTable);
