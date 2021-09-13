const PostController = require("../controller/postComment.controller");
const { authenticate } = require("../middleware/jwt.middleware");

module.exports = (app) => {
  // These are both protected routes.
  // First, express gets the route. Then we add authenticate middleware BEFORE the controller. Then the controllers.
  // The request will not get to the controller is authenticate function fails
  app.post("/api/movie/post/:movieId", authenticate, PostController.addNewPost);
  app.get("/api/movie/post/:movieId", PostController.getAllMoviePosts);
  app.get("/api/movie/post", authenticate, PostController.getAllPosts);
  app.put("/api/movie/post/edit/:id", authenticate, PostController.updateExistingComment);
  app.delete("/api/movie/post/delete/:id", authenticate, PostController.deleteExistingComment);
};