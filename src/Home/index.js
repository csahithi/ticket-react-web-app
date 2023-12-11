import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import one from '../images/one.jpg';
import two from '../images/two.jpg';
import three from '../images/three.jpg';
import four from '../images/four.jpg';
import './index.css';
import * as client from "../users/client";
import { useState } from 'react';

function Home() {
  const imageStyle = {
    border: '2px solid black',
    borderRadius: '15px',
    // padding: '5px',
    // margin: '5px',
  };
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    const user = await client.profile();
    setUser(user);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <br/>
      <div className='row'>
        <div className='col-3'>
        <img src={two} alt="..." width={'305px'} height={'500px'} style={imageStyle}/>
        </div>
        <div className='col-3'>
        <img src={one} alt="..." width={'305px'} height={'500px'} style={imageStyle}/>
        </div>
        <div className='col-3'>
        <img src={four} alt="..." width={'305px'} height={'500px'} style={imageStyle}/>
        </div>
        <div className='col-3'>
        <img src={three} alt="..." width={'300px'} height={'500px'} style={imageStyle}/>
            </div>
      </div>
    <div className='tagline'>
    <div class="container">
  <div class="row">
    <div class="col-md-12 text-center">
      {user && <h1 style={{color:'white',fontSize:'2.8em'}}>Hi {user.firstName}{' '}{user.lastName}, welcome to FestiFIND!</h1>}
      <h3 class="animate-charcter">Your Gateway to Unforgettable Experiences!</h3>
    </div>
  </div>
</div>
    </div>
    <br/>
    <br/>
    <div class="card">
  <div class="card-header" style={{backgroundColor:'#705be9',color:'white'}}>
    <h5>About our Application</h5>
  </div>
  <div class="card-body">
    {/* <h5 class="card-title">Special title treatment</h5> */}
    <p class="card-text">
    Our application <strong>FestiFIND</strong> provides a comprehensive event ticket booking platform that caters to users, especially buyers. Buyers can seamlessly search for a diverse range of events, gaining access to crucial details such as event names, venues, dates, and timings. Buyers can book events by specifying the number of tickets they wish to purchase. The platform prioritizes user security and engagement through robust authentication mechanisms, requiring users to log in before they can like events, add reviews, and follow other users. Sellers, on the other hand, have the capability to create events, to showcase their offerings. Additionally, administrators play a crucial role in managing users, ensuring a smooth and secure platform operation. Furthermore, users can express their preferences and engage with the community by liking events, sharing insightful reviews, and following other users. This multifaceted experience ensures a dynamic and interactive environment for users to explore and participate in various events. The results displayed from the search bar are a combination of events created by sellers and from a remote API, specifically Ticketmaster, offering users a comprehensive selection of events.
    </p>
  </div>
</div>
    
    </div>
  );
}

export default Home;
