const Movie = require('../models/movie.models')

const addNewMovie = async (req, res) => {
  const { body } = req;
  let newMovie = new Movie(body);
  try {
    newMovie = await newMovie.save()
    res.json(newMovie)
  }
  catch (err) {
    res.status(400).json(err)
  }
};

const getAllMovies = async (req, res) => {
  try {
    const allMovie = await Movie.find()
    res.json(allMovie)
  }
  catch (err) {
    res.status(400).json(err)
  }
}

const updateExistingMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findOneAndUpdate({ _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
        context: 'query'
      })
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  addNewMovie,
  getAllMovies,
  updateExistingMovie,
};