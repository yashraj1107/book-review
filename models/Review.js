// Defines the Review model for Sequelize, representing the reviews table.
// Also defines associations with User and Book models.

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User'); 
const Book = require('./Book'); 
const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,    
        primaryKey: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1, 
            max: 5, 
        },
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true, 
    },
    
    bookId: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: Book,
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    timestamps: true, 
    tableName: 'reviews',
    indexes: [
        {
            unique: true,
            fields: ['bookId', 'userId'],
        }
    ]
});

// A Review belongs to one User
Review.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
// A Review belongs to one Book
Review.belongsTo(Book, { foreignKey: 'bookId', onDelete: 'CASCADE' });

// A User can have many Reviews
User.hasMany(Review, { foreignKey: 'userId' });
// A Book can have many Reviews
Book.hasMany(Review, { foreignKey: 'bookId' });

module.exports = Review;
