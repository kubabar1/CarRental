import React from 'react';

interface SeatsCountProperties {
    setMinSeatsCount: (minSeatsCount: number) => void;
    setMaxSeatsCount: (maxSeatsCount: number) => void;
    minSeatsCount: number | null;
    maxSeatsCount: number | null;
}

export class SeatsCount extends React.Component<SeatsCountProperties> {
    constructor(props: SeatsCountProperties) {
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <label>Liczba miejsc:</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">od</span>
                    </div>
                    <input
                        key="minSeatsCount"
                        name="minSeatsCount"
                        id="minSeatsCount"
                        type="text"
                        className="form-control"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            this.props.setMinSeatsCount(parseInt(event.target.value))
                        }
                        value = {this.props.minSeatsCount || ''}
                    />
                    <div className="input-group-prepend">
                        <span className="input-group-text">do</span>
                    </div>
                    <input
                        key="maxSeatsCount"
                        name="maxSeatsCount"
                        id="maxSeatsCount"
                        type="text"
                        className="form-control"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            this.props.setMaxSeatsCount(parseInt(event.target.value))
                        }
                        value = {this.props.maxSeatsCount || ''}
                    />
                </div>
            </div>
        );
    }
}
