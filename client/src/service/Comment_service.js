import axios from "axios";

export default class Services {
  constructor() {
    this._service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}/api/comment`,
      withCredentials: true
    });
  }

  postComment = (comment, id) => this._service.post(`/new/${id}`, comment);
}
