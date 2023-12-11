import axios from "axios";

export const TICKETMASTER_API = process.env.REACT_APP_TICKETMASTER_API_URL;
export const API_KEY = process.env.REACT_APP_TICKETMASTER_API_KEY;

const API_BASE = process.env.REACT_APP_BASE_API_URL;
const TICKETS_API=`${API_BASE}/api/tickets`;


export const findEvents = async (searchTerm) => {
  console.log("C: ", searchTerm);
  const response = await axios.get(
    `${TICKETMASTER_API}/events?keyword=${searchTerm}&apikey=${API_KEY}`
  );
  // const responseData = await response.json();
  // console.log(response);
  console.log("Not embd",response.data._embedded);
  return response.data._embedded ? response.data._embedded.events : [];
};

export const findEventById = async (eventId) => {
  const response = await axios.get(
    `${TICKETMASTER_API}/events/${eventId}?apikey=${API_KEY}`
  );
  console.log("In search client",response.data);
  return response.data? response.data : [];
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
