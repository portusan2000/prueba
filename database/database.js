const mongoose = require('mongoose');
const URI = process.env.URI;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(db => console.log('Database is connected'))
    .catch(err => console.error('No se pudo conectar a la base de datos', err))

module.exports = mongoose;