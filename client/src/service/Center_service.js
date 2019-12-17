import axios from "axios";

export default class Services {
  constructor() {
    this._service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}/api/center`,
      withCredentials: true
    });
  }

  getAllCenters = () => this._service.get("/allCenters");
  getOneCenter = id => this._service.get(`/${id}`);
  editCenter = (id, data) =>
    this._service.post(`/edit/${id}`, data, {
      headers: {
        "content-type": "application/json"
      }
    });
}
