import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import {HeaderContainer} from '../tools/HeaderContainer.js'

export class UserEmailContainer extends React.Component {

    constructor(){
      super();


      this.state={
        user_id:null,
        user_email:null,
        email_subject:"",
        email_message:"",
        loaded:false
      };
    }

    componentDidMount(){
      fetch("http://localhost:8080/CarRental/userlist/"+this.props.match.params.user_id)
      .then(response => response.json())
      .then(data => {this.setState({
        user_id:this.props.match.params.user_id,
        user_email:data.email,
        loaded:true
      })
      console.log(data.email);
      })
      .catch(error => {});


    }


    listOptions = optionElement=>{
        return <option key={optionElement} name={optionElement} id={optionElement} value={optionElement}>{optionElement}</option>;
    }

  	handleInputChange = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
  	}

    handleSubmit = (event) => {
      event.preventDefault();

    }

    renderForm = () => {

      return(
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <div className="row">
                  <label className="ml-1 mt-4 col-md-2">Subject:</label>
                  <div className="ml-4 mt-3 col-md-8">
                    <input type="text" className="form-control" name="email_subject" required value={this.state.email_subject} onChange={this.handleInputChange} />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <label className="ml-1 mt-4 col-md-2">Message:</label>
                  <div className="ml-4 mt-3 col-md-8">
                    <textarea rows="8" className="form-control" name="email_message" required value={this.state.email_message} onChange={this.handleInputChange}/>
                  </div>
                </div>
              </div>

              <div className="ml-4 my-4 text-center">
                <input type="submit" value="Send" required className="btn btn-primary"/>
              </div>
            </form>
          </div>
      );
    }

  	render () {
      const loaded = this.state.loaded;

  		return (
          <div className="col-md-9 pl-0 pr-3 mb-3 text-center">
            <div className="card">
              <HeaderContainer title={"Car - add"}/>
              {loaded ? this.renderForm() : <i className="fa fa-spinner fa-pulse fa-3x fa-fw "></i>}
            </div>
          </div>
  		)
  	}

  }
