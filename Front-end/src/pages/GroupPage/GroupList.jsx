import FriendSidebar from "../../components/FriendSidebar";
import CreatePost from "../../components/Create-Post";
import GroupBox from "./GroupBox";
import groupImage from '../../image/yellow-dog-image.jpg';
import testImage from "../../image/Screenshot 2024-08-12 000128.png";
function GroupList(){
    const groups = [
        {
            id: 1,
            image: groupImage,
            nameGroup: "Dog's kingdom",
            numberOfFriends: 40,
        },
        {
            id: 2,
            image: testImage,
            nameGroup: "Smiling",
            numberOfMembers: 40,
        },
        {
            id: 3,
            image: testImage,
            nameGroup: "Smiling",
            numberOfMembers: 40,
        },
        {
            id: 4,
            image: testImage,
            nameGroup: "Smiling",
            numberOfMembers: 40,
        }
    ]
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8  posts">
                        <div className="create-post">
                        <CreatePost />
                        </div>
                        <div className="group-list">
                        <h2>Your Groups</h2>
                            <div className="row">
                                {groups.length > 0 ? (
                                    groups.map((group) => (
                                        <div className="col-6" key={group.id} >
                                            <GroupBox avatar={group.image} nameGroup={group.nameGroup} numberOfMembers={group.numberOfMembers} />
                                        </div>
                                    ))
                                    ) : (
                                    <p>No groups available.</p>
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
export default GroupList;