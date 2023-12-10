import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import * as client from '../users/client';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaCircleUser } from "react-icons/fa6";
import * as likesClient from '../likes/client';
import * as followsClient from '../follows/client';
import { useSelector } from 'react-redux';

function UserDetails() {
  // const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  // const [userDetails, setUserDetails] = useState(null);

  const { currentUser } = useSelector((state) => state.userReducer);
  const { id } = useParams();
  // console.log("ID: ", id);
  const fetchLikes = async () => {
    try {const likes = await likesClient.findEventsThatUserLikes(id);
    setLikes(likes);}
    catch (error) {
      console.error("Error fetching likes:", error);
    }
  };
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {const user = await client.findUserById(id);
    setUser(user);
    console.log(user);
  }
    catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  // const updateUser = async () => {
  //   const status = await client.updateUser(id, user);
  // };
  // const deleteUser = async (id) => {
  //   const status = await client.deleteUser(id);
  //   navigate("/project/users");
  // };
  const followUser = async () => {
    const status = await followsClient.userFollowsUser(id);
    setIsFollowing(true);
    fetchFollowers();
  };
  const unfollowUser = async () => {
    const status = await followsClient.userUnfollowsUser(id);
    setIsFollowing(false);
    fetchFollowers();
  };
  const fetchFollowers = async () => {
    const followers = await followsClient.findFollowersOfUser(id);
    setFollowers(followers);
  };
  const fetchFollowing = async () => {
    const following = await followsClient.findFollowedUsersByUser(id);
    setFollowing(following);
  };
  // const fetchCurrentUser = async () => {
  //   const user = await client.account();
  //   setCurrentUser(user);
  // };
  const alreadyFollowing = () => {
    return followers.some((follows) => {
      return follows.followerId._id === currentUser._id;
    });
  };



  useEffect(() => {
    fetchUser();
    // fetchLikes();
    fetchFollowers();
    fetchFollowing();
    // const fetchUserDetails = async () => {
    //   try {
    //     const user = await client.findUserById(userId);
    //     setUserDetails(user);
    //   } catch (error) {
    //     console.error('Error fetching user details:', error);
    //   }
    // };

    // if (userId) {
    //   fetchUserDetails();
    // }
  }, [id]);

  // if (!userDetails) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className='container'>
     
        <br/>
      <div className='row'>
        <div className='col'>
        <h2>User Details</h2>
        </div>
        <div className='col float-end'>
      
      {currentUser && currentUser._id !== id && (
        <>
          {!alreadyFollowing() && !isFollowing ? (
            
            <button onClick={followUser} className="btn btn-warning float-end">
            Follow
          </button>
          ) : (
            <button onClick={unfollowUser} className="btn btn-danger float-end">
              Unfollow
            </button>
          )}
        </>
      )}
      </div>
      </div>
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
        {user && <div>
          <div className='row text-center'>
        <h3> {user.firstName} {user.lastName}</h3>
        </div>
        <hr/>
        <div className='row text-center'>
        <h6> {user.email} </h6>
        </div>
        <div className='row text-center'>
        <h6> {user.location} </h6>
        </div>
        <div className='row text-center'>
        <h6> {user.role} </h6>
        </div>
        </div>}
        </Card.Body>
    </Card>         
        </div> 
      </div>
      {/* <h3>Likes</h3>
          <ul className="list-group">
            {likes.length==0 && <p>No likes yet!</p>}
            {likes.map((like, index) => (
              <li key={index} className="list-group-item">
                <Link to={`/tickets/details/${like.eventId}`}>
                  {like.eventId}
                </Link>
              </li>
            ))}
          </ul>   */}
          <br/>
          <div className='row'>
            <div className='col'>
          <h3>Followers</h3>
          <div className="list-group mb-3">
            {console.log("Followers: ", followers)}
            {followers.length==0 && <p>No followers yet!</p>}
            {followers.map((follows, index) => (
              <Link
                key={index}
                className="list-group-item"
                to={`/tickets/profile/${follows.followerId._id}`}
              >
                @{follows.followerId.username}
                {/* {follows.followerId._id} */}
              </Link>
            ))}
          </div>
          </div>
          <div className='col'>
          <h3>Following</h3>
          <div className="list-group">
            {console.log("Following: ", following)}
            {following.length==0 && <p>Not following anyone yet!</p>}
            {following.map((follows, index) => (
              <Link
                key={index}
                className="list-group-item"
                to={`/tickets/profile/${follows.followingId._id}`}
              >
                @{follows.followingId.username}
                {/* {follows.followingId._id} */}
              </Link>
            ))}
          </div>
          </div>
          </div>
    </div>
  );
}

export default UserDetails;
