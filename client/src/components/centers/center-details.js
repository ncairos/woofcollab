import React, { Component } from "react";
import CenterService from "../../service/Center_service";
import DogService from "../../service/Dog_service";
import DogSectionPub from "../centers/dog-sectPublic";
import { Container, Row, Col, Card } from "react-bootstrap";

class CenterDetails extends Component {
  constructor(props) {
    super(props);
    this._centerService = new CenterService();
    this._dogService = new DogService();
    this.state = { center: {} };
  }

  componentDidMount = () => {
    const centerId = this.props.match.params.id;
    this._centerService
      .getOneCenter(centerId)
      .then(theCenter => this.setState({ center: theCenter.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <Container style={{ color: "grey" }}>
          <section>
            <Row>
              <Col md={4}>
                <Card
                  style={{
                    width: "100%",
                    height: "85vh",
                    backgroundColor: "rgba(255,255, 255, 0.5)",
                    boxShadow: "10px 10px 15px 0px rgba(0, 0, 0, 0.75)"
                  }}
                >
                  <Card.Img variant="top" src={this.state.center.imgPath} />
                  <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>
                      <h2>{this.state.center.name}</h2>
                    </Card.Title>
                    <Card.Text>
                      <strong>Bio:</strong> {this.state.center.bio}
                      <br />
                      <strong>Email:</strong> {this.state.center.email}
                      <br />
                      <strong>Contact:</strong> {this.state.center.contact}
                      <br />
                      <strong>Webpage:</strong> {this.state.center.webpage}
                      <br />
                      <strong>Address:</strong> {this.state.center.address}
                      <br />
                      <strong>Zipcode:</strong> {this.state.center.zipcode}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={8}>
                <Row>
                  <Card
                    style={{
                      width: "100%",
                      height: "85vh",
                      backgroundColor: "rgba(255,255, 255, 0.5)",
                      boxShadow: "10px 10px 15px 0px rgba(0, 0, 0, 0.75)"
                    }}
                  >
                    <Card.Body>
                      <Card.Title
                        className="woof-list"
                        style={{ textAlign: "center" }}
                      >
                        <h3>WOOF LIST</h3>
                      </Card.Title>
                      <Card.Text>
                        <Col className="dog-section2">
                          {this.state.center.walks
                            ? this.state.center.walks.map(elm => (
                                <DogSectionPub key={elm._id} {...elm} />
                              ))
                            : null}
                        </Col>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Row>
              </Col>
            </Row>
          </section>
        </Container>
      </>
    );
  }
}

export default CenterDetails;
