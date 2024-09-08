import React, { useEffect, useState } from 'react';
import '../css/HeaderNoti.css';

const HeaderNoti = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const userId = 'currentUserId';  // Replace with the actual logged-in user's ID

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(`/api/notifications?userId=${userId}&isRead=false`)
        .then(response => response.json())
        .then(data => setUnreadCount(data.length))
        .catch(error => console.error('Error fetching unread notifications:', error));
    }, 10000); // Poll every 10 seconds, staggered from NotificationPanel

    return () => clearInterval(intervalId); // Cleanup interval
  }, [userId]);

  return (
    <div className="nav-icons-noti">
      <i className="material-icons" onClick={() => window.location.href = '/notifications'}>
        notifications
      </i>
      {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
    </div>
  );
};

export default HeaderNoti;
