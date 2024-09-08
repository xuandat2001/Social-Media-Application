import FriendSidebar from "../../components/FriendSidebar";
import { formatDistanceToNow } from 'date-fns';

import "../../css/Home.css";
import Post from "../../components/Post";
import CreatePost from "../../components/Create-Post";
import React, { useState, useEffect } from 'react';
import CreatePostBox from "../../components/User-Site/CreatePostBox";
import { useAuth } from "../../Authentication_Context/Auth_Provider";

const Home = () => {
  const [showCreatePostBox, setShowCreatePostBox] = useState(false);
  const [posts, setPosts] = useState([]);
  const {user} = useAuth();
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
  const onClick = () =>{
    setShowCreatePostBox(true);
  }

  const closeCreatePostBox = () => {
      setShowCreatePostBox(false);
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8  posts">
            <div className="create-post">
                <CreatePost showCreatePostBox={onClick} />
            </div>
                {showCreatePostBox && (
                  <CreatePostBox showCreatePostBox={showCreatePostBox} closeCreatePostBox={closeCreatePostBox} />
                                )}
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
          <div className="col-4 sidebar">
            <FriendSidebar />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
