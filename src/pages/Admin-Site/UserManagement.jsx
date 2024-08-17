import AdminHeader from "../../components/AdminHeader";
import Search from "../../components/Search";
function UserManagement(){
    const demoData = [
        {
            id : "1",
            userName:"FootBall Club",
            email: "Smiling",
            behavior: "11/09/2001",
            statusRes: "pending"
        },
        {
            id : "2",
            userName:"FootBall Club",
            email: "Smiling",
            behavior: "11/09/2001",
            statusRes: "pending"
        },
        {
            id : "3",
            userName:"FootBall Club",
            email: "Smiling",
            behavior: "11/09/2001",
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
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Behavior</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {demoData.map((demo) => (
                        <tr key={demo.id}>
                            <td>{demo.userName}</td>
                            <td>{demo.email}</td>
                            <td>{demo.behavior}</td>
                            <td>{demo.statusRes}</td>
                            <td>
                                <button className="btn btn-danger">Suspend</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}
export default UserManagement;