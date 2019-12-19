import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

import dogService from "../../service/Dog_service";
import FilesService from "../../service/Files_service";

class DogForm extends Component {
  constructor(props) {
    super(props);
    this._dogService = new dogService();
    this._filesService = new FilesService();
    this.state = {
      disabledButton: false,
      buttonText: "Submit Woof!",
      dog: {
        name: "",
        breed: "",
        sex: "",
        age: 0,
        weight: 0,
        color: "",
        size: "",
        personality: "",
        description: "",
        imgPath: ""
      }
    };
  }



  handleSubmit = (e, data) => {
    e.preventDefault();
    this._dogService
      .postDog(this.state.dog, data)
      .then(x => {
        this.props.closeModalWindow();
        this.props.updateDogsList();
      })
      .catch(err => console.log(err));
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({
      dog: { ...this.state.dog, [name]: value }
    });
  };

  handleFileUpload = e => {
    this.setState({ disabledButton: true, buttonText: "Uploading!.." });

    const uploadData = new FormData();
    uploadData.append("imgPath", e.target.files[0]);
    this._filesService
      .handleUpload(uploadData)
      .then(response => {
        console.log("Files uploaded", response.data.secure_url);
        this.setState({
          disabledButton: false,
          buttonText: "Submit Woof!",
          dog: { ...this.state.dog, imgPath: response.data.secure_url }
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={this.handleInputChange}
            value={this.state.dog.name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Breed</Form.Label>
          <Form.Control
            type="text"
            name="breed"
            onChange={this.handleInputChange}
            value={this.state.dog.breed}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Sex</Form.Label>
          <Form.Control
            type="text"
            name="sex"
            onChange={this.handleInputChange}
            value={this.state.dog.sex}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Age <small>(Years)</small>
          </Form.Label>
          <Form.Control
            type="number"
            name="age"
            onChange={this.handleInputChange}
            value={this.state.dog.age}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Weight <small>(Kilograms)</small>
          </Form.Label>
          <Form.Control
            type="number"
            name="weight"
            onChange={this.handleInputChange}
            value={this.state.dog.weight}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            name="color"
            onChange={this.handleInputChange}
            value={this.state.dog.color}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Size <small>(small, medium, big)</small>
          </Form.Label>
          <Form.Control
            type="text"
            name="size"
            onChange={this.handleInputChange}
            value={this.state.dog.size}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Personality</Form.Label>
          <Form.Control
            type="text"
            name="personality"
            onChange={this.handleInputChange}
            value={this.state.dog.personality}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            onChange={this.handleInputChange}
            value={this.state.dog.description}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control
            name="imgPath"
            type="file"
            onChange={this.handleFileUpload}
          />
        </Form.Group>
        <Button
          variant="dark"
          size="sm"
          type="submit"
          disabled={this.state.disabledButton}
          onClick={this.handleSubmit}
        >
          {this.state.buttonText}
        </Button>
      </Form>
    );
  }
}

export default DogForm;
