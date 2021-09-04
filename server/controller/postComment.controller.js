const Post = require("../models/postComment.model");
const jwt = require("jsonwebtoken");

const addNewPost = async (req, res) => {
  const { body, params } = req;
  let newPost = new Post(body);
  const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true });
  newPost.user_id = decodedJwt.payload.id;
  console.log(params);
  newPost.movie_id = params.movieId
  console.log(newPost);
  try {
    newPost = await newPost.save()
    res.json(newPost)
  }
  catch (err) {
    res.status(400).json(err)
  }
};

const getAllMoviePosts = async (req, res) => {
  try {
    const allPosts = await Post.find({ movie_id: req.params.movieId }).populate({
      path: "movie_id",
      model: "Movie"
    }).populate(
      {
        path: "user_id",
        model: "User"
      }
    ).exec();
    res.json(allPosts);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find().populate({
      path: "movie_id",
      model: "Movie"
    }).populate(
      {
        path: "user_id",
        model: "User"
      }
    ).exec();
    res.json(allPosts);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateExistingComment = async (req, res) => {
  try {
    const updatedPosts = await Post.findOneAndUpdate({ _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
        context: 'query'
      })
    res.json(updatedPosts);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteExistingComment = async (req, res) => {
  try {
    const deletedPosts = await Post.deleteOne({ _id: req.params.id })
    res.json(deletedPosts);
  } catch (error) {
    res.status(400).json(error);
  }
};


module.exports = {
  addNewPost,
  getAllMoviePosts,
  getAllPosts,
  updateExistingComment,
  deleteExistingComment,
};

// .populate({path: "user_id",model: "User"}).exec()