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
import * as eventsClient from "../events/client";
import { BsDot } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineRateReview } from "react-icons/md";
import { IoIosArrowDroprightCircle } from "react-icons/io";

function EventDetails({ location }) {
  
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
      const newReview = {
        eventId: eventId,
        userId: currentUser._id,
        review: reviewText,
        rating: rangeValue,
      };

      await reviewsClient.createReview(newReview);
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
    const event = await eventsClient.findEventById(eventId);
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
    fetchEvent();
    fetchUser();
    fetchLikes();
    fetchReviews();
  }, []);


  return (
    <div className="container">
      <br/>
      {event && (
        
        <div>
         {currentUser && currentUser.role==="BUYER" ? (
            <>
           {/* <div className="row">
            <div className="float-end">
            <div className="col">
            <button className="btn btn-primary me-3" onClick={handleShow}><MdOutlineRateReview  style={{fontSize:'1.5rem'}}/> Write a review</button>
            </div>
            <div className="col-1">
            <button
              onClick={currenUserLikesEvent}
              className="btn btn-warning me-3">
              <FontAwesomeIcon icon={faHeart} />
            </button>
            </div>
            <div className="col-1">
            <input type="number" className="form-control" placeholder="0" min="1" max="10"  
                          onChange={(e) => setNoOfTickets(e.target.value)}
          />
            </div>
            <div className="col-2">
           <button className="btn btn-danger" onClick={() => bookTickets(event._id)}>Reserve tickets <IoIosArrowDroprightCircle style={{fontSize:'1.5rem'}} /></button>
         
            </div>
            </div>
           </div> */}
           <div className="d-flex justify-content-end">
  <button className="btn me-3" onClick={handleShow} style={{backgroundColor:'#705be9',color:'white'}}>
    <MdOutlineRateReview style={{ fontSize: '1.5rem' }} /> Write a review
  </button>
  <button onClick={currenUserLikesEvent} className="btn me-3" style={{backgroundColor:'#705be9',color:'white'}}>
    <FontAwesomeIcon icon={faHeart} />
  </button>
  <input
    type="number"
    className="form-control me-3"
    placeholder="0" style={{ width: '65px' }}
    min="1"
    max="10"
    onChange={(e) => setNoOfTickets(e.target.value)}
  />

  <button className="btn " style={{backgroundColor:'#705be9',color:'white'}} onClick={() => {bookTickets(event._id); alert("Tickets confirmed");window.location.reload();}}>
    Reserve tickets <IoIosArrowDroprightCircle style={{ fontSize: '1.5rem' }} />
  </button>

</div>

           { console.log("E: ", event._id)} 
          
           
           
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
                        <Form.Control as="textarea" rows={3} value={reviewText} placeholder="Tell everyone the details about your experience!"
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
                    <Button style={{backgroundColor:'#705be9',color:'white'}}
                      onClick={() => {
                        handleReviewSubmit();
                        handleClose();
                      } }>
                      Submit Your Review
                    </Button>
                  </Modal.Footer>
                </Modal>
            </>
            
          ):(
            <div className="alert alert-warning" role="alert">
                Only a Buyer can like the event or add a review. Please log in.
              </div>
          )}
          {/* <h1>{eventName}</h1> */}
          <h3><FaLocationDot />Venue</h3>
          {/* {event.venues[0].id} */}
          <h3>{event.EventName}</h3>
          <h4>{event.Venue}</h4>
  
          {/* <img
            src={`https://api.napster.com/imageserver/v2/events/${event.id}/images/300x300.jpg`}
            alt={event.name}
          /> */}
          <hr/>
          <div className="row">
            <div className="col-4">
          <h3>Likes<BsDot />{likes.length} </h3>

          <ul className="list-group">
            {likes && likes.length > 0 ? (
            
              likes.map((like, index) => (
                <li key={index} className="list-group-item" style={{backgroundColor:'whitesmoke',border: '3px solid',borderColor: 'black #444 #888 #ccc'}}>
                  <b>{like.user.firstName} {like.user.lastName}</b> liked this event
                  <br/>
                  <Link to={`/tickets/profile/${like.user._id}`} style={{textDecoration:'none'}}>
                    @{like.user.username}
                  </Link>
                </li>
              ))
            ) : (
              <h5>No likes so far</h5>
            )}
          </ul>
          </div>
      
          <div className="col-8">
          <h3>Reviews<BsDot />{reviews.length}</h3>
          <ul className="list-group">
                {reviews && reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <li key={index} className="list-group-item" style={{backgroundColor:'whitesmoke',border: '3px solid',borderColor: 'black #444 #888 #ccc'}}>
                      <Link to={`/tickets/profile/${review.userId}`} style={{color:'black'}}>
                      <h5>{review.review}</h5>
                      </Link>
                      <h6>by @{review.reviewUsername}</h6>
                      <p><b>Rating:</b> {review.rating}</p>
                    </li>
                  ))
                ) : (
                  <h5>No reviews available</h5>
                )}
              </ul>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetails;
