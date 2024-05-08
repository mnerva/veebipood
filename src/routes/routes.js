const express = require('express');
const router = express.Router();
const path = require('path');

// Define routes
// router.get('/', (req, res) => {
//    res.send('Hello, World!');
//});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

router.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'checkout.html'));
});

router.get('/confirmation', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'confirmation.html'));
});

module.exports = router;