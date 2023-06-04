import React from 'react';
import './ReservationPanel.scss';
import { ReservationWidget } from './reservation_widget/ReservationWidget';
import { AuthenticatedUserDTO } from '../../../../../model/AuthenticatedUserDTO';
import frontImage1 from '../../../../../images/front_image_1.jpg';
import frontImage2 from '../../../../../images/front_image_2.jpg';
import frontImage3 from '../../../../../images/front_image_3.jpg';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import classNames from 'classnames';

interface ReservationPanelProperties {
    authenticatedUser: AuthenticatedUserDTO | undefined;
}

export function ReservationPanel({ authenticatedUser }: ReservationPanelProperties): JSX.Element {
    const [selectedCarouselItem, setSelectedCarouselItem] = React.useState<number>(0);

    return (
        <div className="reservation-panel-container">
            <Carousel
                autoPlay
                infiniteLoop
                showArrows={false}
                showStatus={false}
                showThumbs={false}
                interval={4000}
                renderIndicator={(
                    clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
                    isSelected: boolean,
                    index: number
                ): React.ReactNode => {
                    return (
                        <button
                            className={classNames('carousel-indicator', {
                                'carousel-indicator-active': isSelected,
                            })}
                            onClick={() => setSelectedCarouselItem(index)}
                        />
                    );
                }}
                onChange={(index: number) => {
                    setSelectedCarouselItem(index);
                }}
                selectedItem={selectedCarouselItem}
            >
                <div className="reservation-slide-container">
                    <img className="d-block" src={frontImage1} />
                </div>
                <div className="reservation-slide-container">
                    <img className="d-block" src={frontImage2} />
                </div>
                <div className="reservation-slide-container">
                    <img className="d-block" src={frontImage3} />
                </div>
            </Carousel>
            <ReservationWidget authenticatedUser={authenticatedUser} />
        </div>
    );
}
