import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/contact.css';
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
