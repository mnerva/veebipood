const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const itemRoutes = require('./src/routes/itemRoutes');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', itemRoutes);

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
