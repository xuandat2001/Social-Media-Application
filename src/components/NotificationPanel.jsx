import React, { useState, useEffect } from 'react';
import '../css/NotificationPanel.css';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    fetch('/notifications.json') 
      .then(response => response.json())
      .then(data => setNotifications(data))
      .catch(error => console.error('Error loading notifications:', error));
  }, []); {/* This is where database input */}

  if (!notifications) {
    return <div>Loading...</div>;
  }

  const { friendRequest, newest } = notifications;

  return (
    <div className="notification-panel">
      <h2 className="notification-title">Notification</h2> {/* This should display the title */}

      <div className="notification-section">
        <h3>Friend Request</h3> {/* This should display "Friend Request" */}
        <div className="friend-request">
          <img src={friendRequest.avatar} alt={friendRequest.user} className="avatar" />
          <div className="friend-request-content">
            <strong>{friendRequest.user}</strong> {friendRequest.message}
            <div className="request-info">
              <span>{friendRequest.time}</span>
              <span>{friendRequest.mutualFriends} mutual friends</span>
            </div>
            <div className="request-actions">
              <button className="accept-button">Accept</button>
              <button className="reject-button">Reject</button>
            </div>
          </div>
        </div>
      </div>

      <div className="notification-section">
        <h3>Newest</h3> {/* This should display "Newest" */}
        {newest.map((notification) => (
          <div key={notification.id} className="newest-notification">
            <img src={notification.avatar} alt={notification.user} className="avatar" />
            <div className="notification-content">
              <strong>{notification.user}</strong> {notification.message}
              {notification.comment && <span className="comment">{notification.comment}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;
