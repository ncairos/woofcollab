import React from "react";
import dogService from "../../service/Dog_service";
import authService from "../../service/Auth_service";

import commentService from "../../service/Comment_service";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

class DogProfile extends React.Component {
  constructor(props) {
    super(props);
    this._dogService = new dogService();
    this._commentService = new commentService();
    this._authService = new authService();

    this.state = {
      dog: {},
      comment: { name: "", message: "" }
    };
  }

  componentDidMount = () => {
    this.dogInfo();
  };

  dogInfo = () => {
    const dogId = this.props.match.params.id;
    this._dogService
      .getProfile(dogId)
      .then(theDog => this.setState({ dog: theDog.data }))
      .catch(err => console.log(err));
  };

  handleEmail = () => {
    const dogId = this.props.match.params.id;
    this._authService.sentEmail(dogId);
  };

  handleSubmit = e => {
    const dogId = this.props.match.params.id;
    e.preventDefault();
    this._commentService
      .postComment(this.state.comment, dogId)
      .then(() => this.dogInfo())
      .catch(err => console.log(err));
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({
      comment: { ...this.state.comment, [name]: value }
    });
  };

  render() {
    console.log(this.state.dog);
    return (
      <>
        <Container>
          <section>
            <Row>
              <Col md={4}>
                <Card
                  style={{
                    width: "100%",
                    height: "85vh",
                    backgroundColor: "rgba(255,255, 255, 0.5)"
                  }}
                >
                  <Card.Img variant="top" src={this.state.dog.imgPath} />
                  <Card.Body>
                    <Card.Title
                      style={{
                        textAlign: "center",
                        textTransform: "uppercase"
                      }}
                    >
                      <h2>This is {this.state.dog.name}</h2>
                    </Card.Title>
                    <hr></hr>
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
                      <strong>Personality:</strong> {this.state.dog.personality}
                      <br></br>
                      <strong>Description:</strong> {this.state.dog.description}
                      <br></br>
                    </Card.Text>
                    <Button variant="dark" onClick={this.handleEmail}>
                      Request
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col
                md={8}
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Card
                  style={{
                    height: "30vh",
                    backgroundColor: "rgba(255,255, 255, 0.5)"
                  }}
                >
                  <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>
                      <Link to={`/newCalendar/${this.state.dog._id}`}>
                        Book an Appointment
                      </Link>
                    </Card.Title>
                    <Card.Text style={{ height: "20vh", overflow: "scroll" }}>
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
                </Card>
                <Col
                  md={12}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "200px",
                    padding: "0"
                  }}
                >
                  <Col md={6} style={{ height: "55vh", padding: "0" }}>
                    <Card
                      style={{
                        width: "100%",
                        height: "55vh",
                        backgroundColor: "rgba(255,255, 255, 0.5)"
                      }}
                    >
                      <Card.Body>
                        <Card.Title style={{ textAlign: "center" }}>
                          <h3>Leave a comment</h3>
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
                    </Card>
                  </Col>
                  <Col
                    md={6}
                    style={{ height: "55vh", padding: "0", overflow: "scroll" }}
                  >
                    <Card
                      style={{
                        width: "100%",
                        height: "55vh",
                        background: "none"
                      }}
                    >
                      {this.state.dog.comments
                        ? this.state.dog.comments.map(elm => (
                            <Card
                              style={{
                                backgroundColor: "rgba(255,255, 255, 0.5)"
                              }}
                            >
                              <Card.Body>
                                <Card.Text>
                                  <strong
                                    style={{ textTransform: "uppercase" }}
                                  >
                                    {elm.name}
                                  </strong>
                                  <hr></hr>
                                  {elm.message}
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          ))
                        : null}
                    </Card>
                  </Col>
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
