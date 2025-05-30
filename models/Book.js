// Defines the Book model for Sequelize, representing the books table.

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    publicationYear: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        validate: {
            isInt: true,
            min: 0, 
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    tableName: 'books', // Explicitly set table name to lowercase plural
});

module.exports = Book;
