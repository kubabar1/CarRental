import React from 'react';
import './Socials.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export function Socials() {
    const renderSocialIcon = (targetUrl: string, icon: IconProp, additionalClasses: string[] = []) => {
        const iconClasses = ['socials-icons'].concat(additionalClasses).join(' ');
        return (
            <a className={iconClasses} href={targetUrl} target="_blank">
                <FontAwesomeIcon icon={icon} />
            </a>
        );
    };

    return (
        <div id="footer-socials" className="col-lg-6 col-md-12 mt-3">
            <h5>Socials:</h5>
            <div className="row">
                {renderSocialIcon('https://www.facebook.com', faFacebook, ['facebook-icon'])}
                <br></br>
                {renderSocialIcon('https://www.twitter.com', faTwitter, ['twitter-icon'])}
                <br></br>
                {renderSocialIcon('https://www.instagram.com', faInstagram, ['instagram-icon'])}
                <br></br>
                {renderSocialIcon('https://www.youtube.com', faYoutube, ['youtube-icon'])}
                <br></br>
            </div>
        </div>
    );
}
