require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const http = require("http");
// const socketIo = require("socket.io");
// const { addUser, removeUser, getUsersInRoom } = require("./chat/users");
// const { addMessage, getMessagesInRoom } = require("./chat/messages");
// const socket = require('socket.io');

require('./config/mongoose.config')
app.use(cookieParser())
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json(), express.urlencoded({ extended: true}))

require('./routes/movie.routes')
  (app)

require('./routes/user.routes')
  (app)

require('./routes/postComment.routes')
  (app)

require('./routes/rating.routes')
  (app)

// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });
// const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
// const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";
// const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";
// const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
// const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";

// io.on("connection", (socket) => {
//   console.log(`${socket.id} connected`);

//   // Join a conversation
//   const { roomId, name, picture, userId } = socket.handshake.query;
//   socket.join(roomId);

//   const user = addUser(socket.id, roomId, )
//   io.in(roomId).emit(USER_JOIN_CHAT_EVENT, user, name, picture, userId);
//   // addUser(socket.id, roomId, name, picture, userId);
//   // Listen for new messages
//   socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
//     const message = addMessage(roomId, data);
//     io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, message);
//   });

//   // Listen typing events
//   socket.on(START_TYPING_MESSAGE_EVENT, (data) => {
//     io.in(roomId).emit(START_TYPING_MESSAGE_EVENT, data);
//   });
//   socket.on(STOP_TYPING_MESSAGE_EVENT, (data) => {
//     io.in(roomId).emit(STOP_TYPING_MESSAGE_EVENT, data);
//   });

//   // Leave the room if the user closes the socket
//   socket.on("disconnect", () => {
//     removeUser(socket.id);
//     // log('user has left')
//     io.in(roomId).emit(USER_LEAVE_CHAT_EVENT, user);
//     socket.leave(roomId);
//   });
// });

app.listen(process.env.PORT, () => {
    console.log("express is fired up on", process.env.PORT);
});

  
  // app.get("/rooms/:roomId/users", (req, res) => {
  //   const users = getUsersInRoom(req.params.roomId);
  //   return res.json({ users });
  // });
  
  // app.get("/rooms/:roomId/messages", (req, res) => {
  //   const messages = getMessagesInRoom(req.params.roomId);
  //   return res.json({ messages });
  // });
  


