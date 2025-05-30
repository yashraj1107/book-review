// Defines the User model for Sequelize, representing the users table.

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true,     
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, 
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    // Sequelize options
    timestamps: true, // Adds createdAt and updatedAt fields
    tableName: 'users', // Explicitly set table name to lowercase plural
});

module.exports = User;
