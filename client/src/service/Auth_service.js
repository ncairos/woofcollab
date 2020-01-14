import axios from "axios";

export default class Services {
  constructor() {
    this._service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}/api/auth`,
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
  getProfile = () => this._service.get(`/profile`);
  editUser = (id, data) => this._service.post(`/edit`, { data, id });
  logout = () => this._service.post("/logout");
  loggedin = () => {
    console.log(`${process.env.REACT_APP_URL}/auth`);
    return this._service.get("/loggedin");
  };
  sentEmail = id => {
    this._service.post(`/sendEmail`, { id });
  };
}
