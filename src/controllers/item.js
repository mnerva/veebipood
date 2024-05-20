// connect to database
const sequelize = require('../../db');

sequelize
    .authenticate()
    .then(() => {
        console.log('conntected db')
    })
    .catch(error => {
        console.log(error)
    })

// read model data for table representation
const models = require('../../models')

// Import the OrderItem model (assuming it's defined)
const OrderItem = require('../../models/orderitem');

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
        const item = await Product.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.render('item', { item });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const addItemToCart = async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const { quantity } = req.body;

        // Create a new order item record in the orderItems table
        const orderItem = new OrderItem({
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