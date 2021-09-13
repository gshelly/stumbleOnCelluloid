const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "All stumboloids must have a first name"],
    minlength: [3, "stumboloid's First Name must have at least 3 characters."],
  },
  email: {
    type: String,
    required: [true, "All stumboloids must have an email"],
    minlength: [3, "The minimum length for a stumboloids email is 3"],
    unique: true,
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email"
    }
  },
  password: {
    type: String,
    required: [true, "All stumboloids must have a password"],
    minlength: [8, "Password must be 8 characters or longer"]
  }
 
}, { timestamps: true });



UserSchema.plugin(uniqueValidator, { message: 'Email id is already existing' });

UserSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
});


// this should go after 
UserSchema.pre('save', function (next) {
  bcrypt
    .hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});

module.exports = mongoose.model('User', UserSchema);