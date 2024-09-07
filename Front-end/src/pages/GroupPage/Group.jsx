import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/Post.jsx";
import testImage from "../../image/Screenshot 2024-08-12 000128.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import "../../css/group.css";
import GroupHeader from "./GroupPageComponent/GroupHeader.jsx";
import GroupRule from "./GroupPageComponent/GroupRule.jsx";

function Group() {
  const { groupId } = useParams(); // Get groupId from URL
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/groups/${groupId}`);
        if (!response.ok) throw new Error("Error fetching group details");
        const data = await response.json();
        setGroup(data); // Set the fetched group data
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

  const posts = [
    {
      id: 1,
      avatar: testImage,
      userName: "Smiling",
      content: "Hello",
      logo: <FontAwesomeIcon icon={faGlobe} />,
      image: testImage,
      numberOfReaction: 62,
      numberOfComment: 10,
    },
    {
      id: 2,
      avatar: testImage,
      userName: "Smiling",
      content: "Hello",
      logo: <FontAwesomeIcon icon={faGlobe} />,
      image: testImage,
      numberOfReaction: 62,
      numberOfComment: 10,
    },
    {
      id: 3,
      avatar: testImage,
      userName: "Smiling",
      content: "Hello",
      logo: <FontAwesomeIcon icon={faGlobe} />,
      image: testImage,
      numberOfReaction: 62,
      numberOfComment: 10,
    },
  ];

  return (
    <div className="group-page">
      <GroupHeader
        groupName={group?.group_name}
        groupImage={`data:image/png;base64,${group?.groupPicture}`}
        groupMember={group?.members?.length || 0}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-8">
            {posts.map((post) => (
              <Post
                key={post.id}
                avatar={post.avatar}
                userName={post.userName}
                content={post.content}
                logo={post.logo}
                image={post.image}
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
    </div>
  );
}

export default Group;
