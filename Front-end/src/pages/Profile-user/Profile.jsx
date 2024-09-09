import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Authentication_Context/Auth_Provider";
import Post from "../../components/Post";
import FriendSidebar  from "../../components/FriendSidebar";
import { formatDistanceToNow } from 'date-fns';
const Profile = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  // Fetch user posts, friends, and groups from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user posts
        const postResponse = await fetch(`http://localhost:3000/api/posts/user/${user.id}`);
        const postData = await postResponse.json();
        setPosts(postData);

        const friendsResponse = await fetch(`http://localhost:3000/friends/accepted/${user.id}`);
        const friendsData = await friendsResponse.json();
        setFriends(friendsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user && user.id) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="profile-container">
      <div className="main-content">
        <div className="header">
          <div className="profile-info">
            <div className="profile-pic">
              <img src={`data:image/png;base64,${user.userAvatar}`} className="img-profile" alt="Profile" />
            </div>
            <div className="profile-details">
              <h1>{user.fullName ? user.fullName : user.userName}</h1>
              <p>{posts.length} Posts | {friends.length} Friends</p>
              <p>{user.email}</p>
              <br />
              <div className="profile-actions">
                <Link to="/editprofile">
                  <p>Edit</p>
                </Link>
              </div>
            </div>
          </div>
          <hr />
          <div className="profile-action-container">
            <div className="profile-actions">
              <button>Post</button>
            </div>
          </div>
          <hr />
        </div>
        <div className="profile-content">
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
      <div className="interaction-sidebar">
          <FriendSidebar />
      </div>
    </div>
  );
};

export default Profile;
