import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../../css/EditProfile.css';

function EditProfile({ profile, setProfile }) {
    const [editedProfile, setEditedProfile] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const profileId = "66dac1e5f56f611fe4cd9a62"; // For testing 
    const navigate = useNavigate();

    // Function to fetch profile data
    const fetchProfileData = async (id) => {
      const response = await fetch(`http://localhost:3000/api/profile/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      return await response.json();
    };

    // Fetch profile data when the component mounts
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await fetchProfileData(profileId);
                setEditedProfile(data); // Pre-fill form with profile data
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProfile();
    }, [profileId]);

    const handleChange = (e) => {
        setEditedProfile({
            ...editedProfile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/profile/${profileId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedProfile),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const updatedProfile = await response.json();
            console.log('Profile updated successfully:', updatedProfile);
            navigate(`/profile/${profileId}`);
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };

    return (
        <div className="profile-edit">
            <div className="profile-edit-container">
                <Link to={`/profile/${profileId}`}>
                    <p>Back to Profile</p>
                </Link>
                <h1>Edit Profile</h1>
                <form className="edit-form">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="userName"
                        value={editedProfile.userName || ""}
                        onChange={handleChange}
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={editedProfile.password || ""}
                        onChange={handleChange}
                    />

                    <label>Bio:</label>
                    <input
                        type="text"
                        name="bio"
                        value={editedProfile.bio || ""}
                        onChange={handleChange}
                    />

                    <button className='button-edit-profile' type="button" onClick={handleSave}>Save Changes</button>
                </form>
                <div className="profile-actions">
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
