require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
// const socket = require('socket.io');

require('./config/mongoose.config')
app.use(cookieParser())
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json(), express.urlencoded({ extended: true }))

require('./routes/movie.routes')
  (app)

require('./routes/user.routes')
  (app)

require('./routes/postComment.routes')
  (app)

require('./routes/rating.routes')
  (app)

app.listen(process.env.PORT, () => {
  console.log("express is fired up on", process.env.PORT);
});