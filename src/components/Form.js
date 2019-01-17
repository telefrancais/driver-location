import React from 'react';
import Select from 'react-select';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import socketIOClient from "socket.io-client";
const socket = socketIOClient('http://localhost:3001');

const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeLegID: '',
            legProgress: 0,
            legIDs: []
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
            activeLegID: json.activeLegID,
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

    updateDatabase = async (data) => {
        await fetch('/location', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ legID: data.activeLegID, progress: data.legProgress })
        });
    }

    handleSelectChange = (selectedOption) => {
        let data = {activeLegID: selectedOption.value, legProgress: this.state.legProgress};
        socket.emit('updateData', data);
        this.updateDatabase(data);
        this.setState({ 
            activeLegID: selectedOption 
        });
    }

    onSliderChange = (value) => {
        let data = {activeLegID: this.state.activeLegID.value, legProgress: value};
        socket.emit('updateData', data);
        this.updateDatabase(data);
        this.setState({
            legProgress: value
        });
    }

    render() {
        return (
            <div className="form">
                <div className="form__box">
                    <p className="form__text">Driver's Current Leg</p>
                    <Select
                        //value={this.state.activeLegID}
                        defaultValue={this.state.activeLegID}
                        onChange={this.handleSelectChange}
                        options={this.state.legIDs}
                        className="form__select"
                    />
                </div>
                <div className="form__box">
                    <p className="form__text">Driver's Current Progress</p>
                    <Slider min={0} max={100} value={this.state.legProgress} handle={handle} onChange={this.onSliderChange} />
                </div>
            </div>
        )
    }
}