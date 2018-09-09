import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';

export class MainContent extends React.Component {

	render () {
		return (
			<div className="col-md-9 pl-0 pr-3">
				<div className="card">
					<div className="card-header text-center">
						Welcome
					</div>
				</div>
			</div>
		)
	}

}
