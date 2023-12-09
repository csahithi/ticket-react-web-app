import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";
const USERS_API = `${API_BASE}/api/users`;
// const FOLLOWERS_API = `${API_BASE}/api/followers`;
export const login = async (credentials) => {
  const response = await request.post(`${USERS_API}/login`, credentials);
  return response.data;
};
export const logout = async () => {
  const response = await request.post(`${USERS_API}/logout`);
  return response.data;
};

export const profile = async () => {
  const response = await request.post(`${USERS_API}/profile`);
  return response.data;
};

export const findAllUsers = async () => {
  const response = await request.get(USERS_API);
  return response.data;
};

export const findUserById = async (id) => {
  const response = await request.get(`${USERS_API}/${id}`);
  return response.data;
};

// export const getFollowingList = async (id) => {
//   const response = await request.get(`${FOLLOWERS_API}/following/${id}`);
//   return response.data;
// };



export const updateUser = async (id, user) => {
  const response = await request.put(`${USERS_API}/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await request.delete(`${USERS_API}/${id}`);
  return response.data;
};
export const createUser = async (user) => {
    const response = await request.post(`${USERS_API}`, user);
    return response.data;
};
export const register = async (credentials) => {
    const response = await request.post(`${USERS_API}/register`, credentials);
    return response.data;
};
