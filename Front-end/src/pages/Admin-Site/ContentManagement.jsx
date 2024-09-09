import React, { useEffect, useState } from 'react';
import AdminHeader from "../../components/AdminHeader";
import Search from "../../components/Search";

const ContentManagement = () => {
  const [reportedPosts, setReportedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportedPosts = async () => {
        try {
            const response = await fetch('http://localhost:3000/reported-posts', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();

            if (Array.isArray(data)) {
                setReportedPosts(data);
            } else {
                console.error("Expected an array but got:", data);
                setReportedPosts([]);
            }
        } catch (error) {
            console.error("Error fetching reported posts:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchReportedPosts();
}, []);
const handleDelete = async (postId) => {
  try {
    const response = await fetch(`http://localhost:3000/reported-posts/${postId}`, {
      method: 'DELETE',
      credentials: 'include', // Make sure cookies are sent with the request
    });

    const result = await response.json();

    if (response.ok) {
      // Remove the deleted post from the state
      setReportedPosts(reportedPosts.filter(post => post._id !== postId));
      alert(result.message);
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    alert("Failed to delete post. Please try again.");
  }
};
  return (
    <>
      <AdminHeader />
      <div className="container">
        <Search />
        <h2>COMMENT</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Comment Content</th>
              <th>Author</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Add content here for comments */}
          </tbody>
        </table>

        <h2>REPORTED POSTS</h2>

        {loading ? (
          <p>Loading...</p>
        ) : reportedPosts.length === 0 ? (
          <p>No reported posts available.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Post Content</th>
                <th>Post Image</th>
                <th>Author</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reportedPosts.map((post) => (
                <tr key={post._id}>
                  <td>{post.content}</td>
                  <td>
                    {post.image_url ? (
                      <img src={`data:image/png;base64,${post.image_url}`} alt="Post" style={{ width: "50px" }} />
                    ) : (
                      'No image'
                    )}
                  </td>
                  <td>{post.user ? post.user.fullName : 'Anonymous'}</td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td>{post.reportDetails.reportReason}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(post._id)} >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ContentManagement;
