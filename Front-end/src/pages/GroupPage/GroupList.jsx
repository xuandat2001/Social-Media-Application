import { useState, useEffect } from "react";
import FriendSidebar from "../../components/FriendSidebar";
import CreatePost from "../../components/Create-Post";
import GroupBox from "./GroupBox";
import CreateGroupBox from "../../components/createGroupBox";
import { useAuth } from "../../Authentication_Context/Auth_Provider";
function GroupList() {  // Assuming you pass userId as a prop
    const [showCreateGroupBox, setShowCreateGroupBox] = useState(false);
    const [groups, setGroups] = useState({ adminGroups: [], memberGroups: [] }); // State to hold groups
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const closeCreateGroupBox = () => {
        setShowCreateGroupBox(false);
    };

    useEffect(() => {
        // API call to fetch user's groups
        const fetchGroups = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/user-groups/${user.id}`);
                if (!response.ok) throw new Error('Error fetching groups');
                const data = await response.json();
                setGroups(data); // Update state with the fetched groups
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, [user.id]);

    if (loading) return <p>Loading groups...</p>;
    if (error) return <p>Error loading groups: {error}</p>;

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8 posts">
                        <div className="create-post">
                            <CreatePost />
                        </div>
                        <div className="group-list">
                            <div className="row">
                                <button
                                    type="button"
                                    className="btn btn-outline-success"
                                    onClick={() => setShowCreateGroupBox(true)}
                                >
                                    <span>Create a New Group</span>
                                </button>
                                {showCreateGroupBox && (
                                    <CreateGroupBox showCreateGroupBox={showCreateGroupBox} onClose={closeCreateGroupBox} />
                                )}
                                <h2 style={{ marginTop: "20px" }}>Your Groups</h2>
                            </div>

                            <div className="row">
                                {groups.adminGroups.length > 0 || groups.memberGroups.length > 0 ? (
                                    <>
                                        <h3>Admin of Groups</h3>
                                        {groups.adminGroups.map((group) => (
                                            <div className="col-6" key={group._id}>
                                                <GroupBox
                                                    // Display base64 image
                                                    avatar={`data:image/png;base64,${group.groupPicture}`}  
                                                    nameGroup={group.group_name}
                                                    numberOfMembers={group.members?.length || 0} 
                                                />
                                            </div>
                                        ))}

                                        <h3>Joined Groups</h3>
                                        {groups.memberGroups.map((membership) => (
                                            <div className="col-6" key={membership._id}>
                                                <GroupBox
                                                    // Display base64 image
                                                    avatar={`data:image/png;base64,${membership.groupPicture}`}  
                                                    nameGroup={membership.group_name}
                                                    numberOfMembers={membership.group?.members?.length || 0}
                                                />
                                            </div>
                                        ))}
                                    </>
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
    );
}

export default GroupList;
