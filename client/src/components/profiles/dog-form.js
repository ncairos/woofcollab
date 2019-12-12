import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

import Service from "../../service/Dog_service";

class DogForm extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
    this.state = {
      dog: {
        name: "",
        breed: "",
        sex: "",
        age: 0,
        weight: 0
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this._service
      .postDog(this.state.dog)
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
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            onChange={this.handleInputChange}
            value={this.state.dog.age}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Weight</Form.Label>
          <Form.Control
            type="number"
            name="weight"
            onChange={this.handleInputChange}
            value={this.state.dog.weight}
          />
        </Form.Group>
        <Button variant="dark" size="sm" type="submit">
          Submit Woof!
        </Button>
      </Form>
    );
  }
}

export default DogForm;
