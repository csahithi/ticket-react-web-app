import Home from "../Home";
import Login from "../Login";
import Register from "../Register";
import Profile from "../Profile";
// import Search from "./search";
// import Details from "./details";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from "react";
// import UserList from "./users/list";
// import UserDetails from "./users/details";
import store from "../store";
import { Provider } from "react-redux";
import CustomNav from "../Nav";
import CurrentUser from "../users/currentUser";
import Search from "../Search";
import Details from "../Details";
import UserDetails from "../UserDetails";
import UserList from "../users/list";

function Tickets() {
//   const [key, setKey] = useState("home");

  return (
    <Provider store={store}>
      <CurrentUser>
        <div className="container-fluid">
          <div className="row">
              <CustomNav />
            </div>
          <div className="row">
            <div className="col">
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/search" element={<Search />} />
                <Route path="/profile/:id" element={<UserDetails/>} />
                <Route path="/search/:search" element={<Search />} />
                <Route path="/details/:eventId" element={<Details />} />
                <Route path="/users" element={<UserList />} />
              </Routes>
            </div>
          </div>
        </div>
      </CurrentUser>
    </Provider>
  );
}

export default Tickets;
