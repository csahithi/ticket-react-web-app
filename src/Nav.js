import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import * as userClient from "./users/client";
import { useNavigate } from "react-router-dom";

// import Nav from 'react-bootstrap/Nav';

function CustomNav() {
  const { currentUser } = useSelector((state) => state.userReducer);
  console.log("Current User: ", currentUser);
  // const [currentUser, setCurrentUser] = useState(null);
  // const [presentUser, setPresentUser] = useState(null);
  // const fetchUser = async () => {
  //   try {
  //     const user = await userClient.profile();
  //     setPresentUser(user);
  //   } catch (error) {
  //     setPresentUser(null);
  //   }
  // };
  
  // useEffect(() => {
  //   fetchUser();
  // }, []);
  // const currentUser = 1;
  const navigate = useNavigate();
  return (
  
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  
    <Link to="/tickets" className="navbar-brand">
          <b>Home</b>
         </Link>
  
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        {/* <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li> */}
        {!currentUser && (
          <>
          <li class="nav-item">
            <Link to="/tickets/login" className="nav-link">
             <b>Login</b>
            </Link>
          </li>
            <li class="nav-item">
            <Link to="/tickets/register" className="nav-link">
             <b> Register</b>
            </Link>
          </li>
          </>
        )}
         {currentUser && (
          <li class="nav-item">
          <Link to="/tickets/profile" className="nav-link">
           <b> Profile</b>
          </Link>
          </li>
        )}
        {currentUser && currentUser.role === "ADMIN" && (
          <li class="nav-item">
          <Link to="/tickets/users" className="nav-link">
            <b>Users</b>
          </Link>
          </li>
        )}
        {currentUser && currentUser.role === "SELLER" && (
          <li class="nav-item">
          <Link to="/tickets/events" className="nav-link">
            <b>Events</b>
          </Link>
          </li>
        )}
       
        {/* <Link to="/project/users" className="list-group-item">
          Users
        </Link> */}
        {/* <Link to="/project/details" className="list-group-item">
        Details

      </Link> */}
      {/* <Link to="/tickets" className="nav-link">
        <b>FestiFIND</b>
      </Link> */}
      
      </ul>
      
      <form class="d-flex" >
        
      <Link to="/tickets/search" className="btn btn-outline-success">
        View Events
      </Link>
      </form>
    </div>
  </div>
</nav>
  );
}

export default CustomNav;
