import React, { useEffect, useState } from "react";
import Post from '../../components/Post';
import { Link } from 'react-router-dom';
import { useAuth } from "../../Authentication_Context/Auth_Provider";

const Profile = () => {
  const { user } = useAuth(); // Retrieve user information from AuthContext
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setError('No user is logged in');
        setLoading(false);
        return;
      }

      try {
        // First, fetch the profile ID based on the user ID
        const userProfileResponse = await fetch(`http://localhost:3000/api/profiles?userId=${user._id}`);
        const userProfileData = await userProfileResponse.json();

        if (!userProfileResponse.ok) {
          throw new Error('Failed to fetch user profile data');
        }

        if (userProfileData.length === 0) {
          throw new Error('No profile found for this user');
        }

        const profileId = userProfileData[0]._id; // Assuming the user has only one profile

        // Now, fetch the profile details using the profile ID
        const profileResponse = await fetch(`http://localhost:3000/api/profile/${profileId}`);
        const profileData = await profileResponse.json();

        if (!profileResponse.ok) {
          throw new Error('Failed to fetch profile data');
        }

        setProfile(profileData);
        setLoading(false);

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

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
