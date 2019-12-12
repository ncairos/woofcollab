import React, { Component } from "react";
import { Button, Form, Container } from "react-bootstrap";

import Service from "../../service/Auth_service";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
    this.state = { username: "", email: "", password: "" };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    this._service
      .signup(username, email, password)
      .then(theNewUser => {
        this.props.setUser(theNewUser.data);
        this.setState({ username: "", email: "", password: "" });
        this.props.history.push("/"); // REDIRECCIONAMIENTO
      })
      .catch(err => console.log(err.response.data.message));
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Container>
        <h1>Registro</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Usuario</Form.Label>
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
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Registrarme
          </Button>
        </Form>
      </Container>
    );
  }
}

export default SignupForm;
