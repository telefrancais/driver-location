import React from 'react';
import Select from 'react-select';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //activeLegID: '',
            legProgress: 0,
            legIDs: [],
            selectedOption: null
        };
    }

    componentDidMount() {
        this.storeLegs();
        this.storeLocation();
    }

    storeLocation = async () => {
        let location = await fetch('/location');
        let json = await location.json();
        this.setState({
            selectedOption: json.activeLegID,
            legProgress: json.legProgress
        });
    }

    storeLegs = async () => {
        let legs = await fetch('/legs');
        let json = await legs.json();
        let legIDArray = json.map((leg) => {
            return { value: leg.legID, label: leg.legID };
        })
        this.setState({
            legIDs: legIDArray
        });
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    render() {
        const { selectedOption } = this.state;

        return (
            <div className="form">
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={this.state.legIDs}
                />
            </div>
        )
    }
}