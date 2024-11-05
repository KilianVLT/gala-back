const Booking = require('..//models/Booking')
const Person = require('..//models/Person')
const Table = require('..//models/Table')


exports.newBooking = async (req, res) => {
    let person = await Person.findByPk(req.person_id)

    if (person) {
        let booking = await Booking.create({
            seats_booked: person?.role === "USER" ? parseInt(person.seats_remaining) : 10,
            person_id: req.person_id,
            table_id: req.table_id
        })

        person.seats_remaining -= person.role === "USER" ? person.seats_remaining : 10

        await person.save()
        let save = booking.save()

        return save
    }

    return "Pas d'utilisateur trouvé"

}

exports.updateBooking = async (req) => {
    try {
        let booking = await Booking.findByPk(req.params.id);
        booking.table_id = req.body.table_id;
        
        booking.save();
        return booking;
    } catch (error) {
        throw new Error("La modification n'a pas pu avoir lieu : " + error.message);
    }

}

exports.deleteBooking = async (booking_id) => {
    return await Booking.destroy({ where: { id: booking_id } })
}

exports.deleteWithTableId = async (id) => {
    let bookings = await Booking.findAll({
        where: {
            table_id: id
        }
    })

    for (let booking of bookings) {
        await this.deleteWithPersonId({ id: booking.person_id })
    }

    return "destroy ok"
}

exports.deleteWithPersonId = async (params) => {
    let user = await Person.findByPk(params.id)
    let booking = await Booking.findOne({
        where: {
            person_id: params.id
        }
    })

    user.seats_remaining = booking.seats_booked
    user.save()

    return await this.deleteBooking(booking.id)
}

exports.findBookings = async (req, res) => {
    return await Booking.findAll({
        include: [{
            model: Person,
            as: "person",
            attributes: [
                'id',
                'role',
                'first_name',
                'last_name',
                'email'
            ]
        }, {
            model: Table,
            as: "table",
            attributes: [
                'id',
                'number',
                'name'
            ]
        }],
        attributes: [
            'id',
            'seats_booked'
        ]
    })
}

exports.findByTableId = async (req, res) => {
    
    return await Booking.findAll({
        attributes: ["id"],
        include: [{
            model: Person,
            as: "person",
            attributes: [
                "first_name",
                "last_name"
            ]
        }],
        where: {
            table_id: req.id
        }
    })
}

exports.findByPersonId = async (req, res) => {
    return await Booking.findAll({
        include: [{
            model: Table,
            as: "table",
            attributes: [
                'number',
                'name'
            ]
        }],
        where: {
            person_id: req.id
        }
    })
}