import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';
import '../../../main/static/css/car_details.css';

export class AddComment extends React.Component {

	constructor(){
		super();

		this.state = {
			starsNumber:0,
			userLogin:null,
			userSurname:null,
			commentContent:"",
			commentError:false,
			starsError:false
		};

	}

	componentDidMount(){
		this.setState({
			userLogin:this.props.login
		});
	}

	renderStars = (number) => {
		const objs = [];

		for(let i=0; i < 5 ; i++){
			objs.push(<span key={"star_"+i} className={i<number ? "fa fa-star checked" : "fa fa-star"} onClick={()=>this.setStarsNumber(i+1)}></span>);
		}

		return objs;
	}

	setStarsNumber = (i) => {
		this.setState({starsNumber:i});
	}

	getTimestamp = () => {
	    var today = new Date();
	    var MM = today.getMonth() + 1;
	    var dd = today.getDate();

	    var hh = today.getHours();
	    var mm = today.getMinutes();
	    var ss = today.getSeconds();

	    var part1 = [today.getFullYear(), (MM>9 ? '' : '0') + MM, (dd>9 ? '' : '0') + dd].join('-');

	    var part2 = [hh,mm,ss].join(':');

	    return(part1+" "+part2);
	}

	createCommentItem = () => {
		const item = {};

		item["vehicleId"] = this.props.carid;
		item["commentContent"] = this.state.commentContent;
		item["login"] = this.props.login;
		item["creationDate"] = this.getTimestamp();
		item["rating"] = this.state.starsNumber;

		return item;
	}

	createStarItem = () => {
		const item = {};

		item["vehicleId"] = this.props.carid;
		item["stars"] = this.state.starsNumber;

		return item;
	}

	handleAddComment = (event) => {
		const commentContent = this.state.commentContent;
		const starsNumber = this.state.starsNumber;
		event.preventDefault();

		if(commentContent==""){
			this.setState({commentError:true});
		}else{
			this.setState({commentError:false});
		}

		if(starsNumber<=0){
			this.setState({starsError:true});
		}else{
			this.setState({starsError:false});
		}

		if(commentContent!="" && starsNumber>0){

			const commentItem = this.createCommentItem();

			const starsItem = this.createStarItem();

			const url1="http://localhost:8080/CarRental/comments/"+this.props.carid;
			fetch(url1, {
				method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
				body: JSON.stringify(commentItem)
			}).then(response => {
				this.setState({commentContent:""});
				this.props.loadCommentsForPage(0);
			}).catch(error => {});

			const url2="http://localhost:8080/CarRental/stars/"+this.props.carid;
			fetch(url2, {
				method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
				body: JSON.stringify(starsItem)
			}).then(response => {
				this.setState({starsNumber:0});
			}).catch(error => {});


			this.props.loadCommentsForPage(0);
		}


		this.props.loadCommentsForPage(0);

		event.preventDefault();
	}

	createStarsItem = () => {
		const item = {};

		item["vehicleId"] = this.props.carid;
		item["starsAvgCount"] = this.state.starsNumber;

		return item;
	}

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	render () {
		const starsNumber = this.state.starsNumber;
		const commentContent = this.state.commentContent;
		const starsError = this.state.starsError;
		const commentError = this.state.commentError;

		return (
      <div className="card text-left">
        <div className="card-header">
          Leave a comment
        </div>
        <div className="card-body">
          <form onSubmit={this.handleAddComment}>
            <div className="car-rank mb-3 ml-q">
              {starsNumber ? this.renderStars(starsNumber) : this.renderStars(0)}
            </div>
						{starsError ?
							[<div className="alert alert-danger" role="alert" key="alert_stars">
  							Select stars number.
							</div>] : ""}
            <div className="form-group">
              <textarea id="commentContent" name="commentContent" className="form-control" rows="5" value={this.state.commentContent} onChange={this.handleInputChange} placeholder="Comment" required ></textarea>
            </div>
						{commentError ?
							[<div className="alert alert-danger" role="alert" key="alert_comment">
  							Insert comment.
							</div>] : ""}
            <input type="submit" value="Submit" className="btn btn-primary" name="leave-comment-button"/>
          </form>
        </div>
      </div>
		)
	}
}
