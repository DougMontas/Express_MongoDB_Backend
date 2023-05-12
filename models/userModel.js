const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, `Please add user name`],
    },
    email: {
      type: String,
      required: [true, `Please add user email`],
      unique: [true, `User email already exsist`],
    },
    phone: {
      type: Number,
      // required: [true, `Please provide user phone number`],
    },
    password: {
      type: String,
      required: [true, `Please provide user password`],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema)
