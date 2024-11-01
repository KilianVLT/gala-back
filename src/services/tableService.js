const Table = require('../models/Table')
const Booking = require('../models/Booking')
const BookingServ = require('../services/bookingService')

const sequelize = require('../db')


exports.newTable = async (req, res) => {
  let save; 
  try {
    let table = await Table.create({
      number: req.number,
      name: req.name,
    })

    save = await table.save() 
  } catch (error) {
    return error.message
  }

  return save 
}

exports.deleteTable = async (req, res) => {
  let table = await Table.findByPk(req.id)
  await BookingServ.deleteWithTableId(req.id)
  if(table)
    return await table.destroy()
  else
    return "error"
}

exports.loadTables = async () => {
    return await Table.findAll({
      order: [['number', 'ASC']]
    })
}

exports.loadAvailableTables = async () => {
    return await Table.findAll({
      include: [{
        model: Booking, // Association avec Booking
        as: "bookings",
        attributes: []  // Pas besoin des colonnes de Booking, juste la somme
      }],
      attributes: [
        'id', // On sélectionne l'ID des tables
        [sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.col('bookings.seats_booked')), 0), 'totalSeatsBooked'], // Utiliser COALESCE pour éviter NULL
        'number',
        'name',
        'seats_number'
      ],
      group: ['Table.id'], // On regroupe par ID de la table
      having: sequelize.literal('COALESCE(SUM(bookings.seats_booked), 0) <= 10'), // Filtrer sur la somme des places réservées 
      order: [["number", "ASC"]]
    })
}