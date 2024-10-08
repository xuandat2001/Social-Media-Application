import { useState } from "react";
import Reaction from "./Reaction";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFlag} from "@fortawesome/free-solid-svg-icons";
import "../css/componentItem.css";
function Comment({ imageUser, userName, content, numberOfReact = 1 }) {
  const [showReactions, setShowReactions] = useState(false);
  const {icon,color,text} = useSelector(state=> state.reaction)
  return (
    <>
      <div className="comment-list">
        <div className="row">
          <div className="col-1">
            <img src={imageUser} className="comment-logo rounded-circle" />
          </div>
          <div className="col-10">
            <h4>{userName}</h4>
            <p className="host-comment">{content}</p>
            <div className="comment-detail">
              <span className="time">1p</span>
              <button
                onClick={() => setShowReactions(true)} style={{ color: color }}>
                <FontAwesomeIcon icon={icon} /> {text} ({numberOfReact})
              </button>

              <Reaction showReactions={showReactions} setShowReactions={setShowReactions} />
            </div>
          </div>
          <div className="col-1 " style={{ backgroundColor: '#d8d8d8' }}>
              <button style={{backgroundColor: '#d8d8d8' ,color:"rgb(31 66 110)", border:"none"}}><FontAwesomeIcon icon={faFlag} /></button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Comment;
