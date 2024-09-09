import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faThumbsUp,
  faShare,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import "../css/post.css";
import Reaction from "./Reaction.jsx";
import CommentBox from "./CommentBox.jsx";
import MessageInput from "./ReportMessage.jsx";
import EditPostBox from "./User-Site/EditPostBox.jsx";
import SharePostBox from "./User-Site/SharePostBox.jsx";
function Post({
  postId,
  avatar,
  fullName,
  content,
  time,
  image,
  numberOfReaction,
  numberOfComment,
}) {
  const { icon, color, text } = useSelector((state) => state.reaction);
  const [showReactions, setShowReactions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showReportMessage, setShowReportMessage] = useState(false);
  const [showEditPostBox, setShowEditPostBox] = useState(false);
  const [showSharePostBox, setShowSharePostBox] = useState(false);
  const closeComments = () => {
    setShowComments(false);
  };
  const onClickEditPostBox = () => {
    setShowEditPostBox(true);
  };

  const closeEditPostBox = () => {
    setShowEditPostBox(false);
  };

  const onClickSharePostBox = () => {
    setShowSharePostBox(true);
  };

  const closeSharePostBox = () => {
    setShowSharePostBox(false);
  };
  return (
    <>
      {showEditPostBox && (
        <EditPostBox closeEditPostBox={closeEditPostBox} postId={postId} />
      )}
      {showSharePostBox && (
        <SharePostBox closeSharePostBox={closeSharePostBox} postId={postId} />
      )}
      <div className="container container-post">
        <div className="row">
        <div
            style={{ backgroundColor: "#FED7FF", borderTopLeftRadius: "10px" }}
            className="col-11 d-flex align-items-center"
          >
          <img className="avatar me-3" src={avatar} alt="User avatar" />
      
            <div className="post-info">
              <h3>{fullName}</h3>
              <p className="time-post">
                <span className="authorization-icon"></span>
                {time}
              </p>
            </div>
          </div>
          <div
            style={{ backgroundColor: "#FED7FF", borderTopRightRadius: "10px" }}
            className="col-1"
          >
            <button className="btn float-end" onClick={onClickEditPostBox}>
              <FontAwesomeIcon icon={faGear} />
            </button>
            <button
              className="btn btn-outline-danger float-end"
              onClick={() => setShowReportMessage(true)}
              style={{ marginTop: "10px", marginBottom: "20px" }}
            >
              Report
            </button>
          </div>
        </div>
        <div className="row">
          <div className="post-content">
            <p>{content}</p>
          </div>
        </div>
          {image && (
        <div className="row">
        <div className="post-image ">
                        <img
                        className="main-image d-block mx-auto rounded-circle"
                        src={image}
                        
                      />
         

        </div>
      </div>
            )}
        <div className="row number-of-interaction">
          <div className="col-6">
            <p>
              <FontAwesomeIcon icon={faThumbsUp} />
              {numberOfReaction} likes
            </p>
          </div>
          <div className="col-6">
            <p className="number-comment float-end">
              {numberOfComment} comments
            </p>
          </div>
        </div>
        <div className="line "></div>
        <div className="row reaction justify-content-between">
          <div
            className="col-4 d-flex justify-content-start position-relative"
            onClick={() => setShowReactions(true)}
          >
            <button style={{ color: color }}>
              <FontAwesomeIcon icon={icon} /> {text}
            </button>
            <Reaction
              showReactions={showReactions}
              setShowReactions={setShowReactions}
            />
          </div>
          <div
            className="col-4 d-flex justify-content-center"
            onClick={() => setShowComments(true)}
          >
            <button>
              <FontAwesomeIcon icon={faComment} /> Comment
            </button>
          </div>
          <div className="col-4 d-flex justify-content-end">
            <button onClick={onClickSharePostBox}>
              <FontAwesomeIcon icon={faShare} /> Share
            </button>
          </div>
        </div>
      </div>
      {showReportMessage && (
        <div className="modal-overlay-report">
          <div className="modal-content-report">
            <MessageInput onClose={() => setShowReportMessage(false) } postId ={postId}/>
          </div>
        </div>
      )}
      {showComments && (
        <CommentBox showComments={showComments} onClose={closeComments} />
      )}
    </>
  );
}
export default Post;
