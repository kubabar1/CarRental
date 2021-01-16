import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';
import '../../../main/static/css/home.css';

export class Carousele extends React.Component {

	render () {
    const image_url1 = '/CarRental/etc-img/road_img.jpg';
    const image_url2 = '/CarRental/etc-img/car_city.jpg';
    const image_url3 = '/CarRental/etc-img/locations_car_img.jpg';

		return (
      <div id="demo" className="carousel slide" data-ride="carousel">

    <ul className="carousel-indicators">
      <li data-target="#demo" data-slide-to="0"></li>
      <li data-target="#demo" data-slide-to="1"  className="active"></li>
      <li data-target="#demo" data-slide-to="2"></li>
    </ul>


    <div className="carousel-inner">
      <div className="carousel-item" style={{ backgroundImage : `url(${image_url1})`,  backgroundPosition: "center",  backgroundRepeat: "no-repeat", backgroundSize: "cover",  height:600,  backgroundAttachment: "fixed" }}>
        <div className="container">
          <div className="row">
            <div className="carousel-header-container col-md-12 font-weight-bold">
              <h1 className="display-2 pt-5 mt-5">THE BEST CAR RENTAL</h1>
            </div>
            <div className="carousel-text-container col-md-10 offset-md-1">
              <p className="pt-5 ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis,
                in rhoncus ex. Cras hendrerit blandit ligula, at tempus dolor ultrices id. Sed porta justo
                ligula. Donec pellentesque ornare blandit. Nam porta massa nec lorem cursus, facilisis
                tristique neque luctus. Aliquam ac placerat massa, quis tristique odio.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="carousel-item" style={{ backgroundImage : `url(${image_url2})`,  backgroundPosition: "center",  backgroundRepeat: "no-repeat", backgroundSize: "cover",  height:600,  backgroundAttachment: "fixed" }}>
        <div className="carousel-caption text-center carousel-item-styl">
          <div className="carousel-header-container-second-tile col-md-12 font-weight-bold">
            <h1 className="display-2 ">DRIVE IN THE CITY</h1>
          </div>
        </div>
      </div>
      <div className="carousel-item" style={{ backgroundImage : `url(${image_url3})`,  backgroundPosition: "center",  backgroundRepeat: "no-repeat", backgroundSize: "cover",  height:600,  backgroundAttachment: "fixed" }}>
        <div className="carousel-caption text-center carousel-item-styl">
          <div className="carousel-header-container-third-tile col-md-12 font-weight-bold">
            <h1 className="display-2 ">A LOT OF LOCATIONS</h1>
          </div>
        </div>
      </div>
    </div>

    <a className="carousel-control-prev" href="#demo" data-slide="prev">
      <span className="carousel-control-prev-icon"></span>
    </a>
    <a className="carousel-control-next" href="#demo" data-slide="next">
      <span className="carousel-control-next-icon"></span>
    </a>
  </div>

		)
	}

}
