import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Service from "../service/Auth_service"

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
  }

  logoutUser = () => {
    this._service
      .logout()
      .then(x => this.props.setUser(false))
      .catch(err => console.log(err));
  };

  render() {
    const saludo = this.props.loggedInUser
      ? this.props.loggedInUser.username
      : "invitado";

    return (
      <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Brand>WoofCollab</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link as="li">
              <Link to="/">Inicio</Link>
            </Nav.Link>
            <Nav.Link as="li">
              <Link to="/signup">Sign Up</Link>
            </Nav.Link>
            <Nav.Link as="li">
              <Link to="/login">Login</Link>
            </Nav.Link>
            <Nav.Link as="li">
              <Link to="/centers">Centers</Link>
            </Nav.Link>
            <Nav.Link as="li">
              <Link to="/centers-profile">CentersProfile</Link>
            </Nav.Link>
            <Nav.Link as="li">
              <Link to="/dogs">Adoption</Link>
            </Nav.Link>
            <Nav.Link as="li">
              <Link to="/logout">Logout</Link>
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Navbar.Text>Welcome {saludo}</Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
