import axios from "axios";

const request = axios.create({
    withCredentials: true,
});

const API_BASE = process.env.REACT_APP_BASE_API_URL;

const USERS_API = `${API_BASE}/api/users`;
const LIKES_API = `${API_BASE}/api/likes`;

export const findAllLikes = async () => {
    const response = await request.get(`${LIKES_API}`);
    return response.data;
};
export const createUserLikesEvent = async (userId, eventId) => {
    const response = await request.post(`${USERS_API}/${userId}/likes/${eventId}`);
    return response.data;
};
export const deleteUserLikesEvent = async (userId, eventId) => {
    const response = await request.delete(`${USERS_API}/${userId}/likes/${eventId}`);
    return response.data;
};
export const findUsersThatLikeEvent = async (eventId) => {
    const response = await request.get(`${LIKES_API}/${eventId}/users`);
    return response.data;
};
export const findEventsThatUserLikes = async (userId) => {
    const response = await request.get(`${USERS_API}/${userId}/likes`);
    return response.data;
};
