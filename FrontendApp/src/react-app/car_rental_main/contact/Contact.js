import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';
import '../../../main/static/css/contact.css';
import {PageLocation} from './PageLocation.js';
import {Location} from './Location.js';
import {ContactInfoContainer} from './ContactInfoContainer.js';


export class Contact extends React.Component {

  render () {
    return (
      <div>
        <PageLocation/>
        <Location/>
        <ContactInfoContainer/>
      </div>
    )
  }
}
