import axios from "axios";
const request = axios.create({
    withCredentials: true,
  });
const API_BASE = "http://localhost:4000/api";

const EVENTS_API = `${API_BASE}/events`;

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