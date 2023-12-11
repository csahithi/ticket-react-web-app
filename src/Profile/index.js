import * as client from "../users/client";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../users/reducer";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { BsFillPencilFill } from "react-icons/bs";
import Card from 'react-bootstrap/Card';
import "./index.css";
import * as followsClient from "../follows/client";
import * as likesClient from "../likes/client";
import * as reviewsClient from "../reviews/client";
import * as ticketsClient from "../Search/client";
import { BsDot } from "react-icons/bs";
function Profile() {
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      const user = await client.profile();
      setUser(user);
    } catch (error) {
      navigate("/tickets/login");
    }
  };
  const [followingList, setFollowingList] = useState([]);
  const [followersList, setFollowersList] = useState([]);
  const [likesList, setLikesList] = useState([]);
  const [reviewsList, setReviewsList] = useState([]);
  const [ticketsList, setTicketsList] = useState([]);
  const fetchFollowingList = async () => {
    try {
      if (!user) {
        console.log("User is null");
        return;
      }
      console.log("Fetching following list for user:", user._id);
      const followingList = await followsClient.findFollowedUsersByUser(user._id);
      console.log("Following list:", followingList);
      try {const updatedFollowingList = await Promise.all(
        followingList.map(async (following) => {
          const userData = await client.findUserById(following.followingId._id);
          return { ...following, followingUsername: userData.username };
        })
      );      
      setFollowingList(updatedFollowingList);
    }
      catch (error) {
        console.error("Error fetching user:", error);
      }

    } catch (error) {
      console.error("Error fetching following list:", error);
    }
  };
  const fetchFollowersList = async () => {
    try {
      if (!user) {
        console.log("User is null");
        return;
      }
      console.log("Fetching followers list for user:", user._id);
      const followersList = await followsClient.findFollowersOfUser(user._id);
      console.log("Followers list:", followersList);
      try {
        const updatedFollowersList = await Promise.all(
        followersList.map(async (follower) => {
          const userData = await client.findUserById(follower.followerId._id);
          return { ...follower, followerUsername: userData.username };
        })
      );      
      setFollowersList(updatedFollowersList);
      }
    catch (error) {
        console.error("Error fetching user:", error);
    }

    } catch (error) {
      console.error("Error fetching following list:", error);
    }
  };
  const fetchLikesList = async () => {
    try {
      if (!user) {
        console.log("User is null");
        return;
      }
      console.log("Fetching likes list for user:", user._id);
      const likesList = await likesClient.findEventsThatUserLikes(user._id);
      console.log("Likes list:", likesList);
    //   try {
    //     const updatedLikesList = await Promise.all(
    //     likesList.map(
    //       async (list) => {
    //       const userData = await client.findUserById(list._id);
    //       return { ...follower, followerUsername: userData.username };
    //     }
    //     )
    //   );      
    //   setFollowersList(updatedFollowersList);
    // }
    // catch (error) {
    //     console.error("Error fetching user:", error);
    // }
    setLikesList(likesList);
    } catch (error) {
      console.error("Error fetching following list:", error);
    }
  };
  const updateUser = async () => {
    const status = await client.updateUser(user._id, user);
  };
  const logout = async () => {
    const status = await client.logout();
    dispatch(setCurrentUser(null));
    navigate("/tickets");
  };
  const fetchReviewsList = async () => {
    try {
      if (!user) {
        console.log("User is null");
        return;
      }
      console.log("Fetching reviews list for user:", user._id);
      const reviewsList = await reviewsClient.findEventsThatUserReviews(user._id);
      console.log("Reviews list:", reviewsList);
      setReviewsList(reviewsList);
    } catch (error) {
      console.error("Error fetching following list:", error);
    }
  };
  const fetchTicketsList = async () => {
    try {
      if (!user) {
        console.log("User is null");
        return;
      }
      console.log("Fetching tickets list for user:", user._id);
      const ticketsList = await ticketsClient.findTicketsByUserId(user._id);
      console.log("Tickets list:", ticketsList);
      setTicketsList(ticketsList);
    } catch (error) {
      console.error("Error fetching following list:", error);
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (event) => {
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }
    setValidated(true);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    if (user) {
      fetchFollowingList();
      fetchFollowersList();
      fetchLikesList();
      fetchReviewsList();
      fetchTicketsList();
    }
  }, [user]);

  return (
    <>
    <br />
    <div className='container'>
      {user && (
        <div>
        <div className='row'>
            <div className='col'>
            <h2>Profile</h2>
      
            <div className='float-end'>
                <Button variant='warning' className="me-3" onClick={handleShow}><BsFillPencilFill /> Edit Profile</Button>
                <button onClick={logout} className="btn btn-danger">Logout</button>
            </div>
        </div>
        </div>
            
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name" 
                value={user.firstName}
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name" 
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password" 
                value={user.password}  
                onChange={(e) => setUser({ ...user, password: e.target.value })}           
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location" 
                value={user.location}
                onChange={(e) => setUser({ ...user, location: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Check
                type="radio"
                label="Buyer"
                id="buyer-radio"
                value="BUYER"
                checked={user.role === "BUYER"}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              />
              <Form.Check
                type="radio"
                label="Seller"
                id="seller-radio"
                value="SELLER"
                checked={user.role === "SELLER"}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={()=> {
            fetchUser();
            handleClose();
            }}>
            Close
          </Button>
          <Button style={{backgroundColor:'#705be9',color:'white'}} onClick={()=> {
            updateUser();
            handleClose();
            }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>  
    <hr />
    <br />
    <div className='row'>
        <div className='col'>
        
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            disabled
            type="text"
            placeholder="First name"
            value={user.firstName}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            disabled
            type="text"
            placeholder="Last name"
            value={user.lastName}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              value={user.username}
              aria-describedby="inputGroupPrepend"
              disabled
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="Location" value={user.location} disabled />
          <Form.Control.Feedback type="invalid">
            Please provide a valid location.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control
            disabled
            type="email"
            placeholder="Email"
            value={user.email}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Category</Form.Label>
          <Form.Control
            disabled
            type="text"
            placeholder="Category"
            value={user.role}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        
      </Row>
      
    </Form>
    <br/>
    <div className="row">
      <div className="col">
      <div class="accordion" id="accordionPanelsStayOpenExample" >
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" style={{backgroundColor:'#705be9',color:'white'}} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        <b>Liked Events<BsDot />{likesList.length}</b>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
      <div class="accordion-body">
      {likesList.length==0 && <p>You haven't liked any events yet!</p>}
      {user && <div>
      
      {console.log("Likes list:", likesList)}
      {likesList && likesList.map((like) => (
        <li class="list-group-item list-group-item-action">
                <Link to={`/tickets/details/${like.eventId}`} style={{textDecoration:"none",color:"black"}}>
                  {like.eventId}
                </Link>
              </li>

      ))}
    
    </div>}
        </div>
    </div>
  </div>
  </div>
    </div>
    <div className="col">
    <div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" style={{backgroundColor:'#705be9',color:'white'}} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne-one" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        <b>Following<BsDot />{followingList.length}</b>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne-one" class="accordion-collapse collapse show">
      <div class="accordion-body">
      {followingList.length==0 && <p>You are not following anyone yet!</p>}
    {user && <div>
      
      {console.log("Following list:", followingList)}
      {followingList && followingList.map((user) => (
        <li class="list-group-item list-group-item-action">
                <Link to={`/tickets/profile/${user.followingId._id}`} style={{textDecoration:"none",color:"black"}}>
                  @{user.followingUsername}
                </Link>
                </li>
      ))}
    </div>
   }
        </div>
    </div>
  </div>
  </div>
    </div>
    <div className="col">
   
    <div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" style={{backgroundColor:'#705be9',color:'white'}} data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne-two" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        <b>Followers<BsDot />{followersList.length}</b>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne-two" class="accordion-collapse collapse show">
      <div class="accordion-body">
      {followersList.length==0 && <p>You don't have any followers yet!</p>}
    {user && <div>
      
      {console.log("Following list:", followingList)}
      {user && <div>
      
      {console.log("Followers list:", followersList)}
      {followersList && followersList.map((user) => (
       <li class="list-group-item list-group-item-action">
                <Link to={`/tickets/profile/${user.followerId._id}`} style={{textDecoration:"none",color:"black"}}>
                  @{user.followerUsername}
                </Link>
                </li>
            
      ))}
 
    </div>}
    </div>
   }
        </div>
    </div>
  </div>
  </div>

    </div>
    <div className="col">
      <div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne-three" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne-three">
        <b>Reviews<BsDot />{reviewsList.length}</b>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne-three" class="accordion-collapse collapse show">
      <div class="accordion-body">
      {reviewsList.length==0 && <p>You haven't posted any reviews yet!</p>}
      {user && <div>
      
      {console.log("Reviews list:", reviewsList)}
      {reviewsList && reviewsList.map((review) => (
        <li class="list-group-item list-group-item-action">
                <Link to={`/tickets/details/${review.eventId}`} style={{textDecoration:"none",color:"black"}}>
                  {review.eventId}
                </Link>
              </li>

      ))}
    
    </div>}
        </div>
    </div>
  </div>
  </div>
    </div>
    <div className="row">
    <div className="col">
      <div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne-four" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne-four">
        <b>Events Booked<BsDot />{ticketsList.length}</b>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne-four" class="accordion-collapse collapse show">
      <div class="accordion-body">
      {ticketsList.length==0 && <p>You haven't booked any events yet!</p>}
      {user && <div>
      
      {console.log("Tickets list:", ticketsList)}
      {ticketsList && ticketsList.map((ticket) => (
        <li class="list-group-item list-group-item-action">
                {ticket.event && ticket.event._id && ticket.event.EventName && (
                <Link to={`/tickets/details/${ticket.event._id}`} style={{textDecoration:"none",color:"black"}}>
                  {ticket.event.EventName}
                </Link>)}
              </li>

      ))}
    
    </div>}
        </div>
    </div>
  </div>
  </div>
    </div>
    </div>
    </div>
    
    </div>   
    </div>
    </div>
    )}
    </div>
  
    </>
  );
}

export default Profile;