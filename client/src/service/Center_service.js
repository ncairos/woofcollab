import axios from "axios";

export default class Services {
  constructor() {
    this._service = axios.create({
      baseURL: "http://localhost:5000/api/center",
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
