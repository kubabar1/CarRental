import React from 'react';
import { endpoints } from '../../../../../constants/PathsAPI';
import { optionsList } from '../../../../../utils/ReactUtil';

interface CityProperties {
    city: string | null;
    setCity: (city: string) => void;
}

interface CityState {
    cityList: string[] | null;
}

export class City extends React.Component<CityProperties, CityState> {
    constructor(props: CityProperties) {
        super(props);
        this.state = {
            cityList: null,
        };
    }

    componentDidMount() {
        fetch(endpoints.cityListEndpoint).then((response: Response) => {
            response.json().then((cityList: string[]) => {
                this.setState({ cityList: cityList });
            });
        });
    }

    render() {
        const cityList = this.state.cityList;

        return (
            <div className="form-group">
                <label>Miasto:</label>
                <select
                    id="city"
                    key="city"
                    name="city"
                    className="form-control"
                    value={this.props.city || ''}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => this.props.setCity(event.target.value)}
                >
                    <option value="" />
                    {cityList ? cityList.map(optionsList) : <option value="" />}
                </select>
            </div>
        );
    }
}
