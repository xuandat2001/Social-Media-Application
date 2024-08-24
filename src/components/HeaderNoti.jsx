import React, { useState } from "react";
import NotificationPanel from "./NotificationPanel";
import "../css/HeaderNoti.css";

const HeaderNoti = () => {
  const [isNotificationPanelVisible, setNotificationPanelVisible] =
    useState(false);

  const toggleNotificationPanel = () => {
    setNotificationPanelVisible(!isNotificationPanelVisible);
  };

  return (
    <div className="nav-icons-noti">
      <span className="material-icons" onClick={toggleNotificationPanel}>
        notifications
      </span>
      {isNotificationPanelVisible && <NotificationPanel />}
    </div>
  );
};

export default HeaderNoti;
