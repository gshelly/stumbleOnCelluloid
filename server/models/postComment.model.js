const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "text is required"]
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }
},
  { timestamps: true }
)

module.exports = mongoose.model('Comment', CommentSchema);