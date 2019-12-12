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

Geocode.setApiKey("AIzaSyBdergxMgHic2LH7s_ou7nmShy6smGNnPY");

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
          //console.log(elm.address);
          Geocode.fromAddress(elm.address)
            .then(
              response => {
                //console.log(response);
                const { lat, lng } = response.results[0].geometry.location;
                //console.log(lat, lng);
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
        }); // esto me da todas las coordenadas
      })
      .catch(err => console.log("Error", err));
  };

  setCenter = center => {
    //console.log(center)
    this.setState ({
      selectedCenter: center
    })
  }

  handleToggleOpen = idx => {
    //console.log(idx);
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
          <InfoWindow position={this.state.selectedCenter}>
            <small>
              {this.state.selectedCenter.lat}, {(this.state.selectedCenter.lng)}
            </small>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
