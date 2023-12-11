import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import './index.css';
import * as eventsClient from "../events/client";
import * as userClient from "../users/client";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { BsDot } from "react-icons/bs";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoTimerSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
function Search() {
  const { search } = useParams();
  const [searchTerm, setSearchTerm] = useState(search || null);
  const [results, setResults] = useState(null);
  const [getEventsList, setGetEventsList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [noOfTickets, setNoOfTickets] = useState(0);
  const navigate = useNavigate();
  
  const fetchEventsList = async () => {
    try {
      let eventsList = await eventsClient.findAllEvents();
      console.log("Events List org: ", eventsList);
      if(search && searchTerm!="null"){
        console.log("Search: ", search);
        eventsList = eventsList.filter((event) => {
          return event.EventName.toLowerCase().includes(search.toLowerCase())
        });
        console.log("Events List fil: ", eventsList);
      }
      setGetEventsList(eventsList);
    } catch (error) {
      console.error("Error fetching events list:", error);
    }
  };

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
    fetchEventsList();
  }, [search]);
  useEffect(() => {
    fetchEventsList();
    fetchUser();
  }, []);
     



  const EventListItem = ({ event }) => {
    // console.log("Event: ", event);
    const [eventName] = useState(event.name);
    const [eventImage] = useState(event.images[0].url);
    const [eventUrl] = useState(event.url);
    console.log("EventURL: ", eventUrl);
    return (
      <div className="col">
      <Link to={{ pathname: `/tickets/details/${event.id}`, state: {eventName,eventUrl} }} style={{textDecoration:'none'}}>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-5">
              {eventImage && (
                <img src={eventImage} alt={eventName} width={'200px'} height={'200px'} />
              )}
            </div>
            {/* {console.log("UR",event.url)} */}
            <div className="col-md-7">
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">
                  <p className="text-muted" style={{fontSize:'15px'}}><BsCalendar2DateFill style={{fontWeight:'bold',fontSize:'1.3rem'}}/> <b>{event.dates.start.localDate}</b></p>
             
                <p className="text-muted" style={{fontSize:'15px'}}><IoTimerSharp style={{fontWeight:'bold',fontSize:'1.5rem'}}/> <b>{event.dates.start.localTime}</b></p>
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
     
      <div class="input-group mb-3">
      <span class="input-group-text" style={{backgroundColor:'#705be9',color:'white'}} id="basic-addon1"><FaSearch /></span>
      <input
       type="text"
       className="form-control w-70"
       placeholder="Search..."
       value={searchTerm}
       onChange={(event) => {
         setSearchTerm(event.target.value);
         console.log(searchTerm);
       }}/>
      <button class="btn" style={{backgroundColor:'#705be9',color:'white'}} type="submit" onClick={() => {
            if(searchTerm && searchTerm!="null"){
              navigate(`/tickets/search/${searchTerm}`)
            }
            else{
              navigate(`/tickets/search`)
            }
          }}> Search</button>
    </div>
      <br/>
      {results && searchTerm!="null" &&
      <div className="alert alert-warning" role="alert">
      Scroll down to view results.
    </div>}

      <h2>Events<BsDot />{getEventsList.length}</h2>
      <hr/>
      {searchTerm!="null" &&
      <div className="row row-cols-1 row-cols-md-2 g-4">
  {getEventsList.map((event) => (
    <div key={event._id} className="col">
      <Link to={{ pathname: `/tickets/events/details/${event._id}`, state: event.EventName }} style={{textDecoration:'none'}}>
      <div className="card text-dark bg-light mb-3">
        <div className="card-body">
          <h5 className="card-title">
          {event.EventName}
          </h5>
          <p className="card-text">
           {event.Venue} | {event.Category}
          </p>
          <p className="card-text">
           <b><BsCalendar2DateFill style={{fontWeight:'bold',fontSize:'1.3rem'}}/> </b>{event.Date} 
           <br/>

           <b><IoTimerSharp style={{fontWeight:'bold',fontSize:'1.5rem'}}/></b>{''}{event.Time}
          </p>
          {(currentUser && currentUser.role==="BUYER") ? (
        //   <div className="card-footer">
        //     <div className="row">
        //       <div className="col-2">

        //   <input type="number" className="form-control" placeholder="0" min="1" max="10"  
        //                   onChange={(e) => setNoOfTickets(e.target.value)}
        //   />
        //       </div>
        //       <div className="col">
        //    <button className="btn btn-danger" onClick={() => bookTickets(event._id)}
        //    >Reserve tickets <IoIosArrowDroprightCircle style={{fontSize:'1.5rem'}}/></button>
        //    </div>
        //    </div>
        // </div>
        null):(
          (!currentUser) ? (
          <div className="alert alert-warning" role="alert">
          Please log in to book tickets.
          </div>):null
        )}
        </div>
      </div>
   </Link>
    </div>
  ))}
</div>
}
      {results && search && searchTerm!="null" &&
      <div>
      <br/>
     
      <h2>Results<BsDot />{results.length}</h2>
      <hr/>
      <div className="row row-cols-1 row-cols-md-2 g-4"> 
          {results.map((event, index) => (
            <EventListItem key={index} event={event} />            
          ))}
      </div>
      </div>
      }

    </div>
  );
}

export default Search;
