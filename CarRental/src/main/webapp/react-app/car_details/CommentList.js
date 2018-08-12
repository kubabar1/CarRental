import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/car_details.css';
import {CommentItem} from './CommentItem.js';

export class CommentList extends React.Component {

	render () {
		return (
      <section className="mb-5">

        <CommentItem/>

      </section>
		)
	}
}
