import React from 'react';

import Square from './Square';

let sizeArray = Array.from(new Array(200), (item, index) => index + 1);

export default class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeLegID: '',
            legProgress: 0,
            stops: [],
            legs: []
        };
    }

    componentDidMount() {
        this.storeLocation();
        this.storeStops();
        this.storeLegs();
    }

    storeLocation = async () => {
        let location = await fetch('/location');
        let json = await location.json();
        this.setState({
            activeLegID: json.activeLegID,
            legProgress: json.legProgress
        });
    }

    getSingleStop = async (row, column) => {
        let stop = await fetch(`/location/{row}/{column}`);
        return stop;
    }

    storeStops = async () => {
        let stops = await fetch('/stops');
        let json = await stops.json();
        this.setState({
            stops: json
        });
    }

    storeLegs = async () => {
        let legs = await fetch('/legs');
        let json = await legs.json();
        this.setState({
            legs: json
        });
    }
    
    render() {
        return (
            <div className="grid">
                <div className="grid__container">
                {sizeArray.map((row) => {
                        return <div key={row} className="grid__row">
                        {
                            sizeArray.map((column) => {
                                const stop = this.state.stops.filter((val) => {
                                    return val.x == row && val.y == column;
                                });
                                if(stop.length > 0) {
                                    return <Square key={column} stop='true'></Square>
                                }
                                return <Square key={column} stop='false'></Square>
                            })
                        }
                        </div>
                    })}
                </div>
            </div>
        )
    }
}