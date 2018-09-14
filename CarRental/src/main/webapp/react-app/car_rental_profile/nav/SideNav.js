import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import { Link } from 'react-router-dom'

export class SideNav extends React.Component {

	constructor(){
		super();

		this.state = {
			userRoles:null
		}
	}

	componentDidMount(){
		fetch("http://localhost:8080/CarRental/userdata/userroles")
		.then(response => response.json())
		.then(data => {this.setState({
			userRoles:data.userroles
		})
		console.log(data);
		})
		.catch(error => {});
	}

	render () {
		const userRoles = this.state.userRoles;

		return (
      <section id="menu-panel" className="mb-5">
        <div className="card">
          <div className="card-header">
            <a className="card-link" data-toggle="collapse" href="#collapseOne">
              <i className="fas fa-list-ul mr-2"></i>Booking
            </a>
          </div>

          <div id="collapseOne" className="collapse" data-parent="#accordion">
            {userRoles && ["ROLE_ADMIN","ROLE_OFFICEEMPLOYEE","ROLE_RENTINGEMPLOYEE"].some(el => userRoles.includes(el)) ?
							[
								<div key="allbokinglist">
									<div className="container my-3">
										<i className="fas fa-angle-right mr-2 ml-3"></i>
										<Link to={"/CarRental/profile/allbookings"} className="linkstyle_black">
											All bookings
										</Link>
            			</div>
									<hr></hr>
								</div>
							] : ""
						}

						{userRoles && ["ROLE_ADMIN","ROLE_OFFICEEMPLOYEE","ROLE_RENTINGEMPLOYEE"].some(el => userRoles.includes(el)) ?
							[
								<div key="allrentslist">
									<div className="container my-3">
										<i className="fas fa-angle-right mr-2 ml-3"></i>
										<Link to={"/CarRental/profile/allreservedvehicles"} className="linkstyle_black">
											All reserved bookings
										</Link>
            			</div>
									<hr></hr>
								</div>
							] : ""
						}

						{userRoles && ["ROLE_ADMIN","ROLE_OFFICEEMPLOYEE","ROLE_RENTINGEMPLOYEE"].some(el => userRoles.includes(el)) ?
							[
								<div key="allrentslist">
									<div className="container my-3">
										<i className="fas fa-angle-right mr-2 ml-3"></i>
										<Link to={"/CarRental/profile/allrentedvehicles"} className="linkstyle_black">
											All rented bookings
										</Link>
            			</div>
									<hr></hr>
								</div>
							] : ""
						}

						{userRoles ?
							[
								<div key="allbokinglist">
									<div className="container my-3">
										<i className="fas fa-angle-right mr-2 ml-3"></i>
										<Link to={"/CarRental/profile/allmybookings"} className="linkstyle_black">
											My all bookings
										</Link>
            			</div>
									<hr></hr>
								</div>
							] : ""
						}

						{userRoles ?
							[
								<div key="allbokinglist">
									<div className="container my-3">
										<i className="fas fa-angle-right mr-2 ml-3"></i>
										<Link to={"/CarRental/profile/myreservedbookings"} className="linkstyle_black">
											My reserved bookings
										</Link>
            			</div>
									<hr></hr>
								</div>
							] : ""
						}

						{userRoles ?
							[
								<div key="allbokinglist">
									<div className="container my-3">
										<i className="fas fa-angle-right mr-2 ml-3"></i>
											<Link to={"/CarRental/profile/myrentedbookings"} className="linkstyle_black">
												My rented bookings
											</Link>
            			</div>
									<hr></hr>
								</div>
							] : ""
						}

						{userRoles && ["ROLE_ADMIN","ROLE_OFFICEEMPLOYEE","ROLE_RENTINGEMPLOYEE"].some(el => userRoles.includes(el)) ?
							[
								<div key="allbokinglist">
									<div className="container my-3">
										<i className="fas fa-angle-right mr-2 ml-3"></i>
											<Link to={"/CarRental/profile/bookingchanges"} className="linkstyle_black">
												Booking changes
											</Link>
									</div>
								</div>
							] : ""
						}
          </div>
        </div>




				{userRoles && ["ROLE_ADMIN"].some(el => userRoles.includes(el)) ?
					[
						<div className="card" key="usersadministration">
		          <div className="card-header">
		            <a className="collapsed card-link" data-toggle="collapse" href="#collapseTwo">
		              <i className="fas fa-user mr-2"></i>Users
		            </a>
		          </div>
		          <div id="collapseTwo" className="collapse" data-parent="#accordion">
		            <div className="container my-3">
									<i className="fas fa-angle-right mr-2 ml-3"></i>
									<Link to={"/CarRental/profile/userlist"} className="linkstyle_black">
										Show
									</Link>
		            </div>
		          </div>
		        </div>
					] : ""
				}



				{userRoles && ["ROLE_ADMIN","ROLE_RENTINGEMPLOYEE"].some(el => userRoles.includes(el)) ?
					[
						<div className="card" key="car_management">
		          <div className="card-header">
		            <a className="collapsed card-link" data-toggle="collapse" href="#collapseThree">
		              <i className="fas fa-car mr-2"></i> Cars
		            </a>
		          </div>
		          <div id="collapseThree" className="collapse" data-parent="#accordion">
		            <div className="container my-3">
		              <i className="fas fa-angle-right mr-2 ml-3"></i>
									<Link to={"/CarRental/profile/carslist"} className="linkstyle_black">
										Show cars
									</Link>
		            </div>
		            <hr></hr>
		            <div className="container my-3">
		              <i className="fas fa-angle-right mr-2 ml-3"></i>
									<Link to={"/CarRental/profile/addcar"} className="linkstyle_black">
										Add car
									</Link>
		            </div>
		            <hr></hr>
		            <div className="container my-3">
									<i className="fas fa-angle-right mr-2 ml-3"></i>
									<Link to={"/CarRental/profile/carequipments"} className="linkstyle_black">
										Car equipment list
									</Link>
		            </div>
		            <hr></hr>
		            <div className="container my-3">
		              <i className="fas fa-angle-right mr-2 ml-3"></i>
									<Link to={"/CarRental/profile/equipmentslist"} className="linkstyle_black">
										Equipment list
									</Link>
		            </div>
		          </div>
		        </div>
					] : ""
				}

				{userRoles && ["ROLE_ADMIN"].some(el => userRoles.includes(el)) ?
					[
						<div className="card" key="userrolesadministration">
		          <div className="card-header">
		            <a className="collapsed card-link" data-toggle="collapse" href="#collapseFour">
		              <i className="fas fa-user-lock mr-2"></i>User roles
		            </a>
		          </div>
		          <div id="collapseFour" className="collapse" data-parent="#accordion">
		            <div className="container my-3">
		              <i className="fas fa-angle-right mr-2 ml-3"></i>
									<Link to={"/CarRental/profile/userroles"} className="linkstyle_black">
										Show
									</Link>
		            </div>
		          </div>
		        </div>
					] : ""
				}

				{userRoles ?
					[
						<div className="card" key="usersadministration">
							<div className="card-header">
								<a className="collapsed card-link" data-toggle="collapse" href="#collapseFive">
									<i className="fas fa-map-marked-alt mr-2"></i>Locations
								</a>
							</div>
							<div id="collapseFive" className="collapse" data-parent="#accordion">
								<div className="container my-3">
									<i className="fas fa-angle-right mr-2 ml-3"></i>
									<Link to={"/CarRental/profile/locations"} className="linkstyle_black">
										Show
									</Link>
								</div>
							</div>
						</div>
					] : ""
				}

				{userRoles && ["ROLE_ADMIN","ROLE_OFFICEEMPLOYEE","ROLE_RENTINGEMPLOYEE"].some(el => userRoles.includes(el)) ?
					[
						<div className="card" key="emailsending">
		          <div className="card-header">
		            <i className="fas fa-envelope mr-2"></i>
								<Link to={"/CarRental/profile/sendemail"} className="linkstyle_black">
									Send e-mail
								</Link>
		          </div>
		        </div>
					] : ""
				}

        <div className="card">
          <div className="card-header">
            <i className="fas fa-cog mr-2"></i>
						<Link to={"/CarRental/profile/settings"} className="linkstyle_black">
							Settings
						</Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <a className="collapsed card-link" href="/CarRental">
              <i className="fas fa-home mr-2"></i> Home
            </a>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <a className="collapsed card-link" href="/CarRental/logout">
              <i className="fas fa-sign-out-alt mr-2"></i> Log out
            </a>
          </div>
        </div>
      </section>
		)
	}

}
