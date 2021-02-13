import React from 'react';

interface DoorsCountProperties {
    setMinDoorsCount: (minDoorsCount: number) => void;
    setMaxDoorsCount: (maxDoorsCount: number) => void;
    minDoorsCount: number | null;
    maxDoorsCount: number | null;
}

export class DoorsCount extends React.Component<DoorsCountProperties> {
    constructor(props: DoorsCountProperties) {
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <label>Liczba drzwi:</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">od</span>
                    </div>
                    <input
                        id="minDoorsNumber"
                        key="minDoorsNumber"
                        type="text"
                        className="form-control"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            this.props.setMinDoorsCount(parseInt(event.target.value))
                        }
                        value = {this.props.minDoorsCount || ''}
                    />
                    <div className="input-group-prepend">
                        <span className="input-group-text">do</span>
                    </div>
                    <input
                        id="maxDoorsNumber"
                        key="maxDoorsNumber"
                        type="text"
                        className="form-control"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            this.props.setMinDoorsCount(parseInt(event.target.value))
                        }
                        value = {this.props.maxDoorsCount || ''}
                    />
                </div>
            </div>
        );
    }
}
