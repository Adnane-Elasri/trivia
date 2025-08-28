import React from 'react';
import './Message.css';

const Message = ({ variant, children }) => {
  return <div className={`message ${variant}`}>{children}</div>;
};

export default Message;