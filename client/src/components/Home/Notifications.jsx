import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Button, notification } from 'antd';


const openNotification = () => {
  const args = {
    message: 'Notification Title',
    description:
      'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
    duration: 3,
  };
  notification.open(args);
};

const Notifications = (props) => (
  <Button type="primary" onClick={openNotification}>
    Open the notification box
  </Button>
);

export default Notifications;