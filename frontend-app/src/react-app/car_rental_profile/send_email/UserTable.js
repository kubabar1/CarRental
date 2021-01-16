import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';

class UserTable extends React.Component {

  renderRow = (user) => {
    const url = "/CarRental/profile/senduseremail/"+user.id;

    return(
      <tr key={user.id}>
        <td><Link to={url} className="linkstyle btn btn-success custom-width">Send</Link></td>
        <td>{user.id}</td>
        <td>{user.login}</td>
        <td>{user.name}</td>
        <td>{user.surname}</td>
        <td>{user.email}</td>
      </tr>
    );
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
              <th>Email</th>
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
