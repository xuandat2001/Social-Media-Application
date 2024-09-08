import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Post from "../../components/Post.jsx";
import { useAuth } from "../../Authentication_Context/Auth_Provider";
import "../../css/Profile.css";

function StrangerProfile() {
  const [userStranger, setUserStranger] = useState(null);
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Ensure user is defined

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`);
        if (!response.ok) throw new Error("Error fetching user details");
        const data = await response.json();
        setUserStranger(data); // Set the fetched user data

        const postResponse = await fetch(`http://localhost:3000/api/posts/user/${userId}`);
        const postData = await postResponse.json();
        setPosts(postData);

        const friendsResponse = await fetch(`http://localhost:3000/friends/accepted/${userId}`);
        const friendsData = await friendsResponse.json();
        setFriends(friendsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [userId]);

  const sendFriendRequest = async (strangerId) => {
    try {
      const response = await fetch('http://localhost:3000/api/notifications/friend-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderId: user.id, receiverId: userId }), // Pass both sender and receiver IDs
      });
      if (response.ok) {
        alert('Friend request sent successfully!');
      } else {
        console.error('Failed to send friend request');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  if (loading) return <p>Loading User details...</p>;
  if (error) return <p>Error loading User details: {error}</p>;
  
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column align-items-center">
            <div className="profile-info text-center">
              <div className="profile-pic">
                <img src={`data:image/png;base64,${userStranger.userAvatar}`} className="img-profile img-thumbnail" alt="Profile" />
              </div>
              <div className="profile-details">
                <h1>{userStranger.fullName ? userStranger.fullName : userStranger.userName}</h1>
                <p>{posts.length} Posts | {friends.length} Friends</p>
              </div>
            </div>
            <hr />
            <div className="profile-action-container">
              <div className="profile-actions">
                <button className="btn btn-primary" onClick={() => sendFriendRequest(userId)}>Add Friend</button>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div className="col-12">
          <div className="d-flex flex-column align-items-center">
          {posts.length > 0 ? (
              posts.map((post) => (
                <Post
                  key={post.id}
                  avatar={`data:image/png;base64,${post.user.userAvatar}`}
                  userName={post.userName}
                  content={post.content}
                  logo={post.logo}
                  image={post.image}
                  numberOfReaction={post.numberOfReaction}
                  numberOfComment={post.numberOfComment}
                />
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StrangerProfile;
