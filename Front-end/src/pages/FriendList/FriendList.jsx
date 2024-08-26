import testImage from "../../image/Screenshot 2024-08-12 000128.png";
import Friend from "./Friend";
import FriendSidebar from "../../components/FriendSidebar";
import CreatePost from "../../components/Create-Post";
function FriendList(){
    const friends = [
        {
            id: 1,
            image: testImage,
            userName: "Smiling",
            numberOfFriends: 40,
        },
        {
            id: 2,
            image: testImage,
            userName: "Smiling",
            numberOfFriends: 40,
        },
        {
            id: 3,
            image: testImage,
            userName: "Smiling",
            numberOfFriends: 40,
        },
        {
            id: 4,
            image: testImage,
            userName: "Smiling",
            numberOfFriends: 40,
        }
    ]
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
                                {friends.length > 0 ? (
                                    friends.map((friend) => (
                                        <div className="col-3" key={friend.id}>
                                            <Friend  avatar={friend.image} userName={friend.userName} numberOfFriends={friend.numberOfFriends} />
                                        </div>
                                    ))
                                    ) : (
                                    <p>No friends available.</p>
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