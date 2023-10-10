const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "secretkey@password";
//Route-1: Create a User using: Post "/api/auth/createUser", no login required
router.post(
  "/createUser",
  [
    body("name", "Name must contain atleast 3 characters!").isLength({
      min: 3,
    }),
    body("email", "Please enter a valid email! ").isEmail(),
    body("password", "Password must contain atleast 5 characters!").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success= false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      //Check whether user with same email is already presend in DB
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          errors: "Sorry! A user already exists with the same email.",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success, authToken });
      // .then((user) => res.json(user)).catch(err => {console.log(err)
      // res.json({error : 'Duplicate email found! Please re-check.', message: err.message})})
      // res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route-2: Authenticate a User using: Post "/api/auth/login", no login required
router.post(
  "/login",
  [
    body("email", "Please enter a valid email! ").isEmail(),
    body("password", "Password should not blank! ").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    const { email, password } = req.body;
    
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({success, error: "Invalid Credentials!" });
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(400).json({success, error: "Invalid Credentials!" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success= true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route-3: Get logged in User details using: Post "/api/auth/getUser", Login required
router.post("/getUser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
