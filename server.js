//server.js
// Main application entry point for the Book Review API.
// Sets up Express, connects to the database, and mounts routes.

require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { sequelize } = require('./config/database'); // Import Sequelize instance and connection
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const reviewRoutes = require('./routes/reviews');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes); // Reviews routes are nested under /api/reviews for direct access (e.g., update/delete)

// Basic route for testing server status
app.get('/', (req, res) => {
    res.send('Book Review API is running!');
});

// Error handling middleware (optional, but good practice for centralized error handling)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Synchronize Sequelize models with the database and start the server
sequelize.sync({ alter: true }) // `alter: true` will update tables to match models, useful for development.
                               // In production, consider using migrations.
    .then(() => {
        console.log('Database synchronized successfully.');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database or synchronize models:', err);
        process.exit(1); // Exit the process if database connection fails
    });