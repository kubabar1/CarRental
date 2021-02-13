import React from 'react';

interface PriceProperties {
    setMinPrice: (minSeatsCount: number) => void;
    setMaxPrice: (maxSeatsCount: number) => void;
    minPrice: number | null;
    maxPrice: number | null;
}

export class Price extends React.Component<PriceProperties> {
    constructor(props: PriceProperties) {
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <label>Cena:</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">od</span>
                    </div>
                    <input
                        id="minPrice"
                        key="minPrice"
                        type="text"
                        className="form-control"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            this.props.setMinPrice(parseInt(event.target.value))
                        }
                        value = {this.props.minPrice || ''}
                    />
                    <div className="input-group-prepend">
                        <span className="input-group-text">do</span>
                    </div>
                    <input
                        id="maxPrice"
                        key="maxPrice"
                        type="text"
                        className="form-control"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            this.props.setMaxPrice(parseInt(event.target.value))
                        }
                        value = {this.props.maxPrice || ''}
                    />
                </div>
            </div>
        );
    }
}
