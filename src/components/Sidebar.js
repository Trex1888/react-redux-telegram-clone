import React, { useEffect, useState } from "react";
import "../styles/Sidebar.css";
import {
  Add,
  PhoneOutlined,
  QuestionAnswerOutlined,
  Search,
  Settings,
} from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";
import SidebarThread from "./SidebarThread";
import db, { auth } from "../firebase";

function Sidebar() {
  const [thread, setThread] = useState([]);

  useEffect(() => {
    db.collection("threads").onSnapshot((snapshot) =>
      setThread(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const addThread = () => {
    const threadName = prompt("Enter a thread name.");
    if (threadName) {
      db.collection("threads").add({
        threadName: threadName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__search">
          <Search className="sidebar__searchIcon" />
          <input placeholder="Search" className="sidebar__input" />
        </div>
        <IconButton onClick={addThread} variant="outlined" id="sidebar__button">
          <Add />
        </IconButton>
      </div>
      <div className="sidebar__threads">
        {thread.map(({ id, data: { threadName } }) => (
          <SidebarThread key={id} id={id} threadName={threadName} />
        ))}
      </div>
      <div className="sidebar__bottom">
        <Avatar
          className="sidebar__bottom__avatar"
          onClick={() => auth.signOut()}
        />
        <IconButton>
          <PhoneOutlined />
        </IconButton>
        <IconButton>
          <QuestionAnswerOutlined />
        </IconButton>
        <IconButton>
          <Settings />
        </IconButton>
      </div>
    </div>
  );
}

export default Sidebar;
