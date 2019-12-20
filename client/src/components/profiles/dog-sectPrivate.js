import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import dogService from "../../service/Dog_service";
import {Link} from "react-router-dom"

class DogSectionPriv extends Component {
  constructor(props) {
    super(props);
    this._dogService = new dogService();
  }

  render() {
    return (
      <>
        <Row className="center-dogCard" md={12}>
          <Col md={4}>
            <img src={this.props.imgPath} alt={this.props.imgName} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="light"
                size="sm"
                className="btn-profile"
                style={{marginTop: "10px"}}
                onClick={() => this.props.delete(this.props._id)}
              >
                Delete
              </Button>
            </div>
          </Col>
          <Col md={8}>
            <Link to={`/dog/${this.props._id}`}>
              <h4 style={{ textTransform: "uppercase" }}>{this.props.name}</h4>
            </Link>
            <strong>
              <span>Sex: {this.props.sex}</span> |{" "}
              <span>Age: {this.props.age} years</span> |{" "}
              <span>Weight: {this.props.weight} kl</span> |{" "}
              <span>Size: {this.props.size}</span>
            </strong>
            <p>
              <span>
                <strong>Breed: </strong>
                {this.props.breed}
              </span>
              <br />
              <span>
                <strong>Color: </strong>
                {this.props.color}
              </span>
              <br />
              <span>
                <strong>Personality: </strong>
                {this.props.personality}
              </span>
              <br />
              <span>
                <strong>Description:</strong>
                {this.props.description}
              </span>
            </p>
          </Col>
        </Row>
        <hr />
      </>
    );
  }
}

export default DogSectionPriv;
