import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

import centerService from "../../service/Center_service";
import FilesService from "../../service/Files_service";

class CenterEdit extends Component {
  constructor(props) {
    super(props);
    this._centerService = new centerService();
    this._filesService = new FilesService();
    this.state = {
      disabledButton: false,
      buttonText: "Edit",
      center: {
        email: this.props.email,
        name: this.props.name,
        bio: this.props.bio,
        contact: this.props.contact,
        webpage: this.props.webpage,
        address: this.props.address,
        zipcode: this.props.zipcode,
        imgPath: this.props.imgPath
      }
    };
  }

  handleSubmit = () => {
    this.props.handleSubmit(this.state.center);
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({
      center: { ...this.state.center, [name]: value }
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
          center: { ...this.state.center, imgPath: response.data.secure_url }
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
            value={this.state.center.email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={this.handleInputChange}
            value={this.state.center.name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Bio</Form.Label>
          <Form.Control
            type="text"
            name="bio"
            onChange={this.handleInputChange}
            value={this.state.center.bio}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="number"
            name="contact"
            onChange={this.handleInputChange}
            value={this.state.center.contact}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Webpage</Form.Label>
          <Form.Control
            type="text"
            name="webpage"
            onChange={this.handleInputChange}
            value={this.state.center.webpage}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            onChange={this.handleInputChange}
            value={this.state.center.address}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Zipcode</Form.Label>
          <Form.Control
            type="number"
            name="zipcode"
            onChange={this.handleInputChange}
            value={this.state.center.zipcode}
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

export default CenterEdit;
