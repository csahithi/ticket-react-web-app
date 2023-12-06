import * as client from "../users/client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../users/reducer";
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
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error.message}</div>}
      <input
        type="text"
        className="form-control"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="form-control"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login} className="btn btn-primary">
        Login
      </button>
    </div>
  );
}

export default Login;
