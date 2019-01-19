import React from 'react';
import { LineTo, Line } from 'react-lineto';

import Square from './Square';

import socketIOClient from "socket.io-client";
const socket = socketIOClient('http://localhost:3001');

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
        this.startSocket();
    }

    startSocket = () => {
        socket.on('databaseUpdate', (update) => {
            this.setState({
                activeLegID: update.activeLegID,
                legProgress: update.legProgress
            });
        });
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

    
    calculateProgress = (point1, point2) => {
        let midpointX = point1.x + (point2.x - point1.x) * (this.state.legProgress / 100);
        let midpointY = point1.y + (point2.y - point1.y) * (this.state.legProgress / 100);

        return {'x': midpointX, 'y': midpointY};
    }

    renderLegs = () => {
        let legsArray = [];
        this.state.legs.map((leg) => {
            let startStop = this.state.stops.filter((stop) => {
                return stop.name === leg.startStop;
            });
            let endStop = this.state.stops.filter((stop) => {
                return stop.name === leg.endStop;
            });
            if(leg.legID < this.state.activeLegID) {
                legsArray.push(<Line 
                        x0={startStop[0].x * 7}
                        y0={120 + startStop[0].y * 7}
                        x1={endStop[0].x * 7}
                        y1={120 + endStop[0].y * 7}
                        borderColor='green'
                        borderWidth={2}
                    />
                );
            } else if (leg.legID > this.state.activeLegID) {
                legsArray.push(<Line 
                        x0={startStop[0].x * 7}
                        y0={120 + startStop[0].y * 7}
                        x1={endStop[0].x * 7}
                        y1={120 + endStop[0].y * 7}
                        borderColor='red'
                        borderWidth={2}
                    />
                );
            } else if (leg.legID === this.state.activeLegID) {
                let centrePoint = this.calculateProgress(startStop[0], endStop[0]);

                legsArray.push(<Line 
                        x0={startStop[0].x * 7}
                        y0={120 + startStop[0].y * 7}
                        x1={centrePoint.x * 7}
                        y1={120 + centrePoint.y * 7}
                        borderColor='green'
                        borderWidth={2}
                    />
                );
                legsArray.push(<Line 
                    x0={centrePoint.x * 7}
                    y0={120 + centrePoint.y * 7}
                    x1={endStop[0].x * 7}
                    y1={120 + endStop[0].y * 7}
                    borderColor='red'
                    borderWidth={2}
                />
            );
            }
        })
        return legsArray;
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
                                    return val.x === row && val.y === column;
                                });
                                if(stop.length > 0) {
                                    return <div className={stop[0].name}><Square key={column} stop='true'></Square></div>
                                }
                                return <Square key={column} stop='false'></Square>
                            })
                        }
                        </div>
                    })}
                    { this.renderLegs() } 
                </div>
            </div>
        )
    }
}