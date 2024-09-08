import React, { useState, useEffect } from "react";
import "../../css/postBox.css";
import dogImage from "../../image/yellow-dog-image.jpg";
import dogCircleImage from "../../image/yellow-dog-circle.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  faImage,
  faFaceSmile,
  faLocationDot,
  faEllipsis,
  faCircleXmark,
  faEarthAsia,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../Authentication_Context/Auth_Provider";

function EditPostBox({ closeEditPostBox, postId }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [postAuthor, setPostAuthor] = useState(""); // The author of the post

  useEffect(() => {
    console.log(`postID: ${postId}`);
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/posts/${postId}`
        );
        const post = await response.json();
        setContent(post.content);
        setSelectedImage(post.image_url ? post.image_url : null); // Load existing image if available
        setPostAuthor(post.user);
      } catch (error) {
        console.error("Failed to fetch post", error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Set new image
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("content", content);
    if (selectedImage instanceof File) {
      formData.append("imageHash", selectedImage); // Attach new image if available
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Post updated successfully");
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };
  // Check if the current user is the author of the post
  const isUserAuthorized = user.id === postAuthor;
  return (
    <>
    {isUserAuthorized ? (
      <div className="container custom-container">
        <div className="row headerBox add-border-bottom">
          <div className="col-11">
            <strong>Edit Post</strong>
          </div>
          <div className="col-1">
            <button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={closeEditPostBox}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-1 add-margin-right">
            <img
              className="avatar"
              src={`data:image/png;base64,${user.userAvatar}`}
              alt="avatar"
            />
          </div>
          <div className="col-6">
            <h2>{user.userName}</h2>
            <p>
              <FontAwesomeIcon icon={faEarthAsia} />
            </p>
          </div>
        </div>

        <div className="row">
          <div className="text-area-div">
            <textarea
              className="text-area"
              placeholder="What are you thinking?"
              id="statement"
              name="statement"
              cols="65"
              rows="1"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="row add-margin-bottom">
          <div style={{ textAlign: "center" }}>
            <img
              src={`data:image/png;base64,${selectedImage}`}
              alt="selectedImage"
              width={250}
              height={250}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6"></div>
          <div className="col-6">
            <nav className="nav add-border nav-insert-buttons">
              <label className="icon-color" style={{ cursor: "pointer" }}>
                <FontAwesomeIcon icon={faImage} />
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
              <button
                type="button"
                className="custom-post-button"
                onClick={handleSubmit}
              >
                Post
              </button>
            </nav>
          </div>
        </div>
      </div>)
       : (
        <p style={{color: 'red'}}>You are only allowed to edit your post.</p>
      )}
    </>
  );
}

export default EditPostBox;
