import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Service from "../service/Auth_service";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
  }

  logoutUser = () => {
    this._service
      .logout()
      .then(() => this.props.setUser(false))
      .catch(err => console.log(err));
    //this.props.history.push("/")
  };

  render() {
    const saludo = this.props.loggedInUser
      ? this.props.loggedInUser.username
      : "Guest";

    if (this.props.loggedInUser && this.props.loggedInUser.role === "center") {
      return (
        <Navbar style={{ backgroundColor: "grey" }} expand="md">
          <Navbar.Brand>
            <img
              className="brand-logo"
              src="https://res.cloudinary.com/woofcollab/image/upload/v1576787011/dogs/Layer5_xt7mc5.png"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <Nav.Link as="li">
                <Link to="/">Inicio</Link>
              </Nav.Link>
              <Nav.Link as="li">
                <Link to={`/center-profile/${this.props.loggedInUser._id}`}>
                  Profile
                </Link>
              </Nav.Link>
              <Nav.Link as="li">
                <Link to="/centers">Centers</Link>
              </Nav.Link>
              <Nav.Link as="li">
                <Link to="/dogs">Adoption</Link>
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Navbar.Text>Welcome {saludo}</Navbar.Text>
              <Nav.Link as="li" onClick={this.logoutUser}>
                <Link to={"/"}>Logout</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else if (
      this.props.loggedInUser &&
      this.props.loggedInUser.role === "user"
    ) {
      return (
        <Navbar style={{ backgroundColor: "grey" }} expand="md">
          <Navbar.Brand>
            <img
              className="brand-logo"
              src="https://res.cloudinary.com/woofcollab/image/upload/v1576787011/dogs/Layer5_xt7mc5.png"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <Nav.Link as="li">
                <Link to="/">Inicio</Link>
              </Nav.Link>
              <Nav.Link as="li">
                <Link to={`/user-profile/${this.props.loggedInUser._id}`}>
                  Profile
                </Link>
              </Nav.Link>
              <Nav.Link as="li">
                <Link to="/centers">Centers</Link>
              </Nav.Link>

              <Nav.Link as="li">
                <Link to="/dogs">Adoption</Link>
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Navbar.Text>Welcome {saludo}</Navbar.Text>
              <Nav.Link as="li" onClick={this.logoutUser}>
                <Link to={"/"}>Logout</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else {
      return (
        <Navbar style={{ backgroundColor: "grey" }} expand="md">
          <Navbar.Brand>
            <img
              className="brand-logo"
              src="https://res.cloudinary.com/woofcollab/image/upload/v1576787011/dogs/Layer5_xt7mc5.png"
              alt="logo"
            />
          </Navbar.Brand>
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
                <Link to="/loginUser">Login</Link>
              </Nav.Link>
              <Nav.Link as="li">
                <Link to="/centers">Centers</Link>
              </Nav.Link>
              <Nav.Link as="li">
                <Link to="/dogs">Adoption</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  }
}

export default NavigationBar;
