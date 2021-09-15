import React from "react";
import TypingAnimation from "../TypingAnimation/TypingAnimation";
import userImage from '../../../images/User.png'
import "./TypingMessage.css";

const TypingMessage = ({ user }) => {
  return (
    <div className="message-item">
      <div className="message-avatar-container">
        {console.log(user.picture)}
        <img
          src={userImage}
          alt={user.name}
          className={"message-avatar"}
        ></img>
      </div>

      <TypingAnimation></TypingAnimation>
    </div>
  );
};

export default TypingMessage;
