import React from "react";
import authService from "../../service/Auth_service";
import UserEdit from "./user-edit";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this._authService = new authService();
    this.state = {
      user: {},
      showModalEdit: false
    };
  }

  componentDidMount = () => {
    this.userInfo();
  };

  userInfo = () => {
    const userId = this.props.match.params.userId;
    this._authService
      .getProfile(userId)
      .then(theUser => this.setState({ user: theUser.data }))
      .catch(err => console.log(err));
  };

  handleSubmit = (e, data) => {
    e.preventDefault();
    const userId = this.state.user._id;
    this._authService
      .editUser(userId, data)
      .then(theUser => {
        this.setState({ user: { ...this.state.user, ...data } });
        this.handleCloseEdit();
      })
      .catch(err => {
        console.log(err);
      });
  };

  //----------EDIT CENTER MODAL HANDLE----------//
  handleShowEdit = () => this.setState({ showModalEdit: true });
  handleCloseEdit = () => this.setState({ showModalEdit: false });

  render() {
    console.log(this.state.user.calendar);
    return (
      <>
        <Container>
          <section>
            <Row>
              <Col md={6}>
                <Card
                  style={{
                    height: "85vh",
                    backgroundColor: "rgba(255,255, 255, 0.5)"
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={this.state.user.imgPath}
                    style={{ height: "40vh", objectFit: "cover" }}
                  />

                  <Card.Body>
                    <Card.Title
                      style={{
                        textAlign: "center",
                        textTransform: "uppercase"
                      }}
                    >
                      <h2>Hello {this.state.user.name}</h2>
                    </Card.Title>
                    <Card.Text>
                      <strong>Email</strong>
                      <br></br>
                      {this.state.user.email}
                      <br></br>
                      <strong>Address:</strong>
                      <br></br>
                      {this.state.user.address}
                      <br></br>
                      <strong>Contact:</strong>
                      <br></br>
                      {this.state.user.contact}
                      <br></br>
                      <strong>About:</strong>
                      <br></br>
                      {this.state.user.about}
                      <br></br>
                    </Card.Text>
                    <Button
                      variant="dark"
                      size="sm"
                      onClick={this.handleShowEdit}
                    >
                      Edit User
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card
                  style={{
                    height: "85vh",
                    backgroundColor: "rgba(255,255, 255, 0.5)",
                    overflow: "scroll"
                  }}
                >
                  <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>
                      <h3>CALENDARIO DE CITAS</h3>
                    </Card.Title>
                    <Card.Text
                      style={{
                        height: "75vh",
                        textAlign: "center",
                        overflow: "scroll"
                      }}
                    >
                      {this.state.user.calendar
                        ? this.state.user.calendar.map(elm => (
                            <p>
                              <strong>Woof Appointment: </strong>
                              {elm.dog.name}
                              <br></br>
                              <strong>Booking Name: </strong>
                              {elm.title}
                              <br></br>
                              <strong>Date: </strong>
                              {elm.start.substr(0, 10)}
                              <br></br>
                              <Link to={`/centers/${elm.dog.center}`}>
                                Go to Center
                              </Link>
                              <hr></hr>                        
                            </p>
                          ))
                        : null}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>
        </Container>
        {/* -----USER EDIT MODAL----- */}
        <Modal show={this.state.showModalEdit} onHide={this.handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserEdit handleSubmit={this.handleSubmit} {...this.state.user} />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default UserProfile;
