const MovieController = require('../controller/movie.controller')

module.exports= (app) => {
  app.post("/api/movie", MovieController.addNewMovie)
  app.get("/api/movie", MovieController.getAllMovies)
}