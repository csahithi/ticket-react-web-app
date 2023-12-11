import axios from "axios";
const request = axios.create({
    withCredentials: true,
  });
const API_BASE = process.env.REACT_APP_BASE_API_URL;

const EVENTS_API = `${API_BASE}/api/events`;
const USERS_API = `${API_BASE}/api/users`;
export const findEventsByUserId = async (userId) => {
  try {
    const response = await request.get(`${USERS_API}/${userId}/events`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findAllEvents = async () => {
    const response = await request.get(`${EVENTS_API}`);
    return response.data;
}
export const findEventById = async (id) => {
    const response = await request.get(`${EVENTS_API}/${id}`);
    return response.data;
}
export const insertEvent = async (event) => {
    try {
      const response = await request.post(`${EVENTS_API}`, event);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
