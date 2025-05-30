// Handles logic for book-related operations: add, get all, get by ID, search.

const { Op } = require('sequelize'); 
const Book = require('../models/Book');
const Review = require('../models/Review');
const User = require('../models/User');

// Add a new book
exports.addBook = async (req, res) => {
    const { title, author, genre, publicationYear, description } = req.body;

    // Basic validation
    if (!title || !author) {
        return res.status(400).json({ msg: 'Please provide book title and author' });
    }

    try {
        const newBook = await Book.create({
            title,
            author,
            genre,
            publicationYear,
            description,
        });
        res.status(201).json(newBook);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all books with pagination and optional filters (by title, author, genre)
exports.getAllBooks = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const { title, author, genre } = req.query; 

    let whereClause = {};
    if (title) {
        whereClause.title = { [Op.iLike]: `%${title}%` }; 
    }
    if (author) {
        whereClause.author = { [Op.iLike]: `%${author}%` }; 
    }
    if (genre) {
        whereClause.genre = { [Op.iLike]: `%${genre}%` }; 
    }

    try {
        const { count, rows: books } = await Book.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [['title', 'ASC']], // Order by title alphabetically
        });

        res.json({
            totalBooks: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            books,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get book details by ID, including average rating and paginated reviews
exports.getBookById = async (req, res) => {
    const bookId = req.params.id;
    const reviewPage = parseInt(req.query.reviewPage) || 1;
    const reviewLimit = parseInt(req.query.reviewLimit) || 5;
    const reviewOffset = (reviewPage - 1) * reviewLimit;

    try {
        const book = await Book.findByPk(bookId);

        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        // Calculate average rating
        const reviews = await Review.findAll({
            where: { bookId },
            attributes: ['rating'],
        });

        let averageRating = 0;
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            averageRating = (totalRating / reviews.length).toFixed(1); 
        }

        // Get paginated reviews for the book
        const { count: totalReviews, rows: paginatedReviews } = await Review.findAndCountAll({
            where: { bookId },
            limit: reviewLimit,
            offset: reviewOffset,
            include: [{
                model: User,
                attributes: ['id', 'username'], 
            }],
            order: [['createdAt', 'DESC']], 
        });

        res.json({
            book,
            averageRating: parseFloat(averageRating), 
            reviews: {
                totalReviews,
                currentPage: reviewPage,
                totalPages: Math.ceil(totalReviews / reviewLimit),
                data: paginatedReviews,
            },
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Search books by title or author (partial and case-insensitive)
exports.searchBooks = async (req, res) => {
    const query = req.query.q; // The search term

    if (!query) {
        return res.status(400).json({ msg: 'Please provide a search query (q)' });
    }

    try {
        const books = await Book.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${query}%` } },
                    { author: { [Op.iLike]: `%${query}%` } },
                ],
            },
            order: [['title', 'ASC']], // Order results by title
        });

        res.json(books);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
