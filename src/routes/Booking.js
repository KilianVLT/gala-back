const Mail = require('nodemailer/lib/mailer');
const BookingService = require('../services/bookingService');
const Mailer = require('../services/mailer');

const express = require('express');

app = express.Router()

app.use(express.json());

app.post('/new', async (req, res) => {
    let booking = await BookingService.newBooking(req.body)
    res.json(booking)
})

app.get('/load', async (req, res) => {
    let bookings = await BookingService.findBookings()
    res.json(bookings)
})

app.get('/delete/:id', async (req, res) => {
    await BookingService.deleteWithPersonId(req.params)
    try {
        res.json({destroy: true})  
    } catch (error) {
        res.json({destroy: false, err: error.message})  
    }
})

app.get('/by-table/:id', async (req, res) => {
    let bookings = await BookingService.findByTableId(req.params)
    res.json(bookings)
})

app.get('/by-person/:id', async (req, res) => {
    let bookings = await BookingService.findByPersonId(req.params)
    res.json(bookings)
})

app.post('/update/:id', async (req, res) => {
    let booking = await BookingService.updateBooking(req)
    res.json(booking)
})

app.post('/mail', async (req, res) => {
    let status = await Mailer.sendMail(req.body)
    return res.json(status);
})


module.exports = app