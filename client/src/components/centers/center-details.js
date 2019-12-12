import React, { Component } from "react";
import Service from "../../service/Center_service";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class CenterDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { center: {} };
    this._service = new Service();
  }

  componentDidMount = () => {
    const centerId = this.props.match.params.id;
    this._service
      .getOneCenter(centerId)
      .then(theCenter =>
        this.setState(
          { center: theCenter.data }
        )
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container className="center-details">
        <section>
          <Row>
            <Col mr={6}>
              <h1>{this.state.center.name}</h1>
              <div>
                <p>
                  <strong>Contact Details</strong>
                </p>
                <span>Phone Number: {this.state.center.contact}</span>
                <br></br>
                <span>Webpage: {this.state.center.webpage}</span>
                <br></br>
                <span>
                  Address: {this.state.center.address} | Zipcode:{" "}
                  {this.state.center.zipcode}
                </span>
                <span>walks: {this.walks} </span>
              </div>
              <hr></hr>
              <p></p>
              <Link to="/centers" className="btn btn-dark">
                Back to List
              </Link>
            </Col>
            <Col mr={4}>
              <img
                src={this.state.center.imgPath}
                alt={this.state.center.imgName}
                ></img>
            </Col>
          </Row>
        </section>
      </Container>
    );
  }
}


export default CenterDetails;
