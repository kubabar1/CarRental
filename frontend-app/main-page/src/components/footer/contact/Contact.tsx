import React from 'react';
import './Contact.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobile, faPhone } from '@fortawesome/free-solid-svg-icons';

export function Contact() {
    return (
        <div id="footer-contacts" className="col-lg-4 col-md-12 mt-3">
            <h5 className="linkstyle_black">Contact us:</h5>
            <div className="contacts-container">
                <FontAwesomeIcon className="linkstyle_black font-awesome-additional-styles" icon={faPhone} />
                <p className="linkstyle_black contact-text">423 232 123</p>
            </div>
            <div className="contacts-container">
                <FontAwesomeIcon className="linkstyle_black font-awesome-additional-styles" icon={faMobile} />
                <p className="linkstyle_black contact-text">948 132 423</p>
            </div>
            <div className="contacts-container">
                <FontAwesomeIcon className="linkstyle_black font-awesome-additional-styles" icon={faEnvelope} />
                <a className='contact-text' href="mailto:car.rental@test.com">car.rental@test.com</a>
            </div>
        </div>
    );
}