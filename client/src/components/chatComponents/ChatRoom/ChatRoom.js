import React, { useEffect, useState } from "react";
import '../../../styles/MoviePage.css'
import "./ChatRoom.css";
import useChat from "../useChat";
import ChatMessage from "../ChatMessage/ChatMessage";
import useTyping from "../useTyping";
import NewMessageForm from "../NewMessageForm/NewMessageForm";
import TypingMessage from "../TypingMessage/TypingMessage";
// import Users from "../Users/Users";
import UserAvatar from "../UserAvatar/UserAvatar";
import {Grid, Paper } from "@material-ui/core";
import background from "../../../images/InceptionBackground1.jpg"
// import queryString from "query-string"

const ChatRoom = (props) => {
  const roomId  = "chatRoom"
  const {
    messages,
    user,
    users,
    typingUsers,
    sendMessage,
    startTypingMessage,
    stopTypingMessage,
  } = useChat(roomId, props.user);

  const [newMessage, setNewMessage] = useState("");

  const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    cancelTyping();
    sendMessage(newMessage);
    setNewMessage("");
  };

  useEffect(() => {
    if (isTyping) startTypingMessage();
    else stopTypingMessage();
  }, [isTyping]);

  return (
    <div style={{backgroundImage:`url(${background})`, backgroundSize:"cover", padding: "70px 0px", height:"100vh"}}>
    <Paper className="display-chat-layout">
      <Grid container wrap="nowrap" spacing={2}>
      <div className="chat-room-top-bar">
        <p className="room-name">Discussion Topic: {props.movieQuestion}</p>
        {user && <UserAvatar user={user}></UserAvatar>}
      </div>
      {/* <Grid item>
      <h1 className="room-name">Discussion Topic: {props.movieQuestion}</h1>
        {user && <UserAvatar user={user}></UserAvatar>}
        </Grid> */}
      </Grid>
      
      {/* <Users users={users}></Users> */}
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li key={i}>
              <ChatMessage message={message}></ChatMessage>
            </li>
          ))}
          {typingUsers.map((user, i) => (
            <li key={messages.length + i}>
              <TypingMessage user={user}></TypingMessage>
            </li>
          ))}
        </ol>
      </div>
      <NewMessageForm
        newMessage={newMessage}
        handleNewMessageChange={handleNewMessageChange}
        handleStartTyping={startTyping}
        handleStopTyping={stopTyping}
        handleSendMessage={handleSendMessage}
      ></NewMessageForm>
    </Paper>
    </div>
  );
};

export default ChatRoom;
