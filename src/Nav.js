import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navigation() {
  const { currentUser } = useSelector((state) => state.userReducer);
  // const currentUser = 1;
  return (
    <>
      <div className="list-group">
        <Link to="/tickets" className="list-group-item">
          Home
        </Link>
        {!currentUser && (
          <>
            <Link to="/tickets/login" className="list-group-item">
              Login
            </Link>
            <Link to="/tickets/register" className="list-group-item">
              Register
            </Link>
          </>
        )}
        {currentUser && (
          <Link to="/tickets/profile" className="list-group-item">
            Profile
          </Link>
        )}
        <Link to="/tickets/search" className="list-group-item">
          Search
        </Link>
        {/* <Link to="/project/users" className="list-group-item">
          Users
        </Link> */}
        {/* <Link to="/project/details" className="list-group-item">
        Details
      </Link> */}
      </div>
    </>
  );
}

export default Navigation;
