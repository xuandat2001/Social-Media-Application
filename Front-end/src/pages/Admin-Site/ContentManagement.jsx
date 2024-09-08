import AdminHeader from "../../components/AdminHeader";
import Search from "../../components/Search";

const  ContentManagement = ()=> {
  const demoData = [
    {
      id: "1",
      comment: "FootBall Club",
      author: "Smiling",
      type: "11/09/2001",
      statusRes: "inappropriate language",
    },
    {
      id: "2",
      comment: "FootBall Club",
      author: "Smiling",
      type: "11/09/2001",
      statusRes: "inappropriate language",
    },
    {
      id: "3",
      comment: "FootBall Club",
      author: "Smiling",
      type: "11/09/2001",
      statusRes: "inappropriate language",
    },
  ];
  return (
    <>
      <AdminHeader />
      <div className="container">
        <Search />

        <h2>COMMENT</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Comment Content </th>
              <th>Author</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {demoData.map((demo) => (
              <tr key={demo.id}>
                <td>{demo.comment}</td>
                <td>{demo.author}</td>
                <td>{demo.type}</td>
                <td>{demo.statusRes}</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>POST</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Post Content </th>
              <th>Post Image </th>
              <th>Author</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {demoData.map((demo) => (
              <tr key={demo.id}>
                <td>{demo.comment}</td>
                <td>{demo.type}</td>
                <td>{demo.author}</td>
                <td>{demo.type}</td>
                <td>{demo.statusRes}</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default ContentManagement;
