const mongoose = require('mongoose')

const RatingSchema = new mongoose.Schema({
  rating: {
    type: Number
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  },
  movieAvgRating: {
    type: Number,
    default: 0
  }
},
  { timestamps: true }
)

module.exports = mongoose.model('Rating', RatingSchema);