import React from "react";
import "../../css/postBox.css";
import dogImage from "../../image/white-dog-names-1-modified.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useAuth } from "../../Authentication_Context/Auth_Provider";

function SharePostBox({ closeSharePostBox }) {
    const {user} = useAuth();
  return (
    <>
      <div className="container custom-container">
        <div className="row headerBox add-border-bottom">
          <div className="col-11">
            <strong>Share Post</strong>
          </div>
          <div className="col-1">
            <button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={closeSharePostBox}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-1 add-margin-right">
            <img className="avatar" src={dogImage} alt="avatar" />
          </div>
          <div className="col-6">
            <h2>{user.fullName}</h2>
            <select id="accessRight" name="accessRight">
              <option value="public">Public</option>
              <option value="friend">Friend</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="text-area-div">
            <textarea
              className="text-area"
              placeholder="Say something about this content..."
              id="statement"
              name="statement"
              cols="65"
              rows="2"
            ></textarea>
          </div>
        </div>

        <div className="row">
          <div className="custom-share-button-container">
            <button type="button" className="custom-share-button">
              Share Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SharePostBox;


// function SharePostBox({ closeSharePostBox, originalPostId }) {
//     const [content, setContent] = useState("");
//     const [accessRight, setAccessRight] = useState("public");
//     const [originalPost, setOriginalPost] = useState(null); // Store original post data
//     const { user } = useAuth();
  
//     useEffect(() => {
//       const fetchOriginalPost = async () => {
//         try {
//           const response = await fetch(`http://localhost:3000/api/posts/${originalPostId}`);
//           const data = await response.json();
//           setOriginalPost(data);
//         } catch (error) {
//           console.error("Error fetching original post:", error);
//         }
//       };
  
//       fetchOriginalPost();
//     }, [originalPostId]);
  
//     const handleShare = async () => {
//       const newPost = {
//         content,
//         accessRight,
//         originalPostId
//       };
  
//       try {
//         const response = await fetch("http://localhost:3000/api/posts/share", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(newPost),
//         });
  
//         if (response.ok) {
//           alert("Post shared successfully");
//           closeSharePostBox();
//         } else {
//           alert("Failed to share post");
//         }
//       } catch (error) {
//         console.error("Error sharing post:", error);
//         alert("Error sharing post");
//       }
//     };
  
//     return (
//       <>
//         <div className="container custom-container">
//           <div className="row headerBox add-border-bottom">
//             <div className="col-11">
//               <strong>Share Post</strong>
//             </div>
//             <div className="col-1">
//               <button
//                 style={{ backgroundColor: "transparent", border: "none" }}
//                 onClick={closeSharePostBox}
//               >
//                 <FontAwesomeIcon icon={faCircleXmark} />
//               </button>
//             </div>
//           </div>
  
//           {originalPost && (
//             <div className="row original-post">
//               <h3>Original Post from {originalPost.user.userName}</h3>
//               <p>{originalPost.content}</p>
//               {/* Optionally show image or other content */}
//             </div>
//           )}
  
//           <div className="row">
//             <textarea
//               className="text-area"
//               placeholder="Say something about this content..."
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//             ></textarea>
//           </div>
  
//           <div className="row">
//             <button className="custom-share-button" onClick={handleShare}>
//               Share Now
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }

// export default SharePostBox;
