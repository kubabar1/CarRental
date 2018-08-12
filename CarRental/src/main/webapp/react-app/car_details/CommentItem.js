import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/car_details.css';

export class CommentItem extends React.Component {

	render () {
		return (
      <article className="media border p-3 my-4 text-left">
        <img src="/CarRental/etc-img/user.png" className="mr-3 mt-3 rounded-circle" style={{width:80}}/>
        <div className="media-body">
          <h4>Jan Kowalski <small><i>Posted on February 19, 2016</i></small></h4>

          <div className="car-rank mb-2">
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
          </div>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus ex. Cras hendrerit blandit ligula, at tempus dolor ultrices id. Sed porta justo ligula. Donec pellentesque ornare blandit. Nam porta massa nec lorem cursus, facilisis tristique neque luctus. Aliquam ac placerat massa, quis tristique odio.</p>
        </div>
      </article>
		)
	}
}
