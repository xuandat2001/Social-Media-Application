import React, { useEffect, useState } from 'react';
import '../css/NotificationPanel.css';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = 'currentUserId'; // Replace with the actual logged-in user's ID

  useEffect(() => {
    // Polling interval to fetch new notifications
    const intervalId = setInterval(() => {
      fetch(`/api/notifications?userId=${userId}`)
        .then(response => response.json())
        .then(data => setNotifications(data))
        .catch(error => console.error('Error fetching notifications:', error));
    }, 5000); // Poll every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [userId]);
  const handleNotificationClick = async (notification) => {
    try {
      const response = await fetch(`/api/notifications/${notification._id}/read`, { method: 'PUT' });

      if (!response.ok) {
        throw new Error('Failed to mark notification as read.');
      }

      const redirectURL = determineRedirectURL(notification);

      if (redirectURL) {
        window.location.href = redirectURL;
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
      alert('There was an error marking this notification as read. Please try again.');
    }
  };

  const determineRedirectURL = (notification) => {
    switch (notification.notification_type) {
      case 'friendRequest':
        return `/profile/${notification.targetUserId}`;
      case 'friendAccepted':
        return `/profile/${notification.targetUserId}`;
      case 'friendRejected':
        alert('Your friend request was rejected.');
        return; // No redirection needed, just an alert
      case 'groupRequest':
        return `/group/${notification.groupId}`;
      case 'groupRequestAccepted':
        return `/group/${notification.groupId}`;
      case 'groupRequestRejected':
        alert(`Your join request to Group ${notification.groupId} was rejected.`);
        return; // No redirection needed, just an alert
      case 'postCreatedForFriends':
        return `/post/${notification.post_id}`;
      case 'postCreatedForGroup':
        return `/post/${notification.post_id}`;
      case 'groupEdited':
        return `/group/${notification.groupId}`;
      case 'groupDeleted':
        alert(`The group ${notification.groupId} has been deleted.`);
        return; // No redirection needed, just an alert
      case 'comment':
        return `/post/${notification.postId}`;
      case 'reaction':
        return `/post/${notification.postId}`;
      default:
        return '/'; // Default to home if notification type is unknown
    }
  };


  const notificationMessages = {
    friendRequest: 'New Friend Request',
    friendAccepted: 'Friend Request Accepted',
    groupRequest: (notif) => `New Group Join Request from ${notif.triggered_by}`,
    postCreatedForFriends: 'New Post from a Friend',
    postCreatedForGroup: 'New Post in a Group',
    groupEdited: 'Group Edited',
    groupDeleted: 'Group Deleted',
    comment: 'New Comment on Your Post',
    reaction: 'Someone Reacted to Your Post',
    groupRequestAccepted: (notif) => `Your Join Request to Group ${notif.group_id} was Accepted`,
    groupRequestRejected: (notif) => `Your Join Request to Group ${notif.group_id} was Rejected`,
  };

  const validNotificationTypes = Object.keys(notificationMessages);

  return (
    <div className="notification-panel">
      <h2 className="notification-title">Notifications</h2>
      <ul>
        {notifications.map((notif, index) => (
          <li
            key={index}
            onClick={() => handleNotificationClick(notif)}
            className={`newest-notification ${notif.isRead ? 'notification-read' : 'notification-unread'}`}  // Dynamically apply the read/unread classes
          >
            <div className="notification-content">
              {
                validNotificationTypes.includes(notif.notification_type)
                  ? typeof notificationMessages[notif.notification_type] === 'function'
                    ? notificationMessages[notif.notification_type](notif) // Use function for custom message rendering
                    : notificationMessages[notif.notification_type] // Use string directly if it's a static message
                  : 'Unknown Notification'
              }
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;
