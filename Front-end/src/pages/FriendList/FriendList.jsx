import { useState, useEffect } from "react";
import Friend from "./Friend";
import FriendSidebar from "../../components/FriendSidebar";
import CreatePost from "../../components/Create-Post";
import { useAuth } from "../../Authentication_Context/Auth_Provider";
function FriendList(){
    const [acceptFriends, setAcceptFriend] = useState([]);
    const {user} = useAuth();
    useEffect(() => {
        const fetchAcceptFriends = async () => {
          try {
            const response = await fetch(`http://localhost:3000/friends/accepted/${user.id}`);
            const data = await response.json();
            setAcceptFriend(data);
          } catch (error) {
            console.error("Error fetching accepted friends:", error);
          }
        };
        fetchAcceptFriends();
      }, []);
    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8  posts">
                        <div className="create-post">
                        <CreatePost />
                        </div>
                        <div className="friend-list">
                        <h2>Your Friends</h2>
                            <div className="row">
                        {acceptFriends.length === 0 ? (
                            <div className="no-friends-message">
                                <p>You have no friend yet</p>
                            </div>
                        ) : (
                            filteredFriends.map((friend) => (
                                <div className="userItem" key={friend._id}>
                                    <Friend  avatarUser={`data:image/png;base64,${friend.avatarUser}`} userName={friend.userName} />
                                </div>
                            ))
                        )}
                            </div>
                        </div>

                    </div>
                    <div className="col-4 sidebar">
                        <FriendSidebar />
                    </div>
                </div>
            </div>
        </>
    )
}
export default FriendList;