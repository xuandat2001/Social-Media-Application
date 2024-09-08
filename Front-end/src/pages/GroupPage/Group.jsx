import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/Post.jsx";
import "../../css/group.css";
import GroupHeader from "./GroupPageComponent/GroupHeader.jsx";
import GroupRule from "./GroupPageComponent/GroupRule.jsx";
import InvitationBox from "../GroupPage/GroupPageComponent/invitationBox.jsx"; // Import the InvitationBox
import { useAuth } from "../../Authentication_Context/Auth_Provider.jsx";
import { formatDistanceToNow } from 'date-fns';
function Group() {
  const { user } = useAuth();
  const { groupId } = useParams(); // Get groupId from URL
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInvitation, setShowInvitation] = useState(false); // State for invitation box
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/groups/${groupId}`);
        if (!response.ok) throw new Error("Error fetching group details");
        const data = await response.json();

        setGroup(data); // Set the fetched group data

        const postResponse = await fetch(`http://localhost:3000/api/posts/user/${user.id}`);
        const postData = await postResponse.json();
        setPosts(postData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  if (loading) return <p>Loading group details...</p>;
  if (error) return <p>Error loading group details: {error}</p>;


  return (
    <div className="group-page">
      <GroupHeader
        groupName={group?.group_name}
        groupImage={`data:image/png;base64,${group?.groupPicture}`}
        groupMember={group?.members?.length || 0}
        onClick={() => setShowInvitation(true)}
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-8">

          {posts.map((post) => (
              <Post        
                key={post._id}
                postId ={post._id}
                avatar={post.user && post.user.userAvatar ? `data:image/png;base64,${post.user.userAvatar}` : 'default-avatar-url'}
                fullName={post.user && post.user.fullName ? post.user.fullName : 'Anonymous'}
                content={post.content}
                time={formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                image={`data:image/png;base64,${post.image_url}`}
                numberOfReaction={post.numberOfReaction}
                numberOfComment={post.numberOfComment}
              />
            ))}
          </div>

          <div className="col-4 fixed-rule">
            <GroupRule />
          </div>
        </div>
      </div>

      {showInvitation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <InvitationBox onClose={() => setShowInvitation(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Group;
