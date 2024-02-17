import axios from "./customise-axios";

const fetchAllUsers = (page) => {
  return axios.get(`/api/users?page=${page}`);
};

const CreatePostUser = (user) => {
  return axios.post("/api/users", user);
};

// const EditPostUser = (user) => {
//   return axios.put("/api/users", user);
// };
const EditPostUser = (user, id) => {
  return axios.patch(`/api/users/${id}`, user);
};

const DeletePost = (id) => {
  return axios.delete(`/api/users/${id}`);
};

const loginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};
export { fetchAllUsers, CreatePostUser, EditPostUser, DeletePost, loginApi };
