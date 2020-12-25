import React from "react";
import "../styles/Telegram.css";
import Sidebar from "./Sidebar";
import Thread from "./Thread";

function Telegram() {
  return (
    <div className="telegram">
      <Sidebar />
      <Thread />
    </div>
  );
}

export default Telegram;
