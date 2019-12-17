import React, { Component } from "react";
import { Button, Form, Container, Card, Row, Col } from "react-bootstrap";

import Service from "../../service/Auth_service";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
    this.state = { username: "", email: "", password: "", checked: false };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, email, password, checked } = this.state;
    this._service
      .signup(username, email, password, checked)
      .then(theNewUser => {
        this.props.setUser(theNewUser.data);
        this.setState({ username: "", email: "", password: "" });
        this.props.history.push("/"); // REDIRECCIONAMIENTO
      })
      .catch(err => console.log({ err }));
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value, checked: e.target.checked });
  };

  render() {
    return (
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Card
          className="signup-login"
          text="white"
          style={{ width: "50vw", marginTop: "50px" }}
        >
          <Card.Header style={{ textAlign: "center", color: "black" }}>
            USER SIGN UP
          </Card.Header>
          <Card.Body>
            <Card.Text style={{ color: "black" }}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    onChange={this.handleInputChange}
                    value={this.state.username}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={this.handleInputChange}
                    value={this.state.email}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={this.handleInputChange}
                    value={this.state.password}
                  />
                </Form.Group>
                <Form.Group id="formGridCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Check as a Center"
                    name="checked"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Row>
                  <Col
                    style={{ display: "flex", justifyContent: "center" }}
                    md={12}
                  >
                    <Button variant="light" type="submit">
                      Sign Up
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default SignupForm;
