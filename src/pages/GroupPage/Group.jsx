import Header from "../../components/Header.jsx";
import Post from '../../components/Post.jsx';
import testImage from '../../image/Screenshot 2024-08-12 000128.png'
import groupImage from '../../image/yellow-dog-image.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe,faLock } from '@fortawesome/free-solid-svg-icons';
import '../../css/group.css';
import GroupHeader from "./GroupPageComponent/GroupHeader.jsx";
import GroupRule from "./GroupPageComponent/GroupRule.jsx";
function Group(){
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
    
    return(
      <div className="group-page">
          <Header/>
          <GroupHeader/>
          <div className="container-fluid">

            <div className="row">
              <div className="col-8">
                  {posts.map((post) => (
                  <Post key = {post.id} avatar={post.avatar} userName={post.userName} content={post.content} logo={post.logo} image={post.image} numberOfReaction={post.numberOfReaction} numberOfComment={post.numberOfComment}/>
                ))}
              </div>
                <div className="col-4 fixed-rule">
                    <GroupRule/>
                </div>
            </div>
        </div>
      </div>

    )
}
export default Group;