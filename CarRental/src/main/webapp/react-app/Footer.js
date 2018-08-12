import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../static/css/main.css'


export class Footer extends React.Component {
	render () {
		return (
			  <footer>
				<div className="container">
			      <div className="row">
			        <div id="pages-list" className="col-lg-3 col-md-12">
			          <ul>
			            <li><a href="#">Home</a></li>
			            <li><a href="#">Car list</a></li>
			            <li><a href="#">Best offers</a></li>
			            <li><a href="#">Blog</a></li>
			            <li><a href="#">About us</a></li>
			            <li><a href="#">Contact</a></li>
			          </ul>
			        </div>


			        <div id="news-list" className="col-lg-5 col-md-12">
			          <h5>Latest news:</h5>
			          <div className="container">
			            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			              Lorem ipsum dolor sit amet, consectetur adipiscing elit ...<br></br>
			            <a className="underline-href" href="#">read more</a></p>
			          </div>
			          <div className="container">
			            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			              Lorem ipsum dolor sit amet, consectetur adipiscing elit ...<br></br>
			            <a className="underline-href" href="#">read more</a></p>
			          </div>
			        </div>


			        <div className="footer-contact"  className="col-lg-4 col-md-12">
			          <h5>Contact us:</h5>
			          <i className="fa fa-phone" style={{fontSize:24}}></i>  423 232 123 <br></br>
			          <i className="fa fa-mobile" style={{fontSize:24}}></i>  948 132 423 <br></br>
			          <i className="fa fa-envelope" style={{fontSize:24}}></i> car.rental@gmail.com <br></br><br></br>
			          <h5>Socials:</h5>
			          <div className="row">
			            <a href="#"><i className="socials-icons fab fa-facebook facebook-icon" style={{fontSize:40}}></i></a><br></br>
			            <a href="#"><i className="socials-icons fab fa-twitter twitter-icon" style={{fontSize:40}}></i></a><br></br>
			            <a href="#"><i className="socials-icons fab fa-instagram instagram-icon" style={{fontSize:40}}></i></a><br></br>
			            <a href="#"><i className="socials-icons fab fa-youtube youtube-icon" style={{fontSize:40}}></i></a><br></br>
			          </div>
			        </div>
			      </div>


			    </div>

			    <div className="footer-copyright text-center">
			      © 2018 Copyright:  <a className ="font-weight-bold" href="#">CarRental</a>
			    </div>
			   </footer>
		)
	}

}
