// Defines routes for review management: update and delete.

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const reviewController = require('../controllers/reviewController');

//Update your own review
router.put('/:id', authMiddleware, reviewController.updateReview);

//Delete your own review
router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;
