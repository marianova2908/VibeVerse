const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');  // Correctly import the controller

// Route to sign in a user
router.post('/auth/signin', authCtrl.signin);

// Route to sign out a user
router.post('/auth/signout', authCtrl.signout);

module.exports = router;  // Export the router with defined routes