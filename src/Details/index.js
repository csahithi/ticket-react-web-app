import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import * as client from "../Search/client";
import * as userClient from "../users/client";
import * as likesClient from "../likes/client";

function Details({ location }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const [likes, setLikes] = useState([]);
// console.log("S: ", location);

  const fetchUser = async () => {
    try {
      const user = await userClient.profile();
      setCurrentUser(user);
    } catch (error) {
      setCurrentUser(null);
    }
  };

  const fetchEvent = async () => {
    const event = await client.findEventById(eventId);
    setEvent(event);
  };

  const fetchLikes = async () => {
    const likes = await likesClient.findUsersThatLikeEvent(eventId);
    setLikes(likes);
  };

  const currenUserLikesEvent = async () => {
    const _likes = await likesClient.createUserLikesEvent(
      currentUser._id,
      eventId
    );
    setLikes([_likes, ...likes]);
    fetchLikes();
  };

  useEffect(() => {
    fetchEvent();
    fetchUser();
    fetchLikes();
  }, []);

//   if (!location || !location.state) {
//     // Handle the case where location or location.state is undefined
//     return <div>Error: Event details not available.</div>;
//   }
//   const { eventName } = location.state;

  return (
    <div>
      {event && (
        <div>
          {currentUser && (
            <button
              onClick={currenUserLikesEvent}
              className="btn btn-warning float-end me-4">
              <FontAwesomeIcon icon={faHeart} />
            </button>
          )}
          {/* <h1>{eventName}</h1> */}
          <h3>Venue</h3>
          <h3>{event.venues[0].name}</h3>
          <h4>{event.venues[0].address.line1}, {event.venues[0].city.name}, {event.venues[0].state.name}, {event.venues[0].country.name}, {event.venues[0].postalCode}</h4>
          {/* <img
            src={`https://api.napster.com/imageserver/v2/events/${event.id}/images/300x300.jpg`}
            alt={event.name}
          /> */}
          <h2>Likes</h2>
          <ul className="list-group">
            {likes.map((like, index) => (
              <li key={index} className="list-group-item">
                {like.user.firstName} {like.user.lastName}
                <Link to={`/tickets/users/${like.user._id}`}>
                  @{like.user.username}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Details;
