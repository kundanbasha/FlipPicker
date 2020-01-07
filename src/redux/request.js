import axios from "axios";

import { API_URL } from "../global-constants";

const request = (method, endpoint, options) => {
  const api = `${API_URL}${endpoint}`;
  switch (method) {
    case "POST":
      return axios.get(api, options);
    default:
      return axios.get(api, { params: options });
  }
};

export default request;
