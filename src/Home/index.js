import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import one from '../images/one.jpg';
import two from '../images/two.jpg';
import three from '../images/three.jpg';
import four from '../images/four.jpg';
import './index.css';

function Home() {
  const imageStyle = {
    border: '2px solid black',
    borderRadius: '15px',
    // padding: '5px',
    // margin: '5px',
  };

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
      <h3 class="animate-charcter"> Your Gateway to Unforgettable Experiences!</h3>
    </div>
  </div>
</div>
    </div>
    <br/>
    <br/>
    <Card style={{ width: '15rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
    </div>
  );
}

export default Home;
