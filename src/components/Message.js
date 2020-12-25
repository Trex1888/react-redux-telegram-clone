import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "../styles/Message.css";
import { Avatar } from "@material-ui/core";

const Message = ({
  data: { timestamp, displayName, email, message, photo },
}) => {
  const user = useSelector(selectUser);
  return (
    <div className={`message ${user.email === email && "message__sender"}`}>
      <Avatar src={photo} className="message__photo" />
      <div className="message__contents">
        <p>{message}</p>
        <p>{displayName}</p>
        <small> {new Date(timestamp?.toDate()).toLocaleString()}</small>
      </div>
    </div>
  );
};

export default Message;
