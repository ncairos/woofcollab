import React, { Component } from "react";
import Service from "../service/Center_service";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import Geocode from "react-geocode";

Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_KEY}`);

class Map extends Component {
  constructor() {
    super();
    this._service = new Service();
    this.state = {
      centers: [],
      address: "",
      addresses: [],
      isOpen: false,
      selectedCenter: null
    };
  }

  componentDidMount = () => {
    this._service
      .getAllCenters()
      .then(allCentersFromDB => {
        this.setState({ centers: allCentersFromDB.data });
        const addressesCopy = [...this.state.addresses];
        this.state.centers.forEach(elm => {
          Geocode.fromAddress(elm.address)
            .then(
              response => {
                const { lat, lng } = response.results[0].geometry.location;
                addressesCopy.push({ lat, lng });
                this.setState({
                  address: { lat, lng },
                  addresses: addressesCopy
                });
              },
              error => {
                console.error(error);
              }
            )
            .catch(err => console.log(err));
        });
      })
      .catch(err => console.log("Error", err));
  };

  setCenter = center => {
    this.setState({
      selectedCenter: center
    });
  };

  handleToggleOpen = idx => {
    this.setState({
      isOpen: true
    });
  };

  handleToggleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 40.4165, lng: -3.70256 }}
      >
        {this.state.addresses.map((elm, idx) => (
          <>
            <Marker
              key={idx}
              position={elm}
              onClick={() => this.setCenter(elm)}
            ></Marker>
          </>
        ))}
        {this.state.selectedCenter && (
          <InfoWindow
            position={this.state.selectedCenter}
            onCloseClick={() => {
              this.setCenter(null);
            }}
          >
            <small>
              {this.state.selectedCenter.lat}, {this.state.selectedCenter.lng}
            </small>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
