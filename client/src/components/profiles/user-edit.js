import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

import userService from "../../service/Auth_service"
import FilesService from "../../service/Files_service";

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this._userService = new userService();
    this._filesService = new FilesService();
    this.state = {
      disabledButton: false,
      buttonText: "Edit",
      user: {
        email: this.props.email,
        name: this.props.name,
        address: this.props.address,
        contact: this.props.contact,
        about: this.props.about,
        imgPath: this.props.imgPath
      }
    };
  }

  handleSubmit = e => {
    this.props.handleSubmit(e, this.state.user);
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({
      user: { ...this.state.user, [name]: value }
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
          buttonText: "Edit",
          user: { ...this.state.user, imgPath: response.data.secure_url }
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            onChange={this.handleInputChange}
            value={this.state.user.email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={this.handleInputChange}
            value={this.state.user.name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            onChange={this.handleInputChange}
            value={this.state.user.address}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="number"
            name="contact"
            onChange={this.handleInputChange}
            value={this.state.user.contact}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>About</Form.Label>
          <Form.Control
            type="text"
            name="about"
            onChange={this.handleInputChange}
            value={this.state.user.about}
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

export default UserEdit;
