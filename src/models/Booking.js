const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Table = require('./Table')
const Person = require('./Person')

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    seats_booked: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    table_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Table,
            key: 'id'
        }
    }
}, {
    tableName: 'booking',
    timestamps: false,
})


Booking.belongsTo(Person, { foreignKey: "person_id", as: "person" })
Booking.belongsTo(Table, { foreignKey: "table_id", as: "table" })
Table.hasMany(Booking, { foreignKey: 'table_id', as: "bookings"})

module.exports = Booking