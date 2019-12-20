import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

class IndexPage extends Component {
  render() {
    return (
      <Container className="index-box">
        <section>
          <Row>
            <Col md={4}>
              <div className="arrow-left">
                <img src="https://res.cloudinary.com/woofcollab/image/upload/v1576788520/dogs/LEFT_ywdqjb.png" />
              </div>
              <Card
                className="signup-login"
                style={{ width: "25vw", height: "30vh" }}
              >
                <Card.Body>
                  <Card.Title>WALK A WOOF</Card.Title>
                  <Card.Text>
                    Do you feel lonely?... Do you want to pet a dog?...
                    Woof Collab puts you in touch with the nearest dog shelters
                    and gives you the opportunity to spend time with dogs. This
                    also helps them prepare for their new families.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={{ span: 2, offset: 4 }}>
              <div className="arrow-right">
                <img src="https://res.cloudinary.com/woofcollab/image/upload/v1576788520/dogs/RIGHT_tdzfiu.png" />
              </div>
              <Card
                className="signup-login"
                style={{ width: "25vw", height: "30vh" }}
              >
                <Card.Body>
                  <Card.Title>ADOPT A WOOF</Card.Title>
                  <Card.Text>
                    Are you ready to have a dog?... Woof Collab shows you the
                    closest shelters and the dogs available there. Also, you
                    will get the information about the dog to choose the best
                    one for you!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </Container>
    );
  }
}

export default IndexPage;
