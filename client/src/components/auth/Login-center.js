import React, { Component } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import Service from "../../service/Auth_service";

class LoginCenterForm extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
    this.state = {
      showToast: false,
      toastText: "",
      user: { username: "", password: "" }
    };
  }

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({
      user: { ...this.state.user, [name]: value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state.user;
    this._service
      .loginCenter(username, password)
      .then(theLoggedUser => {
        this.props.setUser(theLoggedUser.data);
        this.setState({ username: "", password: "" });
        this.props.history.push("/"); // REDIRECCIONAMIENTO
      })
      .catch(err => {
        this.handleToastOpen(err.response.data.message);
      });
  };

  handleToastClose = () => this.setState({ showToast: false, toastText: "" });
  handleToastOpen = text => this.setState({ showToast: true, toastText: text });

  render() {
    return (
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Card
          bg="dark"
          text="white"
          style={{ width: "50vw", marginTop: "50px" }}
        >
          <Card.Header style={{ textAlign: "center" }}>
            CENTER LOGIN
          </Card.Header>
          <Card.Body>
            <Card.Text>
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
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={this.handleInputChange}
                    value={this.state.password}
                  />
                </Form.Group>
                <Row>
                  <Col
                    style={{ display: "flex", justifyContent: "center" }}
                    md={12}
                  >
                    <Button variant="light" type="submit">
                      Login
                    </Button>
                  </Col>
                  <Col
                    style={{ display: "flex", justifyContent: "center", textTransform: "uppercase" }}
                    md={12}
                  >
                    <Link
                      style={{ marginTop: "15px", color: "#FFF" }}
                      to="/loginUser"
                    >
                      Back to Login as a User
                    </Link>
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

export default LoginCenterForm;
