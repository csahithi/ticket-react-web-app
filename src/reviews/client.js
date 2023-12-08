import axios from "axios";
const request = axios.create({
    withCredentials: true,
  });
const API_BASE = "http://localhost:4000/api";

const REVIEWS_API = `${API_BASE}/reviews`;

export const findAllReviews = async () => {
    const response = await request.get(`${REVIEWS_API}`);
    return response.data;
}
export const findReviewById = async (id) => {
    const response = await request.get(`${REVIEWS_API}/${id}`);
    return response.data;
}
export const findReviewsByEventId = async (eventId) => {
    try {
        const response = await request.get(`${REVIEWS_API}/event/${eventId}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching reviews:", error);
        throw error;
      }
}
export const createReview = async (reviewData) => {
    try {
      const response = await request.post(`${REVIEWS_API}`, reviewData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };