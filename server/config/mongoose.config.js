const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
mongoose.set('runValidators', true)
mongoose.connect('mongodb://localhost/movieReview', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => console.log("Established a connection to the database"))
.catch(err => console.log("Something went wrong when connecting to the database", err))