import React from 'react';

interface ProductionYearProperties {
    setMinProductionYear: (minProductionYear: number) => void;
    setMaxProductionYear: (maxProductionYear: number) => void;
    minProductionYear: number | null;
    maxProductionYear: number | null;
}

export class ProductionYear extends React.Component<ProductionYearProperties> {
    constructor(props: ProductionYearProperties) {
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <label>Rok produkcji:</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">od</span>
                    </div>
                    <input
                        id="minProductionYear"
                        key="minProductionYear"
                        type="text"
                        className="form-control"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            this.props.setMinProductionYear(parseInt(event.target.value))
                        }
                        value={this.props.minProductionYear || ''}
                    />
                    <div className="input-group-prepend">
                        <span className="input-group-text">do</span>
                    </div>
                    <input
                        id="maxProductionYear"
                        key="maxProductionYear"
                        type="text"
                        className="form-control"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            this.props.setMaxProductionYear(parseInt(event.target.value))
                        }
                        value={this.props.maxProductionYear || ''}
                    />
                </div>
            </div>
        );
    }
}
