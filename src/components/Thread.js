import React, { useEffect, useState } from "react";
import "../styles/Thread.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  MicRounded,
  MoreVert,
  SendRounded,
  TimerOutlined,
} from "@material-ui/icons";
import db from "../firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectThreadId, SelectThreadName } from "../features/threadSlice";
import { selectUser } from "../features/userSlice";
import Message from "./Message";

function Thread() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const threadName = useSelector(SelectThreadName);
  const threadId = useSelector(selectThreadId);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (threadId) {
      db.collection("threads")
        .doc(threadId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [threadId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("threads").doc(threadId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });
    setInput("");
  };

  return (
    <div className="thread">
      <div className="thread__header">
        <div className="thread__header__contents">
          <Avatar src={messages[0]?.data?.photo} />
          <div className="thread__header__contents__info">
            <h4>{threadName}</h4>
          </div>
        </div>
        <IconButton>
          <MoreVert className="thread__header__details" />
        </IconButton>
      </div>

      <div className="thread__messages">
        {messages.map(({ id, data }) => (
          <Message key={id} data={data} />
        ))}
      </div>
      <div className="thread__input">
        <form>
          <input
            placeholder="Write a message..."
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <IconButton onClick={sendMessage} type="submit">
            <SendRounded />
          </IconButton>

          <IconButton>
            <TimerOutlined />
          </IconButton>

          <IconButton>
            <MicRounded />
          </IconButton>
        </form>
      </div>
    </div>
  );
}

export default Thread;
