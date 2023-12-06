import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as client from "../users/client";
import { setCurrentUser } from "../users/reducer";
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
        <div className="w-25">
            <h1>Register</h1>
            {error && <div>{error}</div>}
            <input className="form-control mb-2"
                value={credentials.username}
                placeholder="Username"
                onChange={(e) => setCredentials({
                ...credentials,
                username: e.target.value })} />
            <input className="form-control mb-3" type="password"
                value={credentials.password}
                placeholder="Password"
                onChange={(e) => setCredentials({
                ...credentials,
                password: e.target.value })} />
            <input className="form-control mb-2" value={credentials.firstName}
                placeholder="First Name"
                onChange={(e) => setCredentials({ ...credentials,
                firstName: e.target.value })}/>
            <input className="form-control mb-2" value={credentials.lastName}
                placeholder="Last Name"
                onChange={(e) => setCredentials({ ...credentials,
                lastName: e.target.value })}/>
            <input className="form-control mb-2" value={credentials.email}
                placeholder="Email"
                onChange={(e) => setCredentials({ ...credentials,
                email: e.target.value })}/>
            <input className="form-control mb-2" value={credentials.location}
                placeholder="Location"
                onChange={(e) => setCredentials({ ...credentials,
                location: e.target.value })}/>
            <div className="mb-2">
                <label>
                    <input
                    type="radio"
                    value="BUYER"
                    checked={credentials.role === "BUYER"}
                    onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
                    />
                    Buyer
                </label>
                <label>
                    <input
                    type="radio"
                    value="SELLER"
                    checked={credentials.role === "SELLER"}
                    onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
                    />
                    Seller
                </label>
            </div>
            <button className="btn btn-primary w-100" onClick={register}>
                Register
            </button>
        </div>
    );
}
export default Register;