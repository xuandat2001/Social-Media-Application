import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../../css/EditProfile.css';
import { useAuth } from "../../Authentication_Context/Auth_Provider";

function EditProfile({ profile, setProfile }) {
    const { user } = useAuth(); // Access the logged-in user
    const [editedProfile, setEditedProfile] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const userId = user?.id; // Using the logged-in user's ID

    // Function to fetch profile data
    const fetchProfileData = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/api/profile?userId=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }
    };

    // Fetch profile data when the component mounts
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!userId) {
                    console.error('User ID is missing'); 
                    setError('User ID is missing');
                    setLoading(false);
                    return;
                }
                
                console.log('Fetching profile for userId:', userId); // Log userId for debugging
                const data = await fetchProfileData(userId);
                setEditedProfile(data); // Pre-fill form with profile data
                setLoading(false);
            } catch (err) {
                console.error('Error:', err);
                setError('Failed to fetch profile'); 
                setLoading(false);
            }
        };

        if (userId) {
            fetchProfile();
        }
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "userName" || name === "password") {
            setEditedProfile({
                ...editedProfile,
                userId: {
                    ...editedProfile.userId, // Ensure it's overwriting other fields in userId
                    [name]: value, // Update the username or password inside userId
                },
            });
        } else {
            setEditedProfile({
                ...editedProfile,
                [name]: value,
            });
        }
    };

    const handleSave = async () => {
    try {
        // Make sure editedProfile has the latest changes
        console.log('Saving edited profile:', editedProfile); // Debugging log

        const response = await fetch(`http://localhost:3000/api/profile/${editedProfile._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedProfile),  // Directly sending editedProfile
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        const updatedProfile = await response.json();
        
        console.log('Profile updated successfully:', updatedProfile);

        setProfile(updatedProfile);  // Update the profile state
        navigate(`/profile/${editedProfile._id}`);
    } catch (err) {
        console.error('Error updating profile:', err);
    }
};


    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="profile-edit">
            <div className="profile-edit-container">
                <Link to={`/profile/${userId}`}>
                    <p>Back to Profile</p>
                </Link>
                <h1>Edit Profile</h1>
                <form className="edit-form">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="userName"
                        value={editedProfile.userId?.userName || ""} // Access username from userId
                        onChange={handleChange} // Update the nested userId.userName
                    />  

                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter new password"  
                        value={editedProfile.userId?.password || ""}
                        onChange={handleChange} // Update the nested userId.password
                    />

                    <label>Bio:</label>
                    <input
                        type="text"
                        name="bio"
                        value={editedProfile.bio || ""}
                        onChange={handleChange}
                    />

                    <button className='button-edit-profile' type="button" onClick={handleSave}>
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
