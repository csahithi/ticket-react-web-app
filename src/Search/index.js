import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

function Search() {
  const { search } = useParams();
  const [searchTerm, setSearchTerm] = useState(search || null);
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  const fetchEvents = async (search) => {
    console.log("C: ", search);
    const results = await client.findEvents(search);
    setResults(results);
    setSearchTerm(search);
    console.log(results);
  };

  useEffect(() => {
    if (search) {
      fetchEvents(search);
    }
  }, [search]);

  const EventListItem = ({ event }) => {
    const [eventName] = useState(event.name);
    return (
      <li className="list-group-item">
        <Link to={{pathname: `/tickets/details/${event.id}`, state: eventName}}>
          <h3>{event.name}</h3>
          {/* <img
            src={`https://app.ticketmaster.com/discovery/v2/events/${event.id}/images?apikey=${client.API_KEY}`}
            alt={event.name}
          /> */}
        </Link>
      </li>
    )
  };

  return (
    <div>
      <h1>Search</h1>
      <button
        onClick={() => {
            if(searchTerm && searchTerm!="null"){
              navigate(`/tickets/search/${searchTerm}`)
            }
            else{
              navigate(`/tickets/search`)
            }
          }}
        className="btn btn-primary float-end"
      >
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
        }}
      />
      {!searchTerm && <div>Enter a search term to begin</div>}
      {results && searchTerm!="null" &&
      <div>
      <h2>Results</h2>
      <ul className="list-group">     
          {results.map((event, index) => (
            <EventListItem key={index} event={event} />            
          ))}
      </ul>
      </div>}
      {/* <pre>{JSON.stringify(results, null, 2)}</pre> */}
    </div>
  );
}

export default Search;
