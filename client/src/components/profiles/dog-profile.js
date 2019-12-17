import React from "react";
import dogService from "../../service/Dog_service";
import commentService from "../../service/Comment_service";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

class DogProfile extends React.Component {
  constructor(props) {
    super(props);
    this._dogService = new dogService();
    this._commentService = new commentService();
    this.state = {
      dog: {},
      comment: { name: "", message: "" }
    };
  }

  componentDidMount = () => {
    const dogId = this.props.match.params.id;
    this._dogService
      .getProfile(dogId)
      .then(theDog => this.setState({ dog: theDog.data }))
      .catch(err => console.log(err));
  };

  handleSubmit = e => {
    const dogId = this.props.match.params.id;
    e.preventDefault();
    this._commentService
      .postComment(this.state.comment, dogId)
      .catch(err => console.log(err));
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({
      comment: { ...this.state.comment, [name]: value }
    });
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
                          <strong>Sexo:</strong> {this.state.dog.sex}
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
                  <Col md={12}>
                    <Card.Body>
                      <Card.Title style={{ textAlign: "center" }}>
                        <Link to={`/newCalendar/${this.state.dog._id}`}>
                          Book an Appointment
                        </Link>
                      </Card.Title>
                      <Card.Text>
                        <br></br>
                        {this.state.dog.calendar
                          ? this.state.dog.calendar.map(elm => (
                              <p>
                                <strong style={{ textTransform: "uppercase" }}>
                                  {elm.title} |{" "}
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
                  <Col md={12}>
                    <Card.Body>
                      <Card.Title>
                        <h3>PROXIMAMENTE COMMENT SECTION</h3>
                      </Card.Title>
                      <Card.Text>
                        <Form onSubmit={this.handleSubmit}>
                          <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              onChange={this.handleInputChange}
                              value={this.state.comment.name}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                              as="textarea"
                              type="text"
                              name="message"
                              row="5"
                              onChange={this.handleInputChange}
                              value={this.state.comment.message}
                            />
                          </Form.Group>
                          <Button
                            variant="dark"
                            size="sm"
                            type="submit"
                            onClick={this.handleSubmit}
                          >
                            Send Comment
                          </Button>
                        </Form>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Card>
                  <Col md={12}>
                    {this.state.dog.comments
                      ? this.state.dog.comments.map(elm => (
                          <p>
                            <strong style={{ textTransform: "uppercase" }}>
                              {elm.name} |{" "}
                            </strong>
                            {elm.message}
                          </p>
                        ))
                      : null}
                  </Col>
              </Col>
            </Row>
          </section>
        </Container>
      </>
    );
  }
}

export default DogProfile;
