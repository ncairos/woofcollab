import React from "react";
import Service from "../../service/Dog_service";
import DogForm from "./dog-form"
import { Button, Modal } from "react-bootstrap";

class CenterProfile extends React.Component {

  constructor(props) {
    super(props);
    this._service = new Service();
    this.state = {
      dogs: [],
      showModalWindow: false
    };
  }

  componentDidMount = () => this.updateDogsList();

  updateDogsList = () => {
    this._service
      .getAllDogs()
      .then(allDogsFromDB =>
        this.setState({ dogs: allDogsFromDB.data })
      )
      .catch(err => console.log("Error", err));
  };

  handleShow = () => this.setState({ showModalWindow: true });
  handleClose = () => this.setState({ showModalWindow: false });

  render() {
    return (
      <>
        <h1>Aqui va el center profile</h1>
        <Button variant="dark" onClick={this.handleShow}>
          New Woof!
        </Button>

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
      </>
    );
  }
}

export default CenterProfile;


