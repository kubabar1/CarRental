import React from 'react';
import './MobilePagePanel.scss';
import mobileApp from '../../../../../images/mobile_app.png';
import qr from '../../../../../images/qr.svg';
import { faGooglePlay, faApple } from '@fortawesome/free-brands-svg-icons';
import { DownloadAppLink } from './DownloadAppLink';

export function MobilePagePanel() {
    const googlePlayLink = 'https://play.google.com/';
    const appStoreLink = 'https://www.apple.com/app-store/';

    return (
        <div className="mobile-page-panel-container container-fluid">
            <div className="mobile-image-container">
                <img src={mobileApp} />
            </div>
            <div className="download-app-container">
                <div className="download-app-text-container">Download our app</div>
                <div className="download-app-description-container">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus
                    ex. Cras hendrerit blandit ligula, at tempus dolor ultrices id. Sed porta justo ligula. Donec
                    pellentesque ornare blandit. Nam porta massa nec lorem cursus, facilisis tristique neque luctus.
                    Aliquam ac placerat massa, quis tristique odio. Ut maximus odio ac magna ultricies pellentesque. Sed
                    rhoncus pulvinar nulla, eget accumsan eros porta et. Praesent tempor non enimquisimperdiet.
                </div>
                <div className="download-app-links-qr-container">
                    <div className="download-app-links-container">
                        <DownloadAppLink shopName={'Google Play'} shopIcon={faGooglePlay} shopLink={googlePlayLink} />
                        <DownloadAppLink shopName={'App Store'} shopIcon={faApple} shopLink={appStoreLink} />
                    </div>
                    <div className="download-app-qr-container">
                        <img src={qr} />
                    </div>
                </div>
            </div>
        </div>
    );
}
