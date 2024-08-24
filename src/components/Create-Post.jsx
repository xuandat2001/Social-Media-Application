import React from "react";
import image from "../image/Screenshot 2024-08-19 230149.png";
import video from "../image/Screenshot 2024-08-19 230229.png";
import story from "../image/Screenshot 2024-08-19 230245.png";
import testImage from "../image/Screenshot 2024-08-12 000128.png";
import "../css/createPostForm.css";

const CreatePost = () => {
  const user = {
    avatar: testImage,
    userName: "Smiling",
  };
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
          placeholder="Create a new Post"
          style={{ borderRadius: "50px" }}
        />
      </div>
      <div className="card-footer d-flex justify-content-around">
        <div className="text-center icon">
          <img src={image} alt="logo" />
          <span className="ms-2">Image</span>
        </div>
        <div className="text-center icon">
          <img src={video} alt="logo" />
          <span className="ms-2">Video</span>
        </div>
        <div className="text-center icon">
          <img src={story} alt="logo" />
          <span className="ms-2">Story</span>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
