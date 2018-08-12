import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/car_details.css';

export class AddComment extends React.Component {

	render () {

		return (
      <div className="card text-left">
        <div className="card-header">
          Leave a comment
        </div>
        <div className="card-body">
          <form>
            <div className="car-rank mb-3 ml-q">
              <span className="fa fa-star "></span>
              <span className="fa fa-star "></span>
              <span className="fa fa-star "></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
            </div>
            <div className="form-group">
              <textarea className="form-control" rows="5" id="comment-content" placeholder="Comment"></textarea>
            </div>
            <input type="submit" value="Submit" className="btn btn-primary" name="leave-comment-button"/>
          </form>
        </div>
      </div>
		)
	}
}
