// connect to database
const sequelize = require('../../db');
const models = require('../../models')
const OrderItem = require('../../models/orderitem');
const Item = require('../../models/item');

sequelize
    .authenticate()
    .then(() => {
        console.log('conntected db')
    })
    .catch(error => {
        console.log(error)
    })

// get all data from table
const getAllItems = (req, res) => {
    models.Item.findAll()
        .then(Item => {
            return res.status(200).json({ Item });
        })
        .catch(error => {
            return res.status(500).send(error.message);
        });
};

const getItemById = async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const item = await models.Item.findByPk(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const addItemToCart = async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const { quantity, orderId } = req.body;

        console.log('Received orderId:', orderId);

        const item = await models.Item.findByPk(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const orderItem = await models.OrderItem.create({
            itemId: itemId,
            quantity: quantity,
            orderId: orderId,
        });

        res.status(200).json({ message: 'Item added to cart successfully', orderItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = {
    getAllItems,
    getItemById,
    addItemToCart
};