import axios from "axios";

export default class Services {
  constructor() {
    this._service = axios.create({
      baseURL: `${proccess.env.REACT_APP_URL}/api/calendar`,
      withCredentials: true
    });
  }

  postCalendar = (calendar, id) => this._service.post(`/new/${id}`, calendar);
}
