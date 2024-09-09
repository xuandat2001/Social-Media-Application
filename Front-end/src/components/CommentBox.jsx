import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faGlobe,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import testImage from "../image/Screenshot 2024-08-12 000128.png";
import Post from "./Post";
import "../css/writeComment.css";
import Comment from "./Comment";

function CommentBox({ showComments, onClose, avatar, fullName, time,content, image, numberOfReaction, numberOfComment }) {

  const comments = [
    {
      id: 1,
      imageUser: testImage,
      content: "CR7 is the god",
      userName: "Messi",
    },
    {
      id: 2,
      imageUser: testImage,
      content: "CR7 is the god",
      userName: "Messi",
    },
    {
      id: 3,
      imageUser: testImage,
      content: "CR7 is the god",
      userName: "Messi",
    },
  ];
  return (
    <>
      {showComments && (
        <div className="comment-overlay">
          <div className="comment-container">
            <div className="header-comment">
              <div className="row">
                <div className="col-11">
                  <h3>{fullName}'s Post</h3>
                </div>
                <div className="col-1">
                  <button onClick={onClose}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </button>
                </div>
              </div>
            </div>
            <div className="post-comment">
            <Post        
                      
                    
                      avatar={avatar}
                      fullName={fullName}
                      content={content}
                      time={time}
                      image={image}
                      numberOfReaction={numberOfReaction}
                      numberOfComment={numberOfComment}
                    />
            </div>
            <div className="list-comment">
              <p>Comment:</p>
              <div className="show-comment">
                {comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    imageUser={comment.imageUser}
                    userName={comment.userName}
                    content={comment.content}
                  />
                ))}
              </div>
            </div>
            <div className="input-group write-comment">
              <input
                type="text"
                className="form-control"
                placeholder="Comment here!"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon1"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CommentBox;
