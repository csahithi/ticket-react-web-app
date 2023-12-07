import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as client from '../users/client';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaCircleUser } from "react-icons/fa6";

function UserDetails() {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await client.findUserById(userId);
        setUserDetails(user);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className='container'>
        <br/>
      <h2>User Details</h2>
      <hr/>
      <div className='row'>
        <div className='col d-flex justify-content-center'>
        <Card style={{ width: '22rem' }}>
        <Card.Body>
        <div className='row'>
            <div className='col'>
            </div>
            <div className='col'>
                <FaCircleUser style={{ fontSize: '7rem' }} />
            </div>
            <div className='col'>
            </div>
        </div>
        
        <br/>
        <div className='row text-center'>
        <h3> {userDetails.firstName} {userDetails.lastName}</h3>
        </div>
        <hr/>
        <div className='row text-center'>
        <h6> {userDetails.email} </h6>
        </div>
        <div className='row text-center'>
        <h6> {userDetails.location} </h6>
        </div>
        <div className='row text-center'>
        <h6> {userDetails.role} </h6>
        </div>
        </Card.Body>
    </Card>
        </div> 
      </div>
    
    </div>
  );
}

export default UserDetails;
