import FriendSidebar from "../../components/FriendSidebar";
import Header from "../../components/Header";
import "../../css/Home.css";
import Post from "../../components/Post";
import testImage from '../../image/Screenshot 2024-08-12 000128.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import CreatePost from "../../components/Create-Post";

function Home() {
    const posts = [
        { 
          id : 1,
          avatar : testImage,
          userName : "Smiling",
          content : "Hello",
          logo    : <FontAwesomeIcon icon={faGlobe} />,
          image   : testImage,
          numberOfReaction : 62,
          numberOfComment : 10
        },
        { 
          id : 2,
          avatar : testImage,
          userName : "Smiling",
          content : "Hello",
          logo    : <FontAwesomeIcon icon={faGlobe} />,
          image   : testImage,
          numberOfReaction : 62,
          numberOfComment : 10
        },
        { 
          id : 3,
          avatar : testImage,
          userName : "Smiling",
          content : "Hello",
          logo    : <FontAwesomeIcon icon={faGlobe} />,
          image   : testImage,
          numberOfReaction : 62,
          numberOfComment : 10
        }
      ];
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8  posts">
                        <div className="create-post">
                            <CreatePost/>
                        </div>
                       
                        {posts.map((post) => (
                            <Post
                                key={post.id}
                                avatar={post.avatar}
                                userName={post.userName}
                                content={post.content}
                                logo={post.logo}
                                image={post.image}
                                numberOfReaction={post.numberOfReaction}
                                numberOfComment={post.numberOfComment}
                            />
                        ))}
                    </div>
                    <div className="col-4 sidebar">
                        <FriendSidebar />
                    </div>
                </div>
            </div>
        
        </>
        
    )
}

export default Home;
