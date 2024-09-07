import React, { useEffect, useState } from 'react';

const GroupRequest = () => {
  const [requests, setRequests] = useState([]);

  // Fetch group requests from the server
  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch('http://localhost:3000/api/all-group-requests');
      const data = await response.json();
      setRequests(data);
    };

    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/group-requests/${requestId}/approve`, {
        method: 'POST',
      });

      if (response.ok) {
        alert('Group request approved');
        setRequests((prev) => prev.filter((req) => req._id !== requestId));
      }
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/group-requests/${requestId}/reject`, {
        method: 'POST',
      });

      if (response.ok) {
        alert('Group request rejected');
        setRequests((prev) => prev.filter((req) => req._id !== requestId));
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <>
      <div className="container">
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
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.group_name}</td>
                <td>{req.user_id}</td>
                <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                <td>{req.status}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleApprove(req._id)}>Approve</button>
                  <button className="btn btn-danger" onClick={() => handleReject(req._id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GroupRequest;
