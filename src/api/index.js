const express = require('express');
const unsplash = require('./unsplash');
const recipe = require('./recipe');
const router = express.Router();

router.use('/unsplash', unsplash);
router.use('/edamam', recipe);

module.exports = router;
