const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const { body } = req
  const newUser = new User(body);
  let newUserObj;
  try {
    newUserObj = await newUser.save()
    res.json(newUserObj)
  }
  catch (err) {
    res.status(400).json(err)
  }
}

const login = async (req, res) => {
  const { body } = req
  let queriedUser;
  try {
    queriedUser = await User.findOne({ email: req.body.email })
  }
  catch (err) {
    res.status(400).json(err)
  }

  if (queriedUser == null) {
    res.json({ message: "Email is not registered" })
    return;
  }
  else {
    const passwordCheck = bcrypt.compareSync(body.password, queriedUser.password)
    if (!passwordCheck) {
      res.json({ message: "Email and password do not match" })
      return;
    }
    else {
      // res.send("Welcome")
      const userToken = jwt.sign({ id: queriedUser._id }, process.env.SECRET_KEY)
      res.cookie("userToken", userToken, process.env.SECRET_KEY, {
        httpOnly: true,
        expires: new Date(Date.now() + 900000)
      })
        .json({ message: "success" })
    }
  }
}

const logout = (req, res) => {
  res.clearCookie('userToken')
  res.json({ message: "logout successful" })
}

module.exports = {
  register,
  login,
  logout
}

