import React, { useEffect, useState } from 'react';
import '../css/NotificationPanel.css';

const NotificationPanel = ({ userId }) => {  // Assume userId is passed as a prop
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/api/notifications?userId=${userId}`)
        .then(response => response.json())
        .then(data => setNotifications(data));
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(interval);
  }, [userId]);  // Ensure the effect reruns if userId changes

  const handleNotificationClick = (notification) => {
    // Mark the notification as read
    fetch(`/api/notifications/${notification._id}/read`, {
      method: 'PUT',
    }).then(() => {
      switch (notification.notiType) {
        case 'friendRequest':
          window.location.href = `/profile/${notification.targetUserId}`;
          break;
        case 'friendAccepted':
          window.location.href = `/profile/${notification.targetUserId}`;
          break;
        case 'friendRejected':
          alert('Your friend request was rejected.');
          break;
        case 'groupRequest':
          window.location.href = `/group/${notification.groupId}`;
          break;
        case 'groupRejected':
          alert('Your group join request was rejected.');
          break;
        case 'comment':
          window.location.href = `/post/${notification.postId}`;
          break;
        case 'reaction':
          window.location.href = `/post/${notification.postId}`;
          break;
        default:
          break;
      }
    });

  };

  return (
    <div className="notification-panel">
      <h2 className="notification-title">Notifications</h2>
      <ul>
        {notifications.map((notif, index) => (
          <li
            key={index}
            onClick={() => handleNotificationClick(notif)}
            className={`newest-notification ${notif.isRead ? 'notification-read' : 'notification-unread'} ${notif.notiType}`}
          >                        <div className="notification-content">
              {notif.notiType === 'friendRequest' && 'New Friend Request'}
              {notif.notiType === 'friendAccepted' && 'Friend Request Accepted'}
              {notif.notiType === 'friendRejected' && 'Friend Request Rejected'}
              {notif.notiType === 'groupRequest' && 'New Group Request'}
              {notif.notiType === 'groupRejected' && 'Group Request Rejected'}
              {notif.notiType === 'comment' && 'New Comment on Your Post'}
              {notif.notiType === 'reaction' && 'New Reaction on Your Post'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;
