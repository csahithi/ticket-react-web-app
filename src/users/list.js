import * as client from "./client";
import { BsPencil, BsTrash3Fill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
function UserList() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // [1
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    const user = await client.profile();
    setCurrentUser(user);
  };
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
const selectUser = async (user) => {
    try {
        const u = await client.findUserById(user._id);
        setUser(u);
    } catch (err) {
        console.log(err);
    }
};
const updateUser = async () => {
    try {
        const status = await client.updateUser(user._id, user);
        setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
        console.log(err);
    }
};
const deleteUser = async (user) => {
    try {
        await client.deleteUser(user._id);
        setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
        console.log(err);
    }
};
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
  useEffect(() => {
    fetchUsers();
    fetchUser();
  }, []);

  return (
    <div>
      {currentUser && currentUser.role === "ADMIN" && (
        <>
         {user && 
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
              <Form.Check
                type="radio"
                label="Admin"
                id="admin-radio"
                value="ADMIN"
                checked={user.role === "ADMIN"}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=> {
            fetchUser();
            handleClose();
            }}>
            Close
          </Button>
          <Button variant="success" onClick={()=> {
            updateUser();
            handleClose();
            }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>  }
          <h2>Users</h2>
      
      <table className="table table-responsive">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email ID</th>
                        <th>Location</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                <Link to={`/tickets/profile/${user._id}`}>
                                    {user.username}
                                </Link>
                            </td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.location}</td>
                            <td>{user.role}</td>
                            <td className="text-nowrap">
                                <button className="btn btn-danger me-2">
                                    <BsTrash3Fill onClick={() => deleteUser(user)} />
                                </button>
                                <button className="btn btn-warning me-2">
                                    <BsPencil onClick={() => {
                                        selectUser(user);
                                        handleShow();}} />
                                </button>
                            </td>
                        </tr>))}
                </tbody>
            </table>
            </>
      )}
            {currentUser && currentUser.role !== "ADMIN" && (
        <Navigate to="/tickets/login" />
      )
      }
    </div>
  );
}

export default UserList;
