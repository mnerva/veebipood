// connect to database
const sequelize = require('../../db');

// Import the models from the models directory
const { OrderItem, Order, Customer, Item } = require('../../models');

// get all data from table
const getAllChosenItems = (req, res) => {
    try {
        const cartItems = req.session.cart || [];
        console.log(cartItems);
        res.json(cartItems);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const processCheckout = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const cartItems = req.session.cart || [];

        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Calculate total price
        let totalPrice = 0;
        for (const cartItem of cartItems) {
            totalPrice += cartItem.price * cartItem.quantity;
        }
        console.log(totalPrice);

        // Create a customer record
        const customer = await Customer.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        }, { transaction });

        // Create an order record
        const order = await Order.create({
            customerId: customer.id,
            totalPrice: totalPrice,
            status: 'finished'
        }, { transaction });

        // Save each cart item as an order item associated with the order
        for (const cartItem of cartItems) {
            await OrderItem.create({
                orderId: order.id,
                itemId: cartItem.itemId,
                quantity: cartItem.quantity,
                price: cartItem.price,
            }, { transaction });
        }

        // Commit the transaction
        await transaction.commit();

        // Clear the session cart after successful checkout
        req.session.cart = [];

        // Return a success message to the client
        res.status(200).json({ message: 'Checkout successful', orderId: order.id });

    } catch (error) {
        // Rollback the transaction in case of error
        await transaction.rollback();

        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const updateOrderStatus = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const orderId = req.body.orderId;

        // Find the order by ID
        const order = await Order.findByPk(orderId);
        console.log(order)
        console.log(orderId)
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update the status of the order
        order.status = 'finished';
        await order.save({ transaction });

        // Commit the transaction
        await transaction.commit();

        // Return a success message
        res.status(200).json({ message: 'Order status updated to finished' });

    } catch (error) {
        // Rollback the transaction in case of error
        await transaction.rollback();

        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// export controller functions
module.exports = {
    getAllChosenItems,
    processCheckout,
    updateOrderStatus
};
