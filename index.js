const status = process.env.NODE_ENV;

if (status !== 'production') {
    require('dotenv').config();
}
console.log('SERVER STATUS:', status);

// Declarations
const express = require('express');
const port = process.env.PORT || 5000;
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('./database/database');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/usuarios', require('./routes/usuario.route'));
app.use('/login', require('./routes/login.route'));

// Server listening
app.listen(port, () => console.log('Server listening on port:', port));