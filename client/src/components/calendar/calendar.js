import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import calendarService from "../../service/Calendar_service";

const localizer = momentLocalizer(moment);

class MyCalendar extends Component {
  constructor(props) {
    super(props);
    this._calendarService = new calendarService();
    this.state = {
      showModalWindow: false,
      myEventsList: [
        {
          title: "",
          start: new Date(""),
          end: new Date("")
        }
      ]
    };
  }

  handleSubmit = e => {
    const dogId = this.props.match.params.id;
    e.preventDefault();
    this._calendarService
      .postCalendar(this.state.myEventsList[0], dogId)
      .then(x => {
        this.handleClose();
      })
      .catch(err => console.log(err));
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    console.log(name, value);
    const myEventsListCopy = [...this.state.myEventsList];

    const myEvent = myEventsListCopy.map(event => {
      if (e.target.name.includes("title")) event.title = e.target.value;
      else if (e.target.name.includes("start")) event.start = e.target.value;
      else if (e.target.name.includes("end")) event.end = e.target.value;
      return event;
    });
    console.log(myEvent);

    this.setState(
      {
        myEventsList: myEvent
      }
      //console.log(this.state.myEventsList)
    );
  };

  handleShow = () => this.setState({ showModalWindow: true });
  handleClose = () => this.setState({ showModalWindow: false });

  render() {
    //console.log(this.props.match.params.id)
    return (
      <>
        <Container>
          <section>
            <Button
              variant="dark"
              style={{ display: "block", margin: "0 auto" }}
              onClick={this.handleShow}
            >
              Add an Appointment
            </Button>
            <Row>
              <Col md={12}>
                <div
                  style={{ height: "75vh", marginTop: "25px" }}
                  className="calendar-container"
                >
                  <Calendar
                    localizer={localizer}
                    events={this.state.myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                  />
                </div>
              </Col>
            </Row>
          </section>
        </Container>
        <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Woof Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Booked Name</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={this.handleInputChange}
                  value={this.state.myEventsList.title}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="start"
                  onChange={this.handleInputChange}
                  value={this.state.myEventsList.start}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="end"
                  onChange={this.handleInputChange}
                  value={this.state.myEventsList.end}
                />
              </Form.Group>
              <Button
                variant="dark"
                size="sm"
                type="submit"
                onClick={this.handleSubmit}
              >
                Book Appointment
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default MyCalendar;
