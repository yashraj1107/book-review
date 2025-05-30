// Middleware to verify JWT tokens and attach user information to the request.

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model to check if user exists

const authMiddleware = async (req, res, next) => {
    // Get token from header
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1]; // Expected format: "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user ID from token payload to request object
        req.user = { id: decoded.userId };

        // Optional: Check if the user actually exists in the database
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(401).json({ msg: 'Token is valid but user does not exist' });
        }

        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Token expired' });
        }
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
