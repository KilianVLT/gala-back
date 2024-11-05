const TableService = require('../services/tableService');

const express = require('express');
const {verifyToken} = require('../auth');


app = express.Router()

app.use(express.json());

app.get('/load',  verifyToken, async (req, res) => {
    let tables = await TableService.loadAvailableTables()
    
    res.json(JSON.stringify(tables))
})

app.post('/new',  verifyToken, async (req, res) => {
    let table = await TableService.newTable(req.body)
    res.json(JSON.stringify(table))
})

app.get('/delete/:id',  verifyToken, async (req, res) => {
    await TableService.deleteTable(req.params)
    try {
        res.json({destroy: true})  
    } catch (error) {
        res.json({destroy: false, err: error.message})  
    }
})

module.exports = app;