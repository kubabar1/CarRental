import React from 'react';
import {optionsList} from "../../../../../utils/ReactUtil";

interface ModelProperties {
    model: string | null;
    modelList: string[] | null;
    setModel: (brand: string) => void;
}

export class Model extends React.Component<ModelProperties> {
    constructor(props: ModelProperties) {
        super(props);
    }

    render() {
        const { model, modelList } = this.props;

        return (
            <div className="form-group">
                <label>Model:</label>
                <select
                    key="model"
                    name="model"
                    id="model"
                    className="form-control"
                    value={model || ''}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => this.props.setModel(event.target.value)}
                >
                    <option value="" />
                    {modelList ? modelList.map(optionsList) : <option value="" />}
                </select>
            </div>
        );
    }
}
