import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/car_details.css';

export class ReserveButton extends React.Component {

	render () {
		return (
      <section className="text-left">
        <h3 className="mt-2 ml-3 mb-4">Actions</h3>

        <form action="reservation_data.html">
          <input type="submit" className="btn btn-success px-5 py-2 ml-3" value="Reserve"/>
        </form>
      </section>
		)
	}
}
