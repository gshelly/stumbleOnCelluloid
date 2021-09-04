const Rating = require("../models/rating.models");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')

const addNewRating = async (req, res) => {
  const { body, params } = req;
  let newRating = new Rating(body);
  const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true });
  newRating.user_id = decodedJwt.payload.id;
  newRating.movie_id = params.movieId
  newRating.rating = body.rating

  try {
    newRating = await newRating.save()
    res.json(newRating)
  }
  catch (err) {
    res.status(400).json(err)
  }
};

const getUserMovieRating = async (req, res) => {
  try {
    const movieRating = await Rating.find({ movie_id: req.params.movieId }).populate({
      path: "movie_id",
      model: "Movie"
    }).populate(
      {
        path: "user_id",
        model: "User"
      }
    ).exec();
    console.log(movieRating);
    res.json(movieRating);
  } catch (error) {
    res.status(400).json(error);
  }
};


const updateExistingRating = async (req, res) => {
  const { body, params } = req;

  try {
    console.log(req.body.id);
    const updateRating = await Rating.findOneAndUpdate({ _id: params.id },
      req.body,
      {
        new: true,
        runValidators: true,
        context: 'query',
        upsert: true
      })
    res.json(updateRating);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getMovieAverageRating = async (req, res) => {
  let average = await Rating.aggregate([
    { $match: { movie_id: new mongoose.Types.ObjectId(req.params.movieId) } },
    { $group: { _id: null, sumOfRatings: { $sum: '$rating' }, count: { $sum: 1 } } },
  ]).exec();
  // let average = getAverage()
  console.log("average", average);


  let sumOfRatings = average.length > 0 ? Number(average[0].sumOfRatings) : 0
  let averageofRatings = average.length > 0 ? sumOfRatings / average[0].count : sumOfRatings

  console.log(averageofRatings)
  try {

    const updateRating = await Rating.updateMany({ movie_id: req.params.movieId },
      { $set: { movieAvgRating: Math.ceil(averageofRatings * 10) / 10 } },
      {
        upsert: true,
        new: false,
      })
    res.json(updateRating);
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = {
  addNewRating,
  getUserMovieRating,
  updateExistingRating,
  getMovieAverageRating,
};
