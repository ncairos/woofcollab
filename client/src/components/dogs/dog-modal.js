import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const DogModal = props => {
  //console.log(props)
  return (
    <Container>
      <Row>
        <Col className="dogModal-text" md={12}>
          <img src={props.imgPath} alt={props.imgName} />
          <br></br>
          <h3>{props.name}</h3>
          <hr></hr>
          <p>
            <strong>Age: </strong>
            {props.age} año | <strong>Sex: </strong>
            {props.sex} | <strong>weight: </strong>
            {props.weight} k
          </p>
          <hr></hr>
        </Col>
        <Col>
          <p>
            <strong>Breed:</strong> {props.breed}
            <br></br>
            <strong>Size:</strong> {props.size}
            <br></br>
            <strong>Personality:</strong> {props.personality}
            <br></br>
            <strong>Description:</strong> {props.description}
            <br></br>
            <strong>Center:</strong> {props.center}
          </p>
        </Col>
        <Button variant="dark">
          MORE<br></br>WOOF!
        </Button>
      </Row>
    </Container>
  );
};

export default DogModal;
