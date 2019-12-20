import React, { Component } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import Service from "../../service/Auth_service";

class LoginUserForm extends Component {
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
      .loginUser(username, password)
      .then(theLoggedUser => {
        this.props.setUser(theLoggedUser.data);
        this.setState({ username: "", password: "" });
        this.props.history.push("/"); // REDIRECCIONAMIENTO
      })
      .catch(err => {});
  };

  handleToastClose = () => this.setState({ showToast: false, toastText: "" });
  handleToastOpen = text => this.setState({ showToast: true, toastText: text });

  render() {
    return (
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Card
          className="signup-login"
          style={{ width: "50vw", marginTop: "50px" }}
        >
          <Card.Header style={{ textAlign: "center", color: "grey" }}>
            USER LOGIN
          </Card.Header>
          <Card.Body>
            <Card.Text style={{ color: "grey" }}>
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
                    <Button
                      variant="light"
                      type="submit"
                      style={{
                        color: "grey",
                        boxShadow: "5px 5px 10px 0px rgba(0, 0, 0, 0.75)",
                        textTransform: "uppercase"
                      }}
                    >
                      Login
                    </Button>
                  </Col>
                  <Col
                    style={{ display: "flex", justifyContent: "center" }}
                    md={12}
                  >
                    <Link
                      to="/loginCenter"
                      style={{
                        marginTop: "15px",
                        textTransform: "uppercase"
                      }}
                    >
                      Login as a Center
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

export default LoginUserForm;

// import { withRouter } from "react-router-dom"
// export default withRouter(loginUser)
