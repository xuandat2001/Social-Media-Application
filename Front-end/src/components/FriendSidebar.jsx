import { useState, useEffect } from "react";
import "../css/FriendSidebar.css";
import { NavLink } from "react-router-dom";
import testImage from "../image/Screenshot 2024-08-12 000128.png"; // Placeholder image
import { useAuth } from "../Authentication_Context/Auth_Provider";

function FriendSidebar() {
  const [strangerList, setStrangerList] = useState([]);
  const { user } = useAuth(); // Ensure user is defined

  const sendFriendRequest = async (strangerId) => {
    try {
      const response = await fetch('http://localhost:3000/api/notifications/friend-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderId: user.id, receiverId: strangerId }), // Pass both sender and receiver IDs
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

  useEffect(() => {
    const fetchStrangers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users');
        const data = await response.json();

        // Filter out the users that match the userId
        const filteredStrangers = data.filter(stranger => stranger._id !== user.id);
        setStrangerList(filteredStrangers);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };
    fetchStrangers();
  }, [user.id]); // Include userId in the dependency array

  return (
    <div className="friend-sidebar">
      <h2 className="title">Suggested Friends</h2>
      {strangerList.length > 0 ? (
        strangerList.map((stranger) => (
          <div key={stranger._id} className="stranger-item">
            <div className="row">
              <div className="col-6">
                <div className="user-info">
                  <img
                    src={stranger.userAvatar ? `data:image/png;base64,${stranger.userAvatar}` : testImage}
                    alt={stranger.userName}
                    className="avatar-stranger"
                  />
                  <p className="user-name">
                    <NavLink to={`/strangerprofile/${stranger._id}`}>{stranger.userName}</NavLink>
                  </p>
                </div>
              </div>
              <div className="col-6">
                <button className="btn btn-primary add-friend-btn" onClick={() => sendFriendRequest(stranger._id)}>
                  Add Friend
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No suggested friends at the moment.</p>
      )}
    </div>
  );
}

export default FriendSidebar;
