import { useState } from 'react';
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

  return (
    <>
    <br />
    <div className='container'>
    
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
                // value={course.number} onChange={(e) => setCourse({ ...course, number: e.target.value }) }
                placeholder="Enter First Name" 
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                // value={course.number} onChange={(e) => setCourse({ ...course, number: e.target.value }) }
                placeholder="Enter Last Name" 
                
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                // value={course.number} onChange={(e) => setCourse({ ...course, number: e.target.value }) }
                placeholder="Enter Password" 
                
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                // value={course.number} onChange={(e) => setCourse({ ...course, number: e.target.value }) }
                placeholder="Enter Location" 
                
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
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
            defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            disabled
            type="text"
            placeholder="Last name"
            defaultValue="Otto"
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
          <Form.Control type="text" placeholder="location" disabled />
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
            defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        
      </Row>
      
    </Form>
    </div>   
    </div>
    </div>
  
    </>
  );
}

export default Profile;