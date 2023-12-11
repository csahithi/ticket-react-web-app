import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

import * as eventsClient from "../events/client";
import * as userClient from "../users/client";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AiFillPlusSquare } from "react-icons/ai";

function Events() {
    const [getEventsList, setGetEventsList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [show, setShow] = useState(false);
    const [eventName, setEventName] = useState("");
    const [venue, setVenue] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
        const createEvent = async (SellerId) => {
            try {
                const newEvent = {
                    EventName: eventName,
                    Venue: venue,
                    Category: category,
                    Date: date,
                    Time: time,
                    SellerId: SellerId,
                };
                console.log("Event: ", newEvent);
                await client.insertEvent(newEvent);
                fetchEventsList();
            }
            catch (error) {
                console.error("Error creating event:", error);
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
    useEffect(() => {
        fetchEventsList();
        fetchUser();
      }, []);
         
  return (

    <div className="container">
      {console.log("Events List: ", getEventsList)}
        <br/>
        {currentUser && currentUser.role==="SELLER" && (
        <>
        <div className="row">
            <div className="col">
       <h2>Events ({getEventsList.length})</h2>
         </div>
        <div className="col float-end">
    
       
        <button className="btn btn-info float-end"  style={{backgroundColor:'#705be9',color:'white'}} onClick={handleShow}><AiFillPlusSquare style={{fontSize:'1.5rem'}}/> Create Event</button>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Event Name"
                autoFocus onChange={(e) => setEventName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Event Venue</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Event Venue" onChange={(e) => setVenue(e.target.value)}
          
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Event Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Event Category" onChange={(e) => setCategory(e.target.value)}
         
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"  onChange={(e) => setDate(e.target.value)}
                
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time" onChange={(e) => setTime(e.target.value)} 
              />
            </Form.Group>
            
           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button style={{backgroundColor:'#705be9',color:'white'}} onClick={()=> {
            createEvent(currentUser._id);
            handleClose()}}
            >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
   </div>
    </div>
    
      <hr/>
      {
      <div className="row row-cols-1 row-cols-md-2 g-4">
  {getEventsList && getEventsList.map((event) => (
    <div key={event._id} className="col">
      <Link to={`/tickets/details/${event._id}`} style={{textDecoration:'none'}}>
      <div className="card text-dark bg-light mb-3">
        <div className="card-body">
          <h5 className="card-title">
          {event.EventName}
        {console.log("current",currentUser._id)}
        {/* s */}
          </h5>
          <p className="card-text">
           {event.Venue} | {event.Category}
          </p>
          <p className="card-text">
           <b>Date : </b>{event.Date} <br/>
           <b>Time : </b>{event.Time}
          </p>
          {currentUser && currentUser.role==="BUYER" && (
          <div className="card-footer">
            <div className="row">
              <div className="col-2">

          <input type="number" className="form-control" 
          
          // onChange={handleTicketChange}
          />
              </div>
              <div className="col">
           <button className="btn btn-danger" 
          //  onClick={() => bookTickets(event._id)}
           >Book tickets</button>
           </div>
           </div>
        </div>)
            }
        </div>
      </div>
      </Link>
    </div>
  ))}
</div>
}
</>
)}
    </div>
  );
}
export default Events;