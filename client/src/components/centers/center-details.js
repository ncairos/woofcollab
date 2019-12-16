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
        <Container>
          <section>
            <Row>
              <Col md={4}>
                <Card style={{ width: "100%", height: "85vh", backgroundColor: "rgba(255,255, 255, 0.5)" }}>
                  <Card.Img variant="top" src={this.state.center.imgPath} />
                  <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>
                      {this.state.center.name}
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
                  <Card style={{ width: "100%", height: "85vh", backgroundColor: "rgba(255,255, 255, 0.5)" }}>
                    <Card.Body>
                      <Card.Title className="woof-list">WOOF LIST</Card.Title>
                      <Card.Text>
                        <Col className="dog-section">
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

      // <Container className="center-details">
      //   <section>
      //     <Row>
      //       <Col mr={6}>
      //         <h2>{this.state.center.name}</h2>
      //         <div>
      //           <p>
      //             <strong>Contact Details</strong>
      //           </p>
      //           <span>Phone Number: {this.state.center.contact}</span>
      //           <br></br>
      //           <span>Webpage: {this.state.center.webpage}</span>
      //           <br></br>
      //           <span>
      //             Address: {this.state.center.address} | Zipcode:{" "}
      //             {this.state.center.zipcode}
      //           </span>
      //           <br></br>
      //         </div>
      //         <hr></hr>
      //         <Link to="/centers" className="btn btn-dark">
      //           Back to List
      //         </Link>
      //       </Col>
      //       <Col mr={4}>
      //         <img
      //           src={this.state.center.imgPath}
      //           alt={this.state.center.imgName}
      //         ></img>
      //         <Col mr={12}>
      //           {this.state.center.walks
      //             ? this.state.center.walks.map(elm => <p>{elm.name}</p>)
      //             : null}
      //         </Col>
      //       </Col>
      //     </Row>
      //   </section>
      // </Container>
    );
  }
}

export default CenterDetails;
