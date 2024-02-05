import axios from "axios";

const userService = (url) => {
  return axios.get(url);
};

export { userService };
