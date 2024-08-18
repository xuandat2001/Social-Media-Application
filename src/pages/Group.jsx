import Header from "../components/Header";
import Post from '../components/Post.jsx';
import testImage from '../image/Screenshot 2024-08-12 000128.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
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
        <>
        <Header/>
        {posts.map((post) => (
        <Post key = {post.id} avatar={post.avatar} userName={post.userName} content={post.content} logo={post.logo} image={post.image} numberOfReaction={post.numberOfReaction} numberOfComment={post.numberOfComment}/>
      ))}
        </>
    )
}
export default Group;