import AdminHeader from "../../components/AdminHeader";
import Search from "../../components/Search";

function GroupRequest() {
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
        <table className="table">
          <thead>
            <tr>
              <th>Comment </th>
              <th>Author</th>
              <th>Type</th>
              <th>Status</th>
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
      </div>
    </>
  );
}
export default GroupRequest;
