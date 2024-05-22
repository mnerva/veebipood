// connect to database
const sequelize = require('../../db');
const models = require('../../models')
const OrderItem = require('../../models/orderitem');

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
    models.OrderItem.findAll()
        .then(orderItems => {
            return res.status(200).json({ orderItems })
        })
        .catch(error => {
            return res.status(500).send(error.message)
        })
};

const getItemById = async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const item = await models.OrderItem.findByPk(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // If the item is found, send it as a response
        res.status(200).json({ item });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const addItemToCart = async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const { quantity } = req.body;

        const price = 0

        // Create a new order item record in the orderItems table
        const orderItem = await OrderItem.create({
            item_id: itemId,
            quantity: quantity,
            price: price
        });
        // Save the new order item record to the database
        await orderItem.save();

        // Add the order item to the session cart
        req.session.cart = req.session.cart || [];
        req.session.cart.push(orderItem);

        // Return a response confirming that the item has been successfully added to the cart
        res.status(200).json({ message: 'Item added to cart successfully' });

    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// export controller functions
module.exports = {
    getAllItems,
    getItemById,
    addItemToCart
}