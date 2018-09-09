import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import '../../../static/css/car_details.css';

export class AddComment extends React.Component {

	constructor(){
		super();

		this.state = {
			starsNumber:0
		};

	}

	renderStars = (number) => {
		console.log("renderStars")
		const objs = [];

		for(let i=0; i < 5 ; i++){
			objs.push(<span key={"star_"+i} className={i<number ? "fa fa-star checked" : "fa fa-star"} onClick={()=>this.setStarsNumber(i+1)}></span>);
		}

		return objs;
	}

	setStarsNumber = (i) => {
		console.log("setStarsNumber")
		this.setState({starsNumber:i});
	}

	render () {
		const starsNumber = this.state.starsNumber;

		return (
      <div className="card text-left">
        <div className="card-header">
          Leave a comment
        </div>
        <div className="card-body">
          <form>
            <div className="car-rank mb-3 ml-q">
              {starsNumber ? this.renderStars(starsNumber) : this.renderStars(0)}
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
