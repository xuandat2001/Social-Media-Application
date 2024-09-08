import FriendSidebar from "../../components/FriendSidebar";
import { formatDistanceToNow } from 'date-fns';

import "../../css/Home.css";
import Post from "../../components/Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import CreatePost from "../../components/Create-Post";
import React, { useState, useEffect } from 'react';
import CreatePostBox from "../../components/User-Site/CreatePostBox";
import EditPostBox from "../../components/User-Site/EditPostBox";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [showCreatePostBox, setShowCreatePostBox] = useState(false);
  const [showEditPostBox, setShowEditPostBox] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };
    fetchPosts();
  }, []);
  const onClickCreatePostBox = () => {
    setShowCreatePostBox(true);
  }

  const closeCreatePostBox = () => {
      setShowCreatePostBox(false);
  }

  const onClickEditPostBox = () => {
    setShowEditPostBox(true);
  }

  const closeEditPostBox = () => {
    setShowEditPostBox(false);
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8  posts">
            <div className="create-post">
                <CreatePost showCreatePostBox={onClickCreatePostBox} />
            </div>
                {showCreatePostBox && (
                  <CreatePostBox showCreatePostBox={showCreatePostBox} closeCreatePostBox={closeCreatePostBox} />
                                )}
                {showEditPostBox && (
                  <EditPostBox showEditPostBox={showEditPostBox} closeEditPostBox={closeEditPostBox} />
                              )}
            {posts.map((post) => (
              <Post showEditPostBox = {onClickEditPostBox}
             
                key={post._id}
                avatar={post.user && post.user.userAvatar ? `data:image/png;base64,${post.user.userAvatar}` : 'default-avatar-url'}
                userName={post.user && post.user.userName ? post.user.userName : 'Anonymous'}
                content={post.content}
                time={formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                image={`data:image/png;base64,${post.image_url}`}
                numberOfReaction={post.numberOfReaction}
                numberOfComment={post.numberOfComment}
              />
            ))}
          </div>
          <div className="col-4 sidebar">
            <FriendSidebar />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
