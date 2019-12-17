import axios from "axios";

export default class Services {
  constructor() {
    this._service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}/auth`,
      withCredentials: true
    });
  }

  signup = (username, email, password, checked) =>
    this._service.post("/signup", {
      username,
      email,
      password,
      checked
    });
  loginUser = (username, password) =>
    this._service.post("/loginUser", { username, password });
  loginCenter = (username, password) =>
    this._service.post("/loginCenter", { username, password });
  getProfile = id => this._service.get(`/profile/${id}`);
  editUser = (id, data) =>
    this._service.post(`/edit/${id}`, data, {
      headers: {
        "content-type": "application/json"
      }
    });

  logout = () => this._service.post("/logout");
  loggedin = () => this._service.get("/loggedin");
}
