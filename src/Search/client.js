import axios from "axios";
export const TICKETMASTER_API = "https://app.ticketmaster.com/discovery/v2";
//export const API_KEY = process.env.REACT_APP_TICKETMASTER_API_KEY;
export const API_KEY="Dnkjb6mtQTZ0QhKek4FOmsTrExRzPtG9";


const API_BASE = "http://localhost:4000/api";
const TICKETS_API=`${API_BASE}/tickets`;


export const findEvents = async (searchTerm) => {
  console.log("C: ", searchTerm);
  const response = await axios.get(
    `${TICKETMASTER_API}/events?keyword=${searchTerm}&apikey=${API_KEY}`
  );
  // const responseData = await response.json();
  // console.log(response);
  // console.log(response.data._embedded.events);
  return response.data._embedded ? response.data._embedded.events : [];
};

export const findEventById = async (eventId) => {
  const response = await axios.get(
    `${TICKETMASTER_API}/events/${eventId}?apikey=${API_KEY}`
  );
  console.log(response.data._embedded);
  return response.data._embedded ? response.data._embedded : [];
};

export const insertTickets = async (tickets) => {
  try {
    console.log("C",tickets);
    const response = await axios.post(`${TICKETS_API}`, tickets);
    console.log("D",response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const insertTicketsAPI = async (tickets) => {
  try {
    console.log("C",tickets);
    const response = await axios.post(`${TICKETS_API}/book`, tickets);
    console.log("D",response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findTracksByEventId = async (eventId) => {
  const response = await axios.get(
    `${TICKETMASTER_API}/events/${eventId}/tracks?apikey=${API_KEY}`
  );
  return response.data.tracks;
};
