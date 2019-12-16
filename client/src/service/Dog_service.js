import axios from "axios";

export default class Services {
  constructor() {
    this._service = axios.create({
      baseURL: "http://localhost:5000/api/dog",
      withCredentials: true
    });
  }

  getAllDogs = () => this._service.get("/allDogs");
  getOneDog = id => this._service.get(`/${id}`);
  postDog = dog => this._service.post("/new", dog);
  getProfile = id => this._service.get(`/profile/${id}`);
  deleteDog = id => this._service.get(`/delete/${id}`);
}
