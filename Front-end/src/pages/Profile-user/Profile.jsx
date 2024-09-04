import React, { useEffect, useState } from "react";
import Post from "../../components/Post.jsx";
import "../../css/Profile.css";
import testImage from "../../image/Screenshot 2024-08-12 000128.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  /*
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const userId = 'test-user-id';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/profile/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);
  
  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>Error loading profile: {error}</p>;
  }

  if (!profileData) {
    return <p>No profile data found</p>;
  }
    */

  const posts = [
    {
      id: 1,
      avatar: testImage,
      userName: "Smiling",
      content: "Hello",
      logo: <FontAwesomeIcon icon={faGlobe} />,
      image: testImage,
      numberOfReaction: 62,
      numberOfComment: 10,
    },
    {
      id: 2,
      avatar: testImage,
      userName: "Smiling",
      content: "Hello",
      logo: <FontAwesomeIcon icon={faGlobe} />,
      image: testImage,
      numberOfReaction: 62,
      numberOfComment: 10,
    },
    {
      id: 3,
      avatar: testImage,
      userName: "Smiling",
      content: "Hello",
      logo: <FontAwesomeIcon icon={faGlobe} />,
      image: testImage,
      numberOfReaction: 62,
      numberOfComment: 10,
    },
  ];
  return (
    <div className="profile-container">
      <div className="main-content">
        <div className="header">
          <div className="profile-info">
            <div className="profile-pic"></div> {/* profile picture */}
            <div className="profile-details">
              <h1>Minh Nguyen</h1>
              <p>1 Post | 20 friends</p>
              <p>smiling@gmail.com</p>
              <br />
              <p className="bio">
                BIO
                <br />
                Be Individual, Be authentic
              </p>
              <div className="profile-actions">
                <p>Edit</p> {/*will be linked later*/}
              </div>
            </div>
          </div>
          <hr />
          <div className="profile-action-container">
            <div className="profile-actions">
              <button>Post</button>
              {/*will be linked later*/}
              <button>Friend</button>
              {/*will be linked later*/}
              <button>Group</button>
              {/*will be linked later*/}
            </div>
          </div>
          <hr />
        </div>
        <div className="profile-content">
          {posts.map((post) => (
            <Post
              key={post.id}
              avatar={post.avatar}
              userName={post.userName}
              content={post.content}
              logo={post.logo}
              image={post.image}
              numberOfReaction={post.numberOfReaction}
              numberOfComment={post.numberOfComment}
            />
          ))}
        </div>
      </div>
      <div className="interaction-sidebar">
        <h2>Interaction</h2>
        <div className="interaction-section">
          <h3>Suggest Friend</h3>
          <div className="suggest-friend">
            <div className="friend-pic"></div> {/* Friends picture */}
            <p>Oggy</p>
          </div>
        </div>
        <div className="interaction-section">
          <h3>Your Group</h3>
          <div className="group-pic"></div> {/* Group picture */}
          <p>Meo's Kingdom</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
