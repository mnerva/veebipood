const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./src/routes/routes');
const Sequelize = require('sequelize');
const port = process.env.PORT || 3000;

require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Use express-session middleware
app.use(session({
    secret: 'secretsecret', // Change this to a secure secret key
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

module.exports = app;

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
