import * as client from "../users/client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../users/reducer";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = async () => {
    try {
      const credentials = { username: username, password: password };
      const user = await client.login(credentials);
      dispatch(setCurrentUser(user));
      navigate("/tickets/profile");
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div>
      
      {error && <div className="alert alert-danger">{error.message}</div>}
      <br/>
      <div className='row'>
        <div className='col d-flex justify-content-center'>
        <Card style={{ width: '22rem' }}>
          <Card.Header style={{textAlign:'center'}}>
          <h2>Login</h2>
          </Card.Header>
        <Card.Body>
      <input
        type="text"
        className="form-control mb-3 mr-sm-3"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-3 mr-sm-3"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login} style={{backgroundColor:'#705be9',color:'white'}} className="btn btn-primary w-100">
        Login
      </button>

      </Card.Body>
      </Card>
      </div>
      </div>
      

    </div>
  );
}

export default Login;
