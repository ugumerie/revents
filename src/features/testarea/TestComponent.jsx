import React, { Component } from "react";
import { connect } from "react-redux";
import { incrementCounter, decrementCounter } from "./testActions";
import { Button } from "semantic-ui-react";
import TestInput from "./TestInput";
import SimpleMap from "./SimpleMap";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { openModal } from "../modals/modalActions";

const mapState = state => ({
  data: state.test.data
});

const actions = {
  incrementCounter,
  decrementCounter,
  openModal
};

class TestComponent extends Component {
  state = {
    latLng: {
      lat: 59.95,
      lng: 30.33
    }
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log("Success", latLng);
        this.setState({
          latLng: latLng
        });
      })
      .catch(error => console.error("Error", error));
  };

  render() {
    const { data, incrementCounter, decrementCounter, openModal } = this.props;

    return (
      <div>
        <h1>Test Component</h1>
        <h3>The answer: {data}</h3>
        <Button onClick={incrementCounter} positive content='Increment' />
        <Button onClick={decrementCounter} negative content='Decrement' />
        <Button
          onClick={() => openModal("TestModal", { data: 42 })}
          color='teal'
          content='Open Modal'
        />
        <br />
        <br />
        <TestInput selectAddress={this.handleSelect} />
        <SimpleMap key={this.state.latLng.lng} latLng={this.state.latLng} />
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(TestComponent);
