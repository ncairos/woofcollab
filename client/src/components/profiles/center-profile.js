import React from "react";
import dogService from "../../service/Dog_service";
import centerService from "../../service/Center_service";
import DogForm from "./dog-form";
import CenterEdit from "./center-edit";
import DogSectionPriv from "./dog-sectPrivate";
import { Button, Modal, Card, Container, Row, Col } from "react-bootstrap";

class CenterProfile extends React.Component {
  constructor(props) {
    super(props);
    this._dogService = new dogService();
    this._centerService = new centerService();
    this.state = {
      center: {},
      dogs: [],
      showModalWindow: false,
      showModalEdit: false
    };
  }

  componentDidMount = () => {
    this.centerInfo();
  };

  centerInfo = () => {
    const centerId = this.props.match.params.id;
    this._centerService
      .getOneCenter(centerId)
      .then(theCenter => this.setState({ center: theCenter.data }))
      .catch(err => console.log(err));
  };

  handleSubmit = (e, data) => {
    e.preventDefault();
    const centerId = this.state.center._id;
    this._centerService
      .editCenter(centerId, data)
      .then(theCenter => {
        this.setState({ center: { ...this.state.center, ...data } });
        this.handleCloseEdit();
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateDogsList = () => {
    const center = this.state.center;

    this._dogService
      .getAllDogs()
      .then(allDogsFromDB => {
        this.centerInfo();
      })
      .catch(err => console.log("Error", err));
  };

  deleteHandler = id => {
    this._dogService
      .deleteDog(id)
      .then(x => this.updateDogsList())
      .catch(err => console.log("Error", err));
  };

  //----------NEW DOG MODAL HANDLE----------//
  handleShow = () => this.setState({ showModalWindow: true });
  handleClose = () => this.setState({ showModalWindow: false });

  //----------EDIT CENTER MODAL HANDLE----------//
  handleShowEdit = () => this.setState({ showModalEdit: true });
  handleCloseEdit = () => this.setState({ showModalEdit: false });

  render() {
    return (
      <>
        <Container>
          <section style={{ color: "grey" }}>
            <Row>
              <Col md={4}>
                <Card
                  style={{
                    width: "100%",
                    height: "85vh",
                    backgroundColor: "rgba(255,255, 255, 0.5)",
                    boxShadow: "10px 10px 15px 0px rgba(0, 0, 0, 0.75)"
                  }}
                >
                  <Card.Img variant="top" src={this.state.center.imgPath} />
                  <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>
                      {this.state.center.name}
                    </Card.Title>
                    <Card.Text>
                      <strong>Bio:</strong> {this.state.center.bio}
                      <br />
                      <strong>Email:</strong> {this.state.center.email}
                      <br />
                      <strong>Contact:</strong> {this.state.center.contact}
                      <br />
                      <strong>Webpage:</strong> {this.state.center.webpage}
                      <br />
                      <strong>Address:</strong> {this.state.center.address} |
                      <strong> Zipcode:</strong> {this.state.center.zipcode}
                    </Card.Text>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={this.handleShowEdit}
                      className="btn-profile"
                    >
                      Edit Center
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col
                md={8}
                style={{ boxShadow: "10px 10px 15px 0px rgba(0, 0, 0, 0.75)" }}
              >
                <Row>
                  <Card
                    style={{
                      width: "100%",
                      height: "25vh",
                      backgroundColor: "rgba(255,255, 255, 0.5)"
                    }}
                  >
                    <Card.Body>
                      <Card.Title
                        style={{
                          textAlign: "center",
                          textTransform: "uppercase"
                        }}
                      >
                        <h3>Calendario</h3>
                      </Card.Title>
                      <Card.Text>
                        {/* {this.state.center.walks
                          ? this.state.center.walks.map(elm => {
                              // <p>{elm.calendar.title}</p>;
                              console.log("hablalooo", elm.calendar);
                            })
                          : null} */}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card
                    style={{
                      width: "100%",
                      height: "60vh",
                      backgroundColor: "rgba(255,255, 255, 0.5)"
                    }}
                  >
                    <Card.Body>
                      <Card.Title className="woof-list">
                        <Button
                          variant="light"
                          size="sm"
                          onClick={this.handleShow}
                          className="btn-profile"
                        >
                          New Woof!
                        </Button>
                      </Card.Title>
                      <Card.Text>
                        <Col className="dog-section">
                          {this.state.center.walks
                            ? this.state.center.walks.map(elm => (
                                <DogSectionPriv
                                  key={elm._id}
                                  delete={this.deleteHandler}
                                  {...elm}
                                />
                              ))
                            : null}
                        </Col>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Row>
              </Col>
            </Row>
          </section>
        </Container>
        {/* -----NEW FORM MODAL----- */}
        <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Woof</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DogForm
              closeModalWindow={this.handleClose}
              updateDogsList={this.updateDogsList}
            />
          </Modal.Body>
        </Modal>
        {/* -----CENTER EDIT MODAL----- */}
        <Modal show={this.state.showModalEdit} onHide={this.handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Center</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CenterEdit
              handleSubmit={this.handleSubmit}
              {...this.state.center}
            />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default CenterProfile;
