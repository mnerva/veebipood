const express = require('express');
const router = express.Router();
const path = require('path');

// Define routes
// router.get('/', (req, res) => {
//    res.send('Hello, World!');
//});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

router.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'checkout.html'));
});

router.get('/confirmation', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'confirmation.html'));
});

module.exports = router;