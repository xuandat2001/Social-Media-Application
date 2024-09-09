import React, { useState, useEffect } from 'react';
import NotificationPanel from './NotificationPanel';  // Import NotificationPanel component
import '../css/HeaderNoti.css'; 
import { useAuth } from '../Authentication_Context/Auth_Provider';
 // Assuming your existing styles
function HeaderNoti() {
  const { user } = useAuth(); 
  const [showNotifications, setShowNotifications] = useState(false);  // State to toggle panel visibility
  const [notifications, setNotifications] = useState([]);  // All notifications state (both read and unread)

  // Fetch notifications from the API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
      
        fetch(`http://localhost:3000/api/notifications/${user.id}`, {
          method: 'GET',  // Specify the HTTP method
          headers: {
            'Content-Type': 'application/json' // The type of data you're sending
          }  // Convert payload to JSON string
        })
          .then(response => response.json())
          .then(data => {
            console.log('Response:', data);
            setNotifications(data.notifications);
          })
          .catch(error => {
            console.error('Error:', error);
          });
    
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchNotifications();
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
            <NotificationPanel initData={notifications} /> 
          ) : (
            <div className="no-notifications">No notifications available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderNoti;
