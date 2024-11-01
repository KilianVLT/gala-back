const Person = require('../models/Person')

exports.getPeople = async () => {
    return await Person.findAll()
}

exports.getSeatsRemaining = async (id) => {
    return await Person.findByPk(id, {attributes: "seats_remaining"})
}

exports.checkLogs = async (logs) => {
    return await Person.findOne({ where: { username: logs.id, password: logs.pswd } })
    
}