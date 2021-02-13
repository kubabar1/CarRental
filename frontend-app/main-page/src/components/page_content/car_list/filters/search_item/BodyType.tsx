import React from 'react';
import { endpoints } from '../../../../../constants/PathsAPI';
import { optionsList } from '../../../../../utils/ReactUtil';

interface BodyTypeProperties {
    bodyType: string | null;
    setBodyType: (bodyType: string) => void;
}

interface BodyTypeState {
    bodyTypeList: string[] | null;
}

export class BodyType extends React.Component<BodyTypeProperties, BodyTypeState> {
    constructor(props: BodyTypeProperties) {
        super(props);
        this.state = {
            bodyTypeList: null,
        };
    }

    componentDidMount(): void {
        fetch(endpoints.bodyTypesListEndpoint).then((response: Response) => {
            response.json().then((bodyTypeList: string[]) => {
                this.setState({ bodyTypeList: bodyTypeList });
            });
        });
    }

    render(): JSX.Element {
        const bodyTypeList = this.state.bodyTypeList;

        return (
            <div className="form-group">
                <label>Typ nadwozia:</label>
                <select
                    id="bodyType"
                    key="bodyType"
                    className="form-control"
                    value={this.props.bodyType || ''}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                        this.props.setBodyType(event.target.value)
                    }
                >
                    <option value="" />
                    {bodyTypeList ? bodyTypeList.map(optionsList) : <option value="" />}
                </select>
            </div>
        );
    }
}
