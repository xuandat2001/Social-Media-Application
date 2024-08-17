import AdminHeader from "../../components/AdminHeader";
import Search from "../../components/Search";

function GroupRequest(){
    const demoData = [
        {
            id : "1",
            groupName:"FootBall Club",
            requestor: "Smiling",
            date: "11/09/2001",
            statusRes: "pending"
        },
        {
            id : "2",
            groupName:"Meo Club",
            requestor: "Smiling",
            date: "11/09/2001",
            statusRes: "pending"
        },
        {
            id : "3",
            groupName:"Dog Club",
            requestor: "Smiling",
            date: "11/09/2001",
            statusRes: "pending"
        }
    ]
    return (
        <>
            <AdminHeader/>
            <div className="container">
            <Search/>
            <table className="table">
                <thead>
                    <tr>
                        <th>Group Name</th>
                        <th>Requestor</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {demoData.map((demo) => (
                        <tr key={demo.id}>
                            <td>{demo.groupName}</td>
                            <td>{demo.requestor}</td>
                            <td>{demo.date}</td>
                            <td>{demo.statusRes}</td>
                            <td>
                                <button className="btn btn-primary">Approve</button>
                                <button className="btn btn-danger">Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}
export default GroupRequest;