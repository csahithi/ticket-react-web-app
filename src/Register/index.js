import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as client from "../users/client";
import { setCurrentUser } from "../users/reducer";
import Card from "react-bootstrap/Card";

function Register() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "", password: "", firstName: "", lastName: "", email: "", location: "", role: "BUYER" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const register = async () => {
        try {
            const user = await client.register(credentials);
            dispatch(setCurrentUser(user));
            navigate("/tickets/profile");
        } catch (err) {
            setError(err.response.data.message);
        }
    };
    return (
        <div >
            
            {error && <div>{error}</div>}
            <br/>
      <div className='row'>
        <div className='col d-flex justify-content-center'>
        <Card style={{ width: '22rem' }}>
          <Card.Header style={{textAlign:'center'}}>
          <h2>Register</h2>
          </Card.Header>
        <Card.Body>
            <input className="form-control mb-2"
                value={credentials.username}
                placeholder="Enter Username"
                onChange={(e) => setCredentials({
                ...credentials,
                username: e.target.value })} />
            <input className="form-control mb-3" type="password"
                value={credentials.password}
                placeholder="Enter Password"
                onChange={(e) => setCredentials({
                ...credentials,
                password: e.target.value })} />
            <input className="form-control mb-2" value={credentials.firstName}
                placeholder="Enter First Name"
                onChange={(e) => setCredentials({ ...credentials,
                firstName: e.target.value })}/>
            <input className="form-control mb-2" value={credentials.lastName}
                placeholder="Enter Last Name"
                onChange={(e) => setCredentials({ ...credentials,
                lastName: e.target.value })}/>
            <input className="form-control mb-2" value={credentials.email}
                placeholder="Enter Email"
                onChange={(e) => setCredentials({ ...credentials,
                email: e.target.value })}/>
            <input className="form-control mb-2" value={credentials.location}
                placeholder="Enter Location"
                onChange={(e) => setCredentials({ ...credentials,
                location: e.target.value })}/>
            <div class="form-check">
            <input class="form-check-input" type="radio" value="BUYER" 
            checked={credentials.role === "BUYER"}
            onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
            name="flexRadioDefault" id="flexRadioDefault1"/>
            <label class="form-check-label" for="flexRadioDefault1">
                Buyer
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="radio" 
            value="SELLER"
            checked={credentials.role === "SELLER"}
            onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
            name="flexRadioDefault" id="flexRadioDefault2" checked/>
            <label class="form-check-label" for="flexRadioDefault2">
            Seller
            </label>
            </div>
      
            <button className="btn btn-primary w-100" onClick={register}>
                Register
            </button>
        </Card.Body>
        </Card>
        </div>
        </div>
        </div>
    );
}
export default Register;