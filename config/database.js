// Configures the Sequelize ORM and establishes connection to PostgreSQL.

const { Sequelize } = require('sequelize');

// Initialize Sequelize with PostgreSQL connection string from environment variables
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false, 
    ssl: false,
    dialectOptions: {
        ssl: {
            require: false,
            rejectUnauthorized: false 
        }
    }
});

// Function to test the database connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error; // Re-throw to be caught by the server.js startup logic
    }
};

module.exports = { sequelize, connectDB };
