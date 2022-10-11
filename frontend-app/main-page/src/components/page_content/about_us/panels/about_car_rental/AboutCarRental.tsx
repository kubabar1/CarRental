import React from 'react';
import './AboutCarRental.scss';
import shelby from '../../../../../images/shelby_gt500.jpg';

export function AboutCarRental(): JSX.Element {
    return (
        <div id="about-car-rental" className="container">
            <h1 className="mt-4">About us</h1>
            <div className="row mb-5">
                <div className="mt-4 col-md-6 car-image-container">
                    <img src={shelby} alt={'CarImage'} />
                </div>
                <div className="mt-4 col-md-6">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in
                        rhoncus ex. Cras hendrerit blandit ligula, at tempus dolor ultrices id. Sed porta justo ligula.
                        Donec pellentesque ornare blandit. Nam porta massa nec lorem cursus, facilisis tristique neque
                        luctus. Aliquam ac placerat massa, quis tristique odio. Ut maximus odio ac magna ultricies
                        pellentesque. Sed rhoncus pulvinar nulla, eget accumsan eros porta et. Praesent tempor non
                        enimquisimperdiet.Mauris euismod dictum urna, a placerat velit tristique sed. Morbi aliquam
                        nulla eget dignissim semper. Sed vel eros ut urna efficitur interdum sed in dolor. Nam
                        condimentum suscipit efficitur. Proin molestie lorem eu purus aliquam, eget vehicula eros
                        hendrerit. Cras vitae odio rutrum, venenatis risus nec, commodo dolor.
                    </p>
                </div>
            </div>
        </div>
    );
}
