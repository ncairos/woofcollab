import React, { Component } from "react";
import Service from "../../service/Dog_service";
import DogCard from "./dog-card";
import DogModal from "./dog-modal";

import { Container, Row, Button, Modal, Col } from "react-bootstrap";

class AdoptList extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
    this.state = {
      dogs: [],
      showModalWindow: false,
      selectedDog: null
    };
  }

  componentDidMount = () => {
    this._service
      .getAllDogs()
      .then(allDogsFromDB => {
        this.setState({ dogs: allDogsFromDB.data });
      })
      .catch(err => console.log("Error", err));
  };

  setDog = dog => {
    this.setState({
      selectedDog: dog,
      showModalWindow: true
    });
  };

  handleShow = () => this.setState({ showModalWindow: true });
  handleClose = () => this.setState({ showModalWindow: false });

  render() {
    return (
      <section>
        <Container style={{ color: "grey" }}>
          <Row>
            {this.state.dogs.map(dog => (
              <Col className="dog-card" md={3}>
                <DogCard key={dog._id} {...dog} />
                <Button
                  variant="light"
                  className="btn-profile"
                  onClick={() => this.setDog(dog)}
                >
                  See More
                </Button>
                <hr></hr>
              </Col>
            ))}
          </Row>
        </Container>

        <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Woof Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DogModal
              {...this.state.selectedDog}
              closeModalWindow={this.handleClose}
            />
          </Modal.Body>
        </Modal>
      </section>
    );
  }
}
export default AdoptList;
