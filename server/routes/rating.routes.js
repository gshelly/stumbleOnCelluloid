const RatingController = require("../controller/rating.controller");
const { authenticate } = require("../middleware/jwt.middleware");

module.exports = (app) => {
  // These are both protected routes.
  // First, express gets the route. Then we add authenticate middleware BEFORE the controller. Then the controllers.
  // The request will not get to the controller is authenticate function fails
  app.post("/api/movie/rating/:movieId", authenticate, RatingController.addNewRating);
  app.get("/api/movie/rating/:movieId", authenticate, RatingController.getUserMovieRating);
  app.put("/api/movie/rating/edit/:id", authenticate, RatingController.updateExistingRating);
  app.put("/api/movie/rating/avg/:movieId", authenticate, RatingController.getMovieAverageRating);
};