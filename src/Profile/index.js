import * as client from "../users/client";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../users/reducer";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { BsFillPencilFill } from "react-icons/bs";
function Profile() {
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      const user = await client.profile();
      setUser(user);
    } catch (error) {
      navigate("/tickets/login");
    }
  };
  const updateUser = async () => {
    const status = await client.updateUser(user._id, user);
  };
  const logout = async () => {
    const status = await client.logout();
    dispatch(setCurrentUser(null));
    navigate("/tickets");
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (event) => {
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }
    setValidated(true);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
    <br />
    <div className='container'>
      {user && (
        <div>
        <div className='row'>
            <div className='col'>
            <h2>Profile</h2>
      
            <div className='float-end'>
                <Button variant='warning' onClick={handleShow}><BsFillPencilFill /> Edit Profile</Button>
            </div>
        </div>
        </div>
            
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
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password" 
                
              />
            </Form.Group> */}
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
      </Modal>  
    <hr />
    <br />
    <div className='row'>
        <div className='col'>
        
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            disabled
            type="text"
            placeholder="First name"
            value={user.firstName}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            disabled
            type="text"
            placeholder="Last name"
            value={user.lastName}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              value={user.username}
              aria-describedby="inputGroupPrepend"
              disabled
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="Location" value={user.location} disabled />
          <Form.Control.Feedback type="invalid">
            Please provide a valid location.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control
            disabled
            type="email"
            placeholder="Email"
            value={user.email}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Category</Form.Label>
          <Form.Control
            disabled
            type="text"
            placeholder="Category"
            value={user.role}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        
      </Row>
      
    </Form>
    <button onClick={logout} className="btn btn-danger">Logout</button>
    </div>   
    </div>
    </div>
    )}
    </div>
  
    </>
  );
}

export default Profile;