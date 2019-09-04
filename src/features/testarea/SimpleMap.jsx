import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "semantic-ui-react";

const AnyReactComponent = () => <Icon name='map marker alternate' size='big' color='red' />;

class SimpleMap extends Component {
  static defaultProps = {
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA17w_UnGZsTmf_bfjItVytrnA26KPTenk" }}
          defaultCenter={this.props.latLng}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={this.props.latLng.lat} lng={this.props.latLng.lng} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
