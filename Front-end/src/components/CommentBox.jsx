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

function CommentBox({ showComments, onClose }) {
  const post = {
    id: 1,
    avatar: testImage,
    userName: "Smiling",
    content: "Hello",
    logo: <FontAwesomeIcon icon={faGlobe} />,
    image: testImage,
    numberOfReaction: 62,
    numberOfComment: 10,
  };

  const commentDetail = {
    userName: "Smiling",
  };

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
                  <h3>{commentDetail.userName}'s Post</h3>
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
                avatar={post.avatar}
                userName={post.userName}
                content={post.content}
                logo={post.logo}
                image={post.image}
                numberOfReaction={post.numberOfReaction}
                numberOfComment={post.numberOfComment}
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
