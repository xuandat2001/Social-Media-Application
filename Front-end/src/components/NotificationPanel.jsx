import React, { useEffect, useState } from 'react';
import '../css/NotificationPanel.css';
import { useAuth } from '../Authentication_Context/Auth_Provider';

const NotificationPanel = ({ initData }) => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    
    setNotifications(initData);
    // Polling interval to fetch new notifications

    const intervalId = setInterval(() => {
      fetch(`http://localhost:3000/api/notifications/${user.id}`)
        .then(response => response.json())
        .then(data => {
          {
            if (Array.isArray(data.notifications)) {
              setNotifications(data.notifications);

            } else {
              console.error('Unexpected response format:', data.notifications);
              setNotifications([]);
            }
          }
        })
        .catch(error => console.error('Error fetching notifications:', error));
    }, 10000); // Poll every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);


    // Function to handle accepting a friend request using triggered_by and received_by
    const handleAccept = async (triggeredBy, receivedBy) => {
      try {
        const response = await fetch(`http://localhost:3000/api/notifications/friend-accepted`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ triggered_by: triggeredBy, received_by: receivedBy })
        });
  
        if (response.ok) {
          console.log('Friend request accepted');
          // Optionally update the state to remove the notification after acceptance
          setNotifications(notifications.filter(notif => notif.triggered_by !== triggeredBy));
        } else {
          console.error('Failed to accept friend request');
        }
      } catch (error) {
        console.error('Error accepting friend request:', error);
      }
    };
  const handleReject = async (triggeredBy, receivedBy) => {
    try {
      const response = await fetch(`http://localhost:3000/api/notifications/friend-rejected`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ triggered_by: triggeredBy, received_by: receivedBy })
      });

      if (response.ok) {
        console.log('Friend request rejected');
        // Optionally update the state to remove the notification after rejection
        setNotifications(notifications.filter(notif => notif.triggered_by !== triggeredBy));
      } else {
        console.error('Failed to reject friend request');
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };
  const notificationMessage = (type) => {
    switch (type) {
      case 'friendRequest':
        return 'You have new friend request';
      case 'friendRequestAccepted':
        return 'Your friend request was accepted';
      case 'friendRequestRejected':
        return 'Your friend request was rejected';
      case 'groupRequest':
        return 'You had a join group request';
      case 'groupRequestAccepted':
        return 'Your group request was accepted';
      case 'groupRequestRejected':
        return 'Your group request was rejected';
      case 'postCreated':
        return 'Your friend has created a post';
      case 'groupEdited':
        return 'Your group admin edited group';
      case 'groupDeleted':
        return 'Your group admin deleted the group';
      case 'comment':
        return 'Your friend has just comment a post';
      case 'reaction':
        return 'Your friend has just reacted a post';
      default:
        return 'Unknow message'; 
    }
  };
  return (
    <div>
      <h2 className="notification-title">Notifications</h2>
      <ul>
        {notifications.map((notif, index) => (
          <li 
            key={index}
            className={`newest-notification notification-read `}
          >
            <div className="notification-content">
              {
                notificationMessage(notif.notification_type)
              }
              {notif.notification_type === 'friendRequest' && (
                  <div>
                    <button className="accept-button" onClick={() => handleAccept(notif.triggered_by, notif.received_by)}>Accept</button>
                    <button className="reject-button" onClick={() => handleReject(notif.triggered_by, notif.received_by)}>Reject</button>
                  </div>
                )}
            </div>
          </li>))}
      </ul>


    </div>
  );
};

export default NotificationPanel;
