import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import './index.css';
import * as eventsClient from "../events/client";
import * as userClient from "../users/client";
function Search() {
  const { search } = useParams();
  const [searchTerm, setSearchTerm] = useState(search || null);
  const [results, setResults] = useState(null);
  const [getEventsList, setGetEventsList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [noOfTickets, setNoOfTickets] = useState(0);

  
  const fetchEventsList = async () => {
    try {
      const eventsList = await eventsClient.findAllEvents();
      console.log("Events List: ", eventsList);
      setGetEventsList(eventsList);
    } catch (error) {
      console.error("Error fetching events list:", error);
    }
  };
  const navigate = useNavigate();

  const fetchEvents = async (search) => {
    console.log("C: ", search);
    const results = await client.findEvents(search);
    setResults(results);
    setSearchTerm(search);
    console.log(results);
  };
  const fetchUser = async () => {
    try {
      const user = await userClient.profile();
      setCurrentUser(user);
    } catch (error) {
      setCurrentUser(null);
    }
  };
  // const bookTickets = async (eventID) => {
  //   try {
  //     const newTickets = {
  //       eventId: eventID,
  //       userId: currentUser._id,
  //       tickets: noOfTickets,
  //     };
  //     console.log("Tickets: ", newTickets);
  //     await client.insertTickets(newTickets);
     
  //   } catch (error) {
  //     console.error("Error booking tickets:", error);
  //   }
  // };
  const bookTickets = async (eventId) => {
    try {
      const newTickets = {
        eventId: eventId,
        userId: currentUser._id,
        noOfTickets: noOfTickets,
      };
      console.log("Tickets: ", newTickets);
      await client.insertTickets(newTickets);
    } catch (error) {
      console.error("Error booking tickets:", error);
    }
  };
  useEffect(() => {
    if (search) {
      fetchEvents(search);
    }
  }, [search]);
  useEffect(() => {
    fetchEventsList();
    fetchUser();
  }, []);
     



  const EventListItem = ({ event }) => {
    const [eventName] = useState(event.name);
    const [eventImage] = useState(event.images[0].url);
    return (
      <div className="col">
      <Link to={{ pathname: `/tickets/details/${event.id}`, state: eventName }}>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-5">
              {eventImage && (
                <img src={eventImage} alt={eventName} width={'200px'} height={'200px'} />
              )}
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">
                  <small className="text-muted"><b>Date: </b>{event.dates.start.localDate}</small>
                </p>
                <p className="card-text">
                  <small className="text-muted"><b>Time: </b>{event.dates.start.localTime}</small>
                </p>
            
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};



  return (
    <div className="container">
      <h1>Search</h1>
      <hr/>
      {!searchTerm &&
      <div className="alert alert-warning" role="alert">
      Enter a search term to begin.
    </div>}
      <button
        onClick={() => {
            if(searchTerm && searchTerm!="null"){
              navigate(`/tickets/search/${searchTerm}`)
            }
            else{
              navigate(`/tickets/search`)
            }
          }}
        className="btn btn-primary float-end">
        Search
      </button>
      <input
        type="text"
        className="form-control w-75"
        placeholder="Search..."
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
          console.log(searchTerm);
        }}/>
      <br/>
      {results && searchTerm!="null" &&
      <div className="alert alert-warning" role="alert">
      Scroll down to view results.
    </div>}

      <h2>Events ({getEventsList.length})</h2>
      <hr/>
      {searchTerm!="null" &&
      <div className="row row-cols-1 row-cols-md-2 g-4">
  {getEventsList.map((event) => (
    <div key={event._id} className="col">
      <div className="card text-dark bg-light mb-3">
        <div className="card-body">
          <h5 className="card-title">
          {event.EventName}
        
          </h5>
          <p className="card-text">
           {event.Venue} | {event.Category}
          </p>
          <p className="card-text">
           <b>Date : </b>{event.Date} <br/>
           <b>Time : </b>{event.Time}
          </p>
          {(currentUser && currentUser.role==="BUYER") ? (
          <div className="card-footer">
            <div className="row">
              <div className="col-2">

          <input type="number" className="form-control" placeholder="0" min="1" max="10"  
                          onChange={(e) => setNoOfTickets(e.target.value)}
          />
              </div>
              <div className="col">
           <button className="btn btn-danger" onClick={() => bookTickets(event._id)}
           >Book tickets</button>
           </div>
           </div>
        </div>):(
          (!currentUser) ? (
          <div className="alert alert-warning" role="alert">
          Please log in to book tickets.
          </div>):null
        )}
        </div>
      </div>
    </div>
  ))}
</div>
}

        

      {results && searchTerm!="null" &&
      <div>
      <br/>
      <h2>Results ({results.length})</h2>
      <hr/>
      <div className="row row-cols-1 row-cols-md-2 g-4"> 
          {results.map((event, index) => (
            <EventListItem key={index} event={event} />            
          ))}
      </div>
      </div>}
      {/* <pre>{JSON.stringify(results, null, 2)}</pre> */}
    </div>
  );
}

export default Search;
