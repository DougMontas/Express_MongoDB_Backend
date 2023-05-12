const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@description Register user
//@route POST /api/users
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error(`All fields are required`);
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error(`Email already registered`);
  }
  //hashed password
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log('Hashed Password', hashedPassword + ' password', password)
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`User create ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Errro("User data is not valid");
  }

  res.json({ message: "Registered User" });
});

//@description Login user
//@route POST /api/users
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const user = await User.findOne({ email });
  // compare user & password
  if (user && (await bcrypt.compare(password, user.password))) {
    //jwt  payload
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  }else{
    res.status(401)
    throw new Error('Email or password is not valid')
  }
 
});

//@description Current user
//@route GET /api/users
//@access PRIVATE

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user)
});

module.exports = { registerUser, loginUser, currentUser };
