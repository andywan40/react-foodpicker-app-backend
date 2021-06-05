const express = require('express');
const unsplash = require('./unsplash');
const router = express.Router();


router.use('/unsplash', unsplash);

module.exports = router;
