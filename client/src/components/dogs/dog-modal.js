import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const DogModal = props => {
  return (
    <Container>
      <Row>
        <Col style={{ textAlign: "center" }} md={12}>
          <img src={props.imgPath} alt={props.imgName} />
          <br></br>
          <Link to={`/dog/${props._id}`}>
            <h3 style={{ textTransform: "uppercase" }}>{props.name}</h3>
          </Link>

          <hr></hr>
          <p>
            <strong>Age: </strong>
            {props.age} years | <strong>Sex: </strong>
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
            <strong>Center:</strong>{" "}
            <Link to={`/centers/${props.center._id}`}>{props.center.name}</Link>
          </p>
        </Col>
        {/* <Button variant="dark">
          MORE<br></br>WOOF!
        </Button> */}
        {/* <Link to={`/dog/${props._id}`}>MORE WOOF</Link> */}
      </Row>
    </Container>
  );
};

export default DogModal;
