const express = require('express');
const router = express.Router();
const path = require('path');
const checkoutController = require('../controllers/checkout')
const itemController = require('../controllers/item')

router.get('/items', itemController.getAllItems)
router.get('/item/:id', itemController.getItemById)
router.post('item/:id', itemController.addItemToCart)
router.get('/cart', checkoutController.getAllChosenItems)
router.post('/cart', checkoutController.processCheckout)

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