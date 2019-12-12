const express = require('express');
const router = express.Router();
const mongo = require('../../database/mongo_db');
const validation = require('../../utils/validator');
var ExpressBrute = require('express-brute');

var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store, {
    freeRetries: 5,
    minWait: 1 * 60 * 1000,
    maxWait: 60 * 60 * 1000
});

router.post('/login', bruteforce.prevent, (req, res) => {
    const payload = {
        mobile: req.body.mobile,
        password: req.body.password
    };

    const loginValidation = validation.sellerLogin(req.body);
    if (Object.keys(loginValidation).length !== 0) {
        res.status(400).json(loginValidation);
    } else {
        mongo.authentication('user', payload)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(401).json(err));
    }
});

module.exports = router;