import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';

export class ResultNumberSelection extends React.Component {

	numberChangeHandler = (event) => {
		const target = event.target;
		const value = target.value;

		this.props.setResultNumber(value);
	}

	render () {
		return (
      <div className="form-group">
        <div className="row">
          <label className="ml-5 mt-4">Show:</label>
          <div className="ml-4 mt-3">
            <select id="users_number_result" name="users_number_result" key="users_number_result" className="form-control" onChange={this.numberChangeHandler}>
              <option name="users_number_result_5" key="users_number_result_5" value="5">5</option>
              <option name="users_number_result_10" key="users_number_result_10" value="10">10</option>
              <option name="users_number_result_20" key="users_number_result_20" value="20">20</option>
            </select>
          </div>
        </div>
      </div>
		)
	}

}
