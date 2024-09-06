import React, { useEffect, useState } from "react";
import Post from '../../components/Post';


const Profile = (/*{ profileId }*/) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const profileId = "66dac1e5f56f611fe4cd9a62"; //TEMP profile ID

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/profile/${profileId}`);
        const data = await response.json()

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        
        console.log('Fetched profile data:', data)
        setProfile(data);
        setLoading(false);
        
      } catch (err) {
        setError(err.message);
        setLoading(false);
      } 
    };

    fetchProfile();
  }, [profileId]);
  
  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>Error loading profile: {error}</p>;
  }

  if (!profile) {
    return <p>Profile not found</p>;
  }
    
  return (
    <div className="profile-container">
      <div className="main-content">
        <div className="header">
          <div className="profile-info">
            <div className="profile-pic"></div> {/* profile picture */}
            <div className="profile-details">
              <h1>{profile.userId.userName}</h1>
              <p>1 Post | 20 friends</p>
              <p>smiling@gmail.com</p>
              <br />
              <p className="bio">
                BIO
                <br />
                {profile.bio}
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
          {profile.posts.length === 0 ? (
            <p> No posts yet </p>
          ) : (
            profile.posts.map((post) => (
              <Post
                key={post._id}
                // avatar={avatar || "#"}
                userName={profile.userId.userName}
                content={post.content}
                // logo={logo || "#"}
                // image={image || "#"}
                numberOfReaction={post.numberOfReaction}
                numberOfComment={post.numberOfComment}
              />
            ))
          )}
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
