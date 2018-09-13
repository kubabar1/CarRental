import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import '../../../static/css/car_details.css';
import {CommentItem} from './CommentItem.js';

export class CommentList extends React.Component {

	renderCommentItem = (comment) => {
		const userLogin = comment.login;
		const date = comment.creationDate;
		const rating = comment.rating;
		const content = comment.commentContent;

		return(
			<CommentItem userLogin={userLogin} date={date} rating={rating} content={content} key={userLogin+"_"+date+"_"+Math.random()}/>
		);
	}

	render () {
		const comments = this.props.comments;

		console.log(comments);

		return (
      <section className="mb-5">
				{comments ? comments.map(this.renderCommentItem) : ""}
      </section>
		)
	}
}
