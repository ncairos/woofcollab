import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const CenterCard = ({ _id, name, address, zipcode, imgPath, imgName}) => {
  return (
    <Row className="center-card" md={12}>
      <Col md={4}>
        <img src={imgPath} alt={imgName} />
      </Col>
      <Col md={8}>
        <h3>{name}</h3>
        <Link className="btn btn-sm btn-light btn-dets"  to={`/centers/${_id}`}>
          See Details
        </Link>
        <hr></hr>
        <p>
          <small>
            Address: {address}
            <br></br>
            Zipcode: {zipcode}
          </small>
        </p>
      </Col>
      <br></br>
      <br></br>
    </Row>
  );
};

export default CenterCard;
