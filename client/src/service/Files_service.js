import axios from "axios";

export default class Services {
  constructor() {
    this._service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}/api/files`,
      withCredentials: true
    });
  }

  handleUpload = theFile => this._service.post("/upload", theFile);
}
