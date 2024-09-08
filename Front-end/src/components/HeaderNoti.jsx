import React, { useState, useEffect } from 'react';
import NotificationPanel from './NotificationPanel';  // Import NotificationPanel component
import '../css/HeaderNoti.css';  // Assuming your existing styles
const HeaderNoti = () => {
  const [showNotifications, setShowNotifications] = useState(false);  // State to toggle panel visibility
  const [notifications, setNotifications] = useState([]);  // All notifications state (both read and unread)

  // Fetch notifications from the API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications');  // Fetch all notifications
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    // Optionally, set up polling or use WebSocket to fetch notifications periodically
    const intervalId = setInterval(fetchNotifications, 5000);  // Poll every 5 seconds
    return () => clearInterval(intervalId);  // Cleanup interval on unmount
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Count unread notifications
  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  return (
    <div className="nav-icons-noti">
      <i className="material-icons" onClick={toggleNotifications}>
        notifications
      </i>
      {/* Display badge only if there are unread notifications */}
      {unreadCount > 0 && (
        <span className="badge">{unreadCount}</span>
      )}

      {/* Show notification panel when the icon is clicked */}
      {showNotifications && (
        <div className="notification-dropdown">
          {notifications.length > 0 ? (
            <NotificationPanel notifications={notifications} /> 
          ) : (
            <div className="no-notifications">No notifications available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderNoti;
