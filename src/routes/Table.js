const TableService = require('../services/tableService');

const express = require('express');

app = express.Router()

app.use(express.json());

app.get('/load', async (req, res) => {
    let tables = await TableService.loadAvailableTables()
    
    res.json(JSON.stringify(tables))
})

app.post('/new', async (req, res) => {
    let table = await TableService.newTable(req.body)
    res.json(JSON.stringify(table))
})

app.get('/delete/:id', async (req, res) => {
    await TableService.deleteTable(req.params)
    try {
        res.json({destroy: true})  
    } catch (error) {
        res.json({destroy: false, err: error.message})  
    }
})

module.exports = app;