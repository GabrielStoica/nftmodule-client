import axios from "axios";

const API = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.response.use(
  (response) => {
    if (response.data) return response.data;
    return response;
  },
  (error) => {
    const response = error.response.data;

    return response;
  }
);

export class RequestService {
  instance = API;

  get = (url, options = {}) => this.instance.get(url, options);

  post = (url, body, options = {}) => this.instance.post(url, body, options);

  delete = (url, options = {}) => API.delete(url, options);

  put = (url, body, options = {}) => API.put(url, body, options);
}

export default new RequestService();
