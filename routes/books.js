// Defines routes for book management: add, get all, get by ID, search.

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); 
const bookController = require('../controllers/bookController');
const reviewController = require('../controllers/reviewController'); 

//Add a new book
router.post('/', authMiddleware, bookController.addBook);

//Get all books with pagination and optional filters (by title, author, genre)
router.get('/', bookController.getAllBooks);

// Get book details by ID, including average rating and paginated reviews
router.get('/:id', bookController.getBookById);

// Submit a review for a book
router.post('/:id/reviews', authMiddleware, reviewController.submitReview);

// Search books by title or author
router.get('/search', bookController.searchBooks); 
module.exports = router;
