const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
  movieTitle: {
    type: String,
    required: [true, "Movie Title is must"],
  },
  movieDescription: {
    type: String,
    required: [true, "Movie Description is must"],
  },
  movieQuestion: {
    type: String,
    required: [true, "Movie Question is must"],
  },
  rating: {
      type: Number
  },
}, { timestamps: true });


module.exports = mongoose.model('Movie', MovieSchema);





