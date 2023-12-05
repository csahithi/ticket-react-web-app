import { HashRouter } from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import Home from "./Home";
import Profile from "./Profile";
import Login from "./Login";
import Register from "./Register";
import Navigation from "./Nav";
import Tickets from "./Tickets";

function App() {
  return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="tickets" />} />
          <Route path="/tickets/*" element={<Tickets />} />
        </Routes>
      </HashRouter>
  );
}

export default App;
