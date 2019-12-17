import axios from "axios";

export default class Services {
  constructor() {
    this._service = axios.create({
      baseURL: "http://localhost:5000/api/calendar",
      withCredentials: true
    });
  }

  postCalendar = (calendar, id) => this._service.post(`/new/${id}`, calendar);
}
