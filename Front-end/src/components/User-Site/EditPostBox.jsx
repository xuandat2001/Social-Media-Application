import React from "react";
import "../../css/postBox.css";
import dogImage from "../../image/yellow-dog-image.jpg";
import dogCircleImage from "../../image/yellow-dog-circle.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faFaceSmile,
  faLocationDot,
  faEllipsis,
  faCircleXmark,
  faEarthAsia,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../Authentication_Context/Auth_Provider";

function EditPostBox({showEditPostBox, closeEditPostBox}) {
  const { user } = useAuth();
  
  return (
    <>
      {showEditPostBox && (
        <div className="container custom-container">
          <div className="row headerBox add-border-bottom">
            <div className="col-11">
              <strong>Edit Post</strong>
            </div>
            <div className="col-1">
                <button style={{ backgroundColor: "transparent", border: "none" }} onClick={closeEditPostBox}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            </div>
          </div>

          <div className="row">
            <div className="col-1 add-margin-right">
              <img className="avatar" src={dogImage} alt="avatar" />
            </div>
            <div className="col-6">
              <h2>{user.userName}</h2>
              <p>
                <FontAwesomeIcon icon={faEarthAsia} /> 1p{" "}
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
              ></textarea>
            </div>
          </div>

          <div className="row add-margin-bottom">
            <div style={{ textAlign: "center" }}>
              <img src={dogCircleImage} alt="avatar" width={250} height={250} />
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
                    // onChange={handleImageUpload}
                    accept="image/*"
                  />
                </label>
                <button
                  type="button"
                  className="custom-post-button"
                //   onClick={handleSubmit}
                >
                  Post
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditPostBox;
