// Handles logic for review-related operations: submit, update, delete.

const Review = require('../models/Review');
const Book = require('../models/Book');
const User = require('../models/User');

//Submit a review for a book
exports.submitReview = async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user.id; // From authMiddleware
    const { rating, comment } = req.body;

    // Basic validation
    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ msg: 'Rating is required and must be between 1 and 5' });
    }

    try {
        // Check if book exists
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        // Check if user has already reviewed this book
        const existingReview = await Review.findOne({
            where: { bookId, userId },
        });

        if (existingReview) {
            return res.status(400).json({ msg: 'You have already submitted a review for this book' });
        }

        // Create the review
        const newReview = await Review.create({
            bookId,
            userId,
            rating,
            comment,
        });

        res.status(201).json(newReview);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

//Update your own review
exports.updateReview = async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user.id;
    const { rating, comment } = req.body;

    // At least one field must be provided for update
    if (rating === undefined && comment === undefined) {
        return res.status(400).json({ msg: 'Please provide rating or comment to update' });
    }

    // Validate rating if provided
    if (rating !== undefined && (rating < 1 || rating > 5)) {
        return res.status(400).json({ msg: 'Rating must be between 1 and 5' });
    }

    try {
        const review = await Review.findByPk(reviewId);

        if (!review) {
            return res.status(404).json({ msg: 'Review not found' });
        }

        // Ensure the user is the owner of the review
        if (review.userId !== userId) {
            return res.status(403).json({ msg: 'Not authorized to update this review' });
        }

        // Update fields if provided
        if (rating !== undefined) {
            review.rating = rating;
        }
        if (comment !== undefined) {
            review.comment = comment;
        }

        await review.save();

        res.json({ msg: 'Review updated successfully', review });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

//Delete your own review
exports.deleteReview = async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user.id; 

    try {
        const review = await Review.findByPk(reviewId);

        if (!review) {
            return res.status(404).json({ msg: 'Review not found' });
        }

        // Ensure the user is the owner of the review
        if (review.userId !== userId) {
            return res.status(403).json({ msg: 'Not authorized to delete this review' });
        }

        await review.destroy();

        res.json({ msg: 'Review deleted successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
