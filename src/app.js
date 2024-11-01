const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('./db')
const Table = require('./models/Table')
const Person = require('./models/Person')
const Booking = require('./models/Booking')
const PersonRoutes = require('./routes/Person')
const TableRoutes = require('./routes/Table')
const BookingRoutes = require('./routes/Booking')

//const routes = require('./routes')

Table.hasMany(Booking, { foreignKey: 'table_id' });
Booking.belongsTo(Table, { foreignKey: 'table_id' });

sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/person', PersonRoutes)
app.use('/table', TableRoutes)
app.use('/booking', BookingRoutes)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

module.exports = app