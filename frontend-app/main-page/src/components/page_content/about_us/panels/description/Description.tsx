import React from 'react';
import './Description.scss';
import carRentalLogoName from '../../../../../images/car_rental_logo_name.png';

export class Description extends React.Component {
    render(): JSX.Element {
        return (
            <div id="car-rental-description-container" className="flow-container">
                <div id="car-rental-description">
                    <div className="container">
                        <img src={carRentalLogoName} alt="Logo" id="car-rental-logo-desc" className="mt-5" />
                        <p className="mt-5 ">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in
                            rhoncus ex. Cras hendrerit blandit ligula, at tempus dolor ultrices id. Sed porta justo
                            ligula. Donec pellentesque ornare blandit. Nam porta massa nec lorem cursus, facilisis
                            tristique neque luctus. Aliquam ac placerat massa, quis tristique odio. Ut maximus odio ac
                            magna ultricies pellentesque. Sed rhoncus pulvinar nulla, eget accumsan eros porta et.
                            Praesent tempor non enim quis imperdiet.Mauris euismod dictum urna, a placerat velit
                            tristique sed. Morbi aliquam nulla eget dignissim semper. Sed vel eros ut urna efficitur
                            interdum sed in dolor. Nam condimentum suscipit efficitur. Proin molestie lorem eu purus
                            aliquam, eget vehicula eros hendrerit. Cras vitae odio rutrum, venenatis risus nec, commodo
                            dolor.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
