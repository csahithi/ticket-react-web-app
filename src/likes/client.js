import axios from "axios";

const API_BASE = "http://localhost:4000/api";

const USERS_API = `${API_BASE}/users`;
const LIKES_API = `${API_BASE}/likes`;

export const findAllLikes = async () => {
    const response = await axios.get(`${LIKES_API}`);
    return response.data;
};
export const createUserLikesEvent = async (userId, eventId) => {
    const response = await axios.post(`${USERS_API}/${userId}/likes/${eventId}`);
    return response.data;
};
export const deleteUserLikesEvent = async (userId, eventId) => {
    const response = await axios.delete(`${USERS_API}/${userId}/likes/${eventId}`);
    return response.data;
};
export const findUsersThatLikeEvent = async (eventId) => {
    const response = await axios.get(`${LIKES_API}/${eventId}/users`);
    return response.data;
};
export const findEventsThatUserLikes = async (userId) => {
    const response = await axios.get(`${USERS_API}/${userId}/likes`);
    return response.data;
};
