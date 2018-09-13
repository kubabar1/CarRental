import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css'
import {Link} from 'react-router-dom';


export class Footer extends React.Component {
	render () {
		var d = new Date();
    var n = d.getFullYear();

		return (
			  <footer>
				<div className="container">
			      <div className="row">
			        <div id="pages-list" className="col-lg-3 col-md-12">
			          <ul>
									<li><Link to='/CarRental/' className="linkstyle_black">Home</Link></li>
									<li><Link to='/CarRental/listcar' className="linkstyle_black">Car list</Link></li>
									<li><Link to='/CarRental/bestoffers' className="linkstyle_black">Best offers</Link></li>
									<li><Link to='/CarRental/aboutus' className="linkstyle_black">About us</Link></li>
									<li><Link to='/CarRental/contact' className="linkstyle_black">Contact</Link></li>
			          </ul>
			        </div>


			        <div id="news-list" className="col-lg-5 col-md-12 mt-3">
								<h5>Socials:</h5>
								<div className="row">
									<a href="#"><i className="socials-icons fab fa-facebook facebook-icon" style={{fontSize:40}}></i></a><br></br>
									<a href="#"><i className="socials-icons fab fa-twitter twitter-icon" style={{fontSize:40}}></i></a><br></br>
									<a href="#"><i className="socials-icons fab fa-instagram instagram-icon" style={{fontSize:40}}></i></a><br></br>
									<a href="#"><i className="socials-icons fab fa-youtube youtube-icon" style={{fontSize:40}}></i></a><br></br>
								</div>
			        </div>


			        <div className="footer-contact"  className="col-lg-4 col-md-12 mt-3">
			          <h5>Contact us:</h5>
			          <i className="fa fa-phone" style={{fontSize:24}}></i>  423 232 123 <br></br>
			          <i className="fa fa-mobile" style={{fontSize:24}}></i>  948 132 423 <br></br>
			          <i className="fa fa-envelope" style={{fontSize:24}}></i> car.rental@gmail.com <br></br><br></br>
			        </div>
			      </div>


			    </div>

			    <div className="footer-copyright text-center">
			      © {n} Copyright:  <a className ="font-weight-bold" href="#">CarRental</a>
			    </div>
			   </footer>
		)
	}

}
