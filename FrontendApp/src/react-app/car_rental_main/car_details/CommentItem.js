import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';
import '../../../main/static/css/car_details.css';

export class CommentItem extends React.Component {

	constructor(){
		super();

		this.state = {
			userLogin:null,
			date:null,
			rating:null,
			content:null
		};

	}

	componentDidMount(){
		this.setState({
			userLogin:this.props.userLogin,
			date:this.props.date,
			rating:this.props.rating,
			content:this.props.content
		});
	}


	renderStars = (number) => {
		const objs = [];

		for(var i=0; i < number ; i++){
			objs.push(<span key={"star_"+i} className={"fa fa-star checked"}></span>);
		}

		for(var i=number; i < 5 ; i++){
			objs.push(<span key={"star_"+i} className={"fa fa-star"}></span>);
		}

		return objs;
	}

	render () {
		const userLogin = this.state.userLogin;
		const date = this.state.date;
		const rating = this.state.rating;
		const content = this.state.content;

		return (
      <article className="media border p-3 my-4 text-left">
        <img src="/CarRental/etc-img/user.png" className="mr-3 mt-3 rounded-circle" style={{width:80}}/>
        <div className="media-body">
          <h4>{userLogin ? userLogin : ""} <small><i> Posted on {date ? date : ""}</i></small></h4>

          <div className="car-rank mb-2" >
            {rating ? this.renderStars(rating) : this.renderStars(0)}
          </div>

          <p>{content}</p>
        </div>
      </article>
		)
	}
}
