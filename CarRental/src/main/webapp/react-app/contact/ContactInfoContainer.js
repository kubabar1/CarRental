import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/contact.css';
import {ContactData} from './ContactData.js';
import {SendMesage} from './SendMesage.js';

export class ContactInfoContainer extends React.Component {

  render () {
    return (
      <div id="contacts-info-container" className="container mb-5">
        <div className="row">
          <ContactData/>
          <SendMesage/>
        </div>
      </div>
    )
  }
}
