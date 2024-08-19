import Header from "../components/Header";
import Post from '../components/Post.jsx';
import testImage from '../image/Screenshot 2024-08-12 000128.png'
import groupImage from '../image/yellow-dog-image.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import '../css/group.css';
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
    const group = {
      groupName: "Dog's KingDom",
      groupImage: groupImage,
      groupMember: 10
    }
    return(
      <>
            <Header/>
            <div className="header-group">
              <div className="img-group">
                <img src={group.groupImage}/>
              </div>
              <div className="row">
                <div className="col-10">
                  <h1>{group.groupName}</h1>
                  <p>Private Group {group.groupMember} members</p>
                </div>
                <div className="col-2"></div>
              </div>
              <div className="nav-group">
                <ul class="list-group">
                  <li class="list-group-item">Discussion</li>
                  <li class="list-group-item">Member</li>
                  <li class="list-group-item">Media</li>
                </ul>
              </div>
            </div>
          <div className="container-fluid">

            <div className="row">
              <div className="col-8">
                  {posts.map((post) => (
                  <Post key = {post.id} avatar={post.avatar} userName={post.userName} content={post.content} logo={post.logo} image={post.image} numberOfReaction={post.numberOfReaction} numberOfComment={post.numberOfComment}/>
                ))}
              </div>
                <div className="col-4 fixed-rule">
                    <div className="text-sidebar">
                      <h2>RULE</h2>
                      <p>Members should treat each other with respect. Disrespectful language, harassment, or personal attacks are not tolerated</p>
                      <p>Cr7 is the GOAT</p>
                    </div>
                </div>
            </div>
     
            
        </div>
      </>

    )
}
export default Group;