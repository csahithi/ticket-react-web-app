import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
// import Nav from 'react-bootstrap/Nav';

function CustomNav() {
  const { currentUser } = useSelector((state) => state.userReducer);
  // const currentUser = 1;
  return (
  
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    
    <Link to="/tickets" className="navbar-brand">
          Home
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
              Login
            </Link>
          </li>
            <li class="nav-item">
            <Link to="/tickets/register" className="nav-link">
              Register
            </Link>
          </li>
          </>
        )}
         {currentUser && (
          <li class="nav-item">

          <Link to="/tickets/profile" className="nav-link">
            Profile
          </Link>
          </li>
        )}
        {currentUser && currentUser.role === "ADMIN" && (
          <li class="nav-item">

          <Link to="/tickets/users" className="nav-link">
            Users
          </Link>
          </li>
        )}
        {/* <Link to="/project/users" className="list-group-item">
          Users
        </Link> */}
        {/* <Link to="/project/details" className="list-group-item">
        Details
      </Link> */}
      
      </ul>
      
      {/* <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <Link to="/tickets/search" className="btn btn-outline-success">
        Search
      </Link>
      </form> */}
    </div>
  </div>
</nav>
  );
}

export default CustomNav;
