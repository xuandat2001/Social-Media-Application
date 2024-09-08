import "../css/FriendSidebar.css";
import testImage from "../image/Screenshot 2024-08-12 000128.png"; // Placeholder image

const FriendSidebar = ({ strangerList }) => (
  <>
    <div className="friend-sidebar">
      <h2 className="title">Suggest Friend</h2>
      {strangerList.map((stranger) => (
        <div key={stranger.id} className="stranger-item">
          <div className="row">
            <div className="col-6">
              <div className="user-info">
                <img
                  src={`data:image/png;base64,${stranger.userAvatar}`|| testImage} // Use stranger's avatar or fallback to testImage
                  alt={stranger.userName}
                  className="avatar-stranger"
                />
                <p className="user-name">{stranger.userName}</p>
                
              </div>
            </div>
            <div className="col-6"><button className="btn btn-primary add-friend-btn">Add Friend</button></div>
          </div>

        </div>
      ))}
    </div>
  </>
);

export default FriendSidebar;
