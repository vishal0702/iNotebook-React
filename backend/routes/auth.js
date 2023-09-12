const express = require('express');
const router = express.Router();
const User = require('../models/User')

//Create a User using: Post "/api/auth/", Doesn't require auth
router.post('/', (req, res) =>{
    const user = User(req.body);
    user.save();
    console.log(req.body);
    res.json(req.body);
})

module.exports = router;