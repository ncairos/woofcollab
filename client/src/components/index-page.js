import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

class IndexPage extends Component {
  render() {
    return (
      <Container>
        <section>
          <Row>
            <Col md={5}>
              <h1>WALK A WOOF</h1>
              <p>
                Do you feel lonely?... Do you want to pet a dog?... Woof Collab puts
                you in touch with the nearest dog shelters and gives you the
                opportunity to spend time with dogs. This also helps them
                prepare for their new families.
              </p>
            </Col>
            <Col md={5}>
              <h1>ADOPT A WOOF</h1>
              <p>
                Are you ready to have a dog?... Woof Collab shows you the closest
                shelters and the dogs available there. Also, you will get the
                information about the dog to choose the best one for you!
              </p>
            </Col>
          </Row>
        </section>
      </Container>
    );
  }
}

export default IndexPage;
