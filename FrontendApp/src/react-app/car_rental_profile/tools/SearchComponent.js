import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';

export class SearchComponent extends React.Component {

	render () {
		return (
      <div className="form-group ml-auto mr-5">
        <div className="row">
          <label className="ml-5 mt-4">Search:</label>
          <div className="ml-4 mt-3">
            <input type="text" className="form-control" name="search"/>
          </div>
        </div>
      </div>
		)
	}

}
