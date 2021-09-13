const UserController = require('../controller/user.controller')

module.exports = (app) => {
  app.post("/api/register", UserController.register)
  app.post("/api/login", UserController.login)
  app.post("/api/logout", UserController.logout)
  // app.get("api/allUsers", UserController.getAllUsers)
}