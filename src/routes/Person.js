const PersonService = require('../services/personService');
require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const {verifyToken} = require('../auth');



app = express.Router()

app.use(express.json());

app.post('/log-in', async (req, res) => {
    let user = await PersonService.checkLogs(req.body)
    if(user){
        res.status(200).json({
            id: user.id,
            seats_remaining: user.seats_remaining,
            role: user.role,
            first_name: user.first_name,
            last_name: user.last_name,
            mail: user.email,
            token: jwt.sign(
                { userId: user.id },
                process.env.KEYCRYPT,
                {expiresIn: '1h'}
            )
        })
    }else{
        res.status(401).json({ error: 'Identifiants incorrects !' });
    }
})

app.get('/get-seats',  verifyToken, async (req, res) => {
    let seats = await PersonService.getSeatsRemaining()
    res.json(seats);
})

module.exports = app;