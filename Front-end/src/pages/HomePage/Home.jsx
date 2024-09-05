import FriendSidebar from "../../components/FriendSidebar";
import Header from "../../components/Header";
import "../../css/Home.css";
import Post from "../../components/Post";
import testImage from "../../image/Screenshot 2024-08-12 000128.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import CreatePost from "../../components/Create-Post";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }

    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8  posts">
            <div className="create-post">
              <CreatePost />
            </div>

            {posts.map((post) => (
              <Post
                key={post._id}
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
  );
}

export default Home;
