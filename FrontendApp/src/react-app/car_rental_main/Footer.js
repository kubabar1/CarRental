import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../main/static/css/main.css'
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
									<a href="https://www.facebook.com" target="_blank"><i className="socials-icons fab fa-facebook facebook-icon" style={{fontSize:40}}></i></a><br></br>
									<a href="https://www.twitter.com" target="_blank"><i className="socials-icons fab fa-twitter twitter-icon" style={{fontSize:40}}></i></a><br></br>
									<a href="https://www.instagram.com" target="_blank"><i className="socials-icons fab fa-instagram instagram-icon" style={{fontSize:40}}></i></a><br></br>
									<a href="https://www.youtube.com" target="_blank"><i className="socials-icons fab fa-youtube youtube-icon" style={{fontSize:40}}></i></a><br></br>
								</div>
			        </div>


			        <div className="footer-contact"  className="col-lg-4 col-md-12 mt-3">
			          <h5 className="linkstyle_black">Contact us:</h5>
			          <i className="fa fa-phone linkstyle_black" style={{fontSize:24}}></i>  <t className="linkstyle_black"> 423 232 123 </t> <br></br>
			          <i className="fa fa-mobile linkstyle_black" style={{fontSize:24}}></i> <t className="linkstyle_black"> 948 132 423 </t> <br></br>
			          <i className="fa fa-envelope linkstyle_black" style={{fontSize:24}}></i> <a href="mailto:car.rental@test.com">car.rental@test.com</a> <br></br><br></br>
			        </div>
			      </div>


			    </div>

			    <div className="footer-copyright text-center">
			      © {n} Copyright:  <Link to='/CarRental/' className="linkstyle_white font-weight-bold">CarRental</Link>
			    </div>
			   </footer>
		)
	}

}
