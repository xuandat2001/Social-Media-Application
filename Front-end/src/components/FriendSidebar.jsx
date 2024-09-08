import "../css/FriendSidebar.css";
import testImage from "../image/Screenshot 2024-08-12 000128.png"; // Placeholder image
import { useAuth } from "../Authentication_Context/Auth_Provider";

function FriendSidebar ({ strangerList }) {
  const { user } = useAuth(); // Assuming useAuth provides the logged-in user details

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

  return (
    <div className="friend-sidebar">
      <h2 className="title">Suggested Friends</h2>
      {strangerList.map((stranger) => (
        <div key={stranger._id} className="stranger-item">
          <div className="row">
            <div className="col-6">
              <div className="user-info">
                <img
                  src={stranger.userAvatar ? `data:image/png;base64,${stranger.userAvatar}` : testImage}
                  alt={stranger.userName}
                  className="avatar-stranger"
                />
                <p className="user-name">{stranger.userName}</p>
              </div>
            </div>
            <div className="col-6">
              <button className="btn btn-primary add-friend-btn" onClick={() => sendFriendRequest(stranger._id)}>
                Add Friend
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FriendSidebar;
