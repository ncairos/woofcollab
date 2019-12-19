import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import calendarService from "../../service/Calendar_service";
import dogService from "../../service/Dog_service";

const localizer = momentLocalizer(moment);

class MyCalendar extends Component {
  constructor(props) {
    super(props);
    this._calendarService = new calendarService();
    this._dogService = new dogService();
    this.state = {
      dog: {},
      showModalWindow: false,
      mybackup: [],
      myEventsList: [
        {
          title: "",
          start: new Date(""),
          end: new Date("")
        }
      ],
      showEvents: false
    };
  }

  componentDidMount = () => {
    this.dogInfo();
  };

  dogInfo = () => {
    const dogId = this.props.match.params.id;
    this._dogService
      .getOneDog(dogId)
      .then(theDog =>
        this.setState({ dog: theDog.data, showEvents: true }, () =>
          this.showPrevEvents()
        )
      )
      .catch(err => console.log(err));
  };

  showPrevEvents = () => {
    let calendarCopy = [...this.state.mybackup];
    let a, b;
    this.state.dog.calendar.map(elm => {
      if (elm.start) a = elm.start.substr(0, 10);
      b = elm.title;
      let aux = {
        title: `${b}`,
        start: new Date(`${a} 00:00:00`),
        end: new Date(`${a} 00:00:00`)
      };
      calendarCopy.push(aux);
    });
    this.setState({ mybackup: calendarCopy });
  };

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
    this.setState({
      myEventsList: myEvent
    });
  };

  handleShow = () => this.setState({ showModalWindow: true });
  handleClose = () => this.setState({ showModalWindow: false });

  render() {
    console.log(this.state.dog.calendar);
    return (
      <>
        <Container>
          <section>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="dark" onClick={this.handleShow}>
                Add an Appointment
              </Button>
              <Button variant="dark" onClick={this.handleClick}>
                See Appointments
              </Button>
            </div>
            <Row>
              <Col md={12}>
                <div
                  style={{ height: "75vh", marginTop: "25px" }}
                  className="calendar-container"
                >
                  <Calendar
                    localizer={localizer}
                    events={this.state.mybackup}
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
                  placeholder="Full Name"
                  onChange={this.handleInputChange}
                  value={this.state.myEventsList.title}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Pick a Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="start"
                  onChange={this.handleInputChange}
                  value={this.state.myEventsList.start}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Pick an End Date</Form.Label>
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
