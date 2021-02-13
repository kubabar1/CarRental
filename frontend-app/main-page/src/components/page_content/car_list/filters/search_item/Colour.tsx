import React from 'react';
import { endpoints } from '../../../../../constants/PathsAPI';
import { optionsList } from '../../../../../utils/ReactUtil';

interface ColourProperties {
    colour: string | null;
    setColour: (colour: string) => void;
}

interface ColourState {
    colourList: string[] | null;
}

export class Colour extends React.Component<ColourProperties, ColourState> {
    constructor(props: ColourProperties) {
        super(props);
        this.state = {
            colourList: null,
        };
    }

    componentDidMount(): void {
        fetch(endpoints.coloursListEndpoint).then((response: Response) => {
            response.json().then((colourList: string[]) => {
                this.setState({ colourList: colourList });
            });
        });
    }

    render(): JSX.Element {
        const colourList = this.state.colourList;
        return (
            <div className="form-group">
                <label>Kolor:</label>
                <select
                    key="color"
                    name="color"
                    id="color"
                    className="form-control"
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => this.props.setColour(event.target.value)}
                    value={this.props.colour || ''}
                >
                    <option value="" />
                    {colourList ? colourList.map(optionsList) : <option value="" />}
                </select>
            </div>
        );
    }
}
