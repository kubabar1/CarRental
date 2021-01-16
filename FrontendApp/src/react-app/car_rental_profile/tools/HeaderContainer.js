import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';

export class HeaderContainer extends React.Component {

	render () {
		return (
      <div className="card-header text-center">
        {this.props.title}
      </div>
		)
	}

}
