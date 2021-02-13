import React from 'react';
import { endpoints } from '../../../../../constants/PathsAPI';
import { optionsList } from '../../../../../utils/ReactUtil';

interface BrandProperties {
    brand: string | null;
    setBrand: (brand: string) => void;
}

interface BrandState {
    brandList: string[] | null;
}

export class Brand extends React.Component<BrandProperties, BrandState> {
    constructor(props: BrandProperties) {
        super(props);
        this.state = {
            brandList: null,
        };
    }

    componentDidMount() {
        fetch(endpoints.brandListEndpoint).then((response: Response) => {
            response.json().then((brandList: string[]) => {
                this.setState({ brandList: brandList });
            });
        });
    }

    render() {
        const brandList = this.state.brandList;

        return (
            <div className="form-group">
                <label>Marka:</label>
                <select
                    key="brand"
                    name="brand"
                    id="brand"
                    className="form-control"
                    value={this.props.brand || ''}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => this.props.setBrand(event.target.value)}
                >
                    <option value="" />
                    {brandList ? brandList.map(optionsList) : <option value="" />}
                </select>
            </div>
        );
    }
}
