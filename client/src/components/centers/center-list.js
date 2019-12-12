import React, { Component } from "react";
import Service from "../../service/Center_service";

import CenterCard from "./center-card";

import WrappedMap from "../map";

import { Container, Row, Col } from "react-bootstrap";

class CenterList extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
    this.state = {
      centers: [],
    };
  }

  componentDidMount = () => {
    this._service
      .getAllCenters()
      .then(allCentersFromDB =>
        // {console.log(allCentersFromDB)
        {
          this.setState({ centers: allCentersFromDB.data });
        }
      )
      .catch(err => console.log("Error", err));
  };

  render() {
    return (
      <section>
        <Container>
          <Row>
            <Col md={6}>
              <div style={{ width: "100%", height: "85vh" }}>
                <WrappedMap
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBdergxMgHic2LH7s_ou7nmShy6smGNnPY`}
                  loadingElement={<div style={{ height: "100%" }} />}
                  containerElement={<div style={{ height: "100%" }} />}
                  mapElement={<div style={{ height: "100%" }} />}
                />
              </div>
            </Col>
            <Col className="list-group" md={6}>
              {this.state.centers.map(center => (
                <CenterCard key={center._id} {...center} />
              ))}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}
export default CenterList;
