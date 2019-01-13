import React, { Component } from 'react';

import Header from './components/Header';
import Body from './components/Body';

//import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeLegID: '',
            legProgress: 0
        };
    }

    componentDidMount() {
        //this.updateLocation();
    }

    getLocation = async () => {
        let location = await fetch('/location');
        let json = await location.json();
        this.setState({
            activeLegID: json.activeLegID,
            legProgress: json.legProgress
        });
    }

    updateLocation = async () => {
        let newLocation = {
            legID: 'CD',
            progress: 41
        };
        let update = await fetch('/location', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLocation)
        });
        let json = await update.json();
        this.setState({
            activeLegID: json.activeLegID, 
            legProgress: json.legProgress
        });
    }

    render() {
        return (
            <div className="App">
                <Header />
                <Body />
                {/* <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        {this.state.legProgress}
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header> */}
            </div>
        );
    }
}

export default App;
