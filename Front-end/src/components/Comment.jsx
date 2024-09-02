import { useState } from "react";
import Reaction from "./Reaction";

import "../css/componentItem.css";
function CommentItem({ imageUser, userName, content, numberOfReact = 1 }) {
  const [showReactions, setShowReactions] = useState(false);
  return (
    <>
      <div className="comment-list">
        <div className="row">
          <div className="col-1">
            <img src={imageUser} className="comment-logo rounded-circle" />
          </div>
          <div className="col-11">
            <h4>{userName}</h4>
            <p className="host-comment">{content}</p>
            <div className="comment-detail">
              <span className="time">1p</span>
              <button
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setShowReactions(false)}
              >
                Like ({numberOfReact})
              </button>

              <Reaction showReactions={showReactions} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CommentItem;
