import React from "react";
import authService from "../../service/Auth_service";
import UserEdit from "./user-edit"
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this._authService = new authService();
    this.state = {
      user: {},
      showModalEdit: false
    };
  }

  handleSubmit = data => {
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

  componentDidMount = () => {
    const userId = this.props.match.params.userId;
    this._authService
      .getProfile(userId)
      .then(theUser => this.setState({ user: theUser.data }))
      .catch(err => console.log(err));
  };

  //----------EDIT CENTER MODAL HANDLE----------//
  handleShowEdit = () => this.setState({ showModalEdit: true });
  handleCloseEdit = () => this.setState({ showModalEdit: false });

  render() {
    return (
      <>
        <Container>
          <section>
            <Row>
              <Col md={12}>
                <Card style={{ height: "35vh", backgroundColor: "rgba(255,255, 255, 0.5)" }}>
                  <Row>
                    <Col md={4}>
                      <Card.Img
                        variant="top"
                        src={this.state.user.imgPath}
                        style={{ height: "95%", objectFit: "cover" }}
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <Card.Title style={{ textAlign: "center" }}>
                          <h2>Hello {this.state.user.name}</h2>
                        </Card.Title>
                        <Card.Text>
                          <strong>Email</strong> {this.state.user.email}
                          <br></br>
                          <strong>Address:</strong> {this.state.user.address}
                          <br></br>
                          <strong>Contact:</strong> {this.state.user.contact}
                          <br></br>
                          <strong>About:</strong> {this.state.user.about}
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
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Card style={{ height: "50vh", backgroundColor: "rgba(255,255, 255, 0.5)" }}>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title style={{ textAlign: "center" }}>
                        <h2>PROXIMAMENTE CALENDARIO DE CITAS</h2>
                      </Card.Title>
                      <Card.Text></Card.Text>
                    </Card.Body>
                  </Col>
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
