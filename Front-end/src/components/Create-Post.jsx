import React, { useState, useEffect } from 'react';
import image from "../image/Screenshot 2024-08-19 230149.png";
import video from "../image/Screenshot 2024-08-19 230229.png";
import story from "../image/Screenshot 2024-08-19 230245.png";
import testImage from "../image/Screenshot 2024-08-12 000128.png";
import "../css/createPostForm.css";

const CreatePost = ({ showCreatePostBox }) => {
  const [user, setUser] = useState({
    avatar: testImage, // Fallback image in case user did not upload an avatar
    userName: "",
    fullName: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users');
        const { userName, fullName, userAvatar } = response.data;
        setUser({
          userName,
          fullName,
          avatar: userAvatar || testImage, // Use fallback image if user did not upload an avatar
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="card create-post">
      <div className="card-body d-flex align-items-center">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="rounded-circle me-3"
          style={{ width: "50px", height: "50px" }}
        />
        <input
          type="text"
          className="form-control"
          onClick={showCreatePostBox}
          placeholder="Create a new Post"
          style={{ borderRadius: "50px" }}
        />
      </div>
      <div className="card-footer d-flex justify-content-around">
        <div className="text-center icon">
          <button style={{ backgroundColor: "transparent", border: "none" }} onClick={showCreatePostBox}>
            <img src={image} alt="logo" />
            <span className="ms-2">Image</span>
          </button> 
        </div>
        <div className="text-center icon">
          <button style={{ backgroundColor: "transparent", border: "none" }} onClick={showCreatePostBox}>
            <img src={video} alt="logo" />
            <span className="ms-2">Video</span>
          </button>
        </div>
        <div className="text-center icon">
          <button style={{ backgroundColor: "transparent", border: "none" }} onClick={showCreatePostBox}>
            <img src={story} alt="logo" />
            <span className="ms-2">Story</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
