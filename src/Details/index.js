import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import * as client from "../Search/client";
import * as userClient from "../users/client";
import * as likesClient from "../likes/client";
import * as reviewsClient from "../reviews/client";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as searchClient from "../Search/client";
import mongoose from "mongoose";

function Details({ location }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const [likes, setLikes] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [reviews, setReviews] = useState([]);
  const [rangeValue, setRangeValue] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [noOfTickets, setNoOfTickets] = useState(0);
  const handleRangeChange = (e) => {
    setRangeValue(e.target.value);
  };
  
// console.log("S: ", location);
  const handleReviewSubmit = async () => {
    try {
      // Send a request to create a new review
      const newReview = {
        eventId: eventId,
        userId: currentUser._id,
        review: reviewText,
        rating: rangeValue,
      };

      await reviewsClient.createReview(newReview);

      // Optionally, you can refresh the reviews after submitting
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
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
  const fetchReviews = async () => {
    const eventReviews = await reviewsClient.findReviewsByEventId(eventId);
    const updatedEventReviews = await Promise.all(
      eventReviews.map(async (review) => {
        const userData = await userClient.findUserById(review.userId);
        return { ...review, reviewUsername: userData.username };
      }
      )
    );
    setReviews(updatedEventReviews);
  };

  const currenUserLikesEvent = async () => {
    const _likes = await likesClient.createUserLikesEvent(
      currentUser._id,
      eventId
    );
    setLikes([_likes, ...likes]);
    fetchLikes();
  };
  const bookTicketsAPI = async () => {
    try {
      const newTickets = {
        userId: currentUser._id,
        noOfTickets: noOfTickets,
      };
      console.log("Tickets: ", newTickets);
      await searchClient.insertTicketsAPI(newTickets);
    } catch (error) {
      console.error("Error booking tickets:", error);
    }
  };

  useEffect(() => {
    fetchEvent();
    fetchUser();
    fetchLikes();
    fetchReviews();
  }, []);

//   if (!location || !location.state) {
//     // Handle the case where location or location.state is undefined
//     return <div>Error: Event details not available.</div>;
//   }
//   const { eventName } = location.state;

  return (
    <div className="container">
      <br/>
      {event && (
        
        <div>
         {currentUser.role==="BUYER" ? (
            <>
            <input type="number" className="form-control" placeholder="0" min="1" max="10"  
                          onChange={(e) => setNoOfTickets(e.target.value)}
          />
           { console.log("E: ", event.venues[0].id)} 
           <button className="btn btn-danger" onClick={() => bookTicketsAPI()}
           >Book tickets</button>
            <button
              onClick={currenUserLikesEvent}
              className="btn btn-warning float-end me-4">
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button className="btn btn-primary float-end me-4" onClick={handleShow}>Add review</button>
            <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Review</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>

                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label><h5>Review</h5></Form.Label>
                        <Form.Control as="textarea" rows={3} value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)} />
                      </Form.Group>
                      <Form.Group controlId="formRange">
                        <Form.Label><h5>Rating  - <b>{rangeValue}</b></h5></Form.Label>
                        <Form.Range
                          min={0}
                          max={5}
                          value={rangeValue}
                          onChange={handleRangeChange} />

                      </Form.Group>
                    </Form>

                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary"
                      onClick={() => {
                        handleReviewSubmit();
                        handleClose();
                      } }>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
            </>
            
          ):(
            <div className="alert alert-warning" role="alert">
                Please log in to like the event or add a review.
              </div>
          )}
          {/* <h1>{eventName}</h1> */}
          <h3>Venue</h3>
          {event.venues[0].id}
          <h3>{event.venues[0].name}</h3>
          <h4>{event.venues[0].address.line1}, {event.venues[0].city.name}, {event.venues[0].state.name}, {event.venues[0].country.name}, {event.venues[0].postalCode}</h4>
          {/* <img
            src={`https://api.napster.com/imageserver/v2/events/${event.id}/images/300x300.jpg`}
            alt={event.name}
          /> */}
          <hr/>
          <div className="row">
            <div className="col-4">
          <h3>Likes ({likes.length})</h3>

          <ul className="list-group">
            {likes.length > 0 ? (
            
              likes.map((like, index) => (
                <li key={index} className="list-group-item">
                  {like.user.firstName} {like.user.lastName}{' '}
                  <Link to={`/tickets/users/${like.user._id}`}>
                    @{like.user.username}
                  </Link>
                </li>
              ))
            ) : (
              <h4>No likes so far</h4>
            )}
          </ul>
          </div>
          <div className="col-8">
          <h3>Reviews ({reviews.length})</h3>
         
          <ul className="list-group">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <li key={index} className="list-group-item">
                      <Link to={`/tickets/users/${review.userId}`}>
                      <h5>@{review.reviewUsername}</h5>
                      </Link>
                      <p>{review.review}</p>
                      <p><b>Rating:</b> {review.rating}</p>
                    </li>
                  ))
                ) : (
                  <h4>No reviews available</h4>
                )}
              </ul>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
