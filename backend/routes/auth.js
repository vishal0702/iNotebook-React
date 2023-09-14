const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const JWT_SECRET = "secretkey@password";
//Create a User using: Post "/api/auth/createUser", Doesn't require auth
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Check whether user with same email is already presend in DB
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
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
      res.json({ authToken });
      // .then((user) => res.json(user)).catch(err => {console.log(err)
      // res.json({error : 'Duplicate email found! Please re-check.', message: err.message})})
      // res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
