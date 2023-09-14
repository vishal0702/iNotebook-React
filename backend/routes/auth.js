const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

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
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      // .then((user) => res.json(user)).catch(err => {console.log(err)
      // res.json({error : 'Duplicate email found! Please re-check.', message: err.message})})
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
