import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import {UserData} from './UserData.js';
import {SideNav} from './SideNav.js';

export class NavContainer extends React.Component {

	render () {
		return (
      <div className="col-md-3 px-0">
        <div id="accordion">
          <UserData/>
          <SideNav/>
        </div>
      </div>
		)
	}

}
