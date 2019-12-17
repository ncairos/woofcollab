import React from "react";
import dogService from "../../service/Dog_service";
import calendarService from "../../service/Calendar_service";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class DogProfile extends React.Component {
  constructor(props) {
    super(props);
    this._dogService = new dogService();
    this.state = {
      dog: {}
    };
  }

  componentDidMount = () => {
    const dogId = this.props.match.params.id;
    this._dogService
      .getProfile(dogId)
      .then(theDog => this.setState({ dog: theDog.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <Container>
          <section>
            <Row>
              <Col md={12}>
                <Card
                  style={{
                    height: "35vh",
                    backgroundColor: "rgba(255,255, 255, 0.5)"
                  }}
                >
                  <Row>
                    <Col md={4}>
                      <Card.Img
                        variant="top"
                        src={this.state.dog.imgPath}
                        style={{ height: "95%", objectFit: "cover" }}
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <Card.Title style={{ textTransform: "uppercase" }}>
                          <h2>This is {this.state.dog.name}</h2>
                        </Card.Title>
                        <Card.Text>
                          <strong>Sex:</strong> {this.state.dog.sex}
                          <br></br>
                          <strong>Age:</strong> {this.state.dog.age}
                          <br></br>
                          <strong>Weight:</strong> {this.state.dog.weight}
                          <br></br>
                          <strong>Size:</strong> {this.state.dog.size}
                          <br></br>
                          <strong>Breed:</strong> {this.state.dog.breed}
                          <br></br>
                          <strong>Color:</strong> {this.state.dog.color}
                          <br></br>
                          <strong>Personality:</strong>{" "}
                          {this.state.dog.personality}
                          <br></br>
                          <strong>Description:</strong>{" "}
                          {this.state.dog.description}
                          <br></br>
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Card
                  style={{
                    height: "50vh",
                    backgroundColor: "rgba(255,255, 255, 0.5)"
                  }}
                >
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title>
                        <h3>PROXIMAMENTE CALENDARIO DE CITAS</h3>
                      </Card.Title>
                      <Card.Text>
                        <Link to={`/newCalendar/${this.state.dog._id}`}>
                          Book an Appointment
                        </Link>
                        <br></br>
                        {this.state.dog.calendar
                          ? this.state.dog.calendar.map(elm => (
                              <p>
                                <strong style={{ textTransform: "uppercase" }}>
                                  {elm.title} | |{" "}
                                </strong>
                                {elm.start}
                              </p>
                            ))
                          : null}
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Card>
              </Col>
              <Col md={6}>
                <Card
                  style={{
                    height: "50vh",
                    backgroundColor: "rgba(255,255, 255, 0.5)"
                  }}
                >
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title>
                        <h3>PROXIMAMENTE COMMENT SECTION</h3>
                      </Card.Title>
                      <Card.Text></Card.Text>
                    </Card.Body>
                  </Col>
                </Card>
              </Col>
            </Row>
          </section>
        </Container>
      </>
    );
  }
}

export default DogProfile;
