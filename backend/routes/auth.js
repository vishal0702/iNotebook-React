const express = require('express');
const router = express.Router();


router.get('/', (req, res) =>{
    obj = {
        name : "Vishal"
    }

    res.json(obj);
})

module.exports = router;