const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Table = sequelize.define('Table', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    seats_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10
    } 
}, {
    tableName: 'table',
    timestamps: false,
})


module.exports = Table;