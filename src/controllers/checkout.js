// connect to database
const sequelize = require('../../db');
// read model data for table representation
const models = require('../../models')

// Import the OrderItem model (assuming it's defined)
const OrderItem = require('../../models/orderitem');
// Import the Order model (assuming it's defined)
const Order = require('../../models/order');
// Import the Customer model (assuming it's defined)
const Customer = require('../../models/customer');
// Import the Item model (assuming it's defined)
// const Item = require('../../models/item');

// get all data from table
const getAllChosenItems = (req, res) => {
    try {
        const cartItems = req.session.cart || [];
        res.json(cartItems);
        
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const processCheckout = async (req, res, next) => {
    try {
        const cartItems = req.session.cart || [];

        // Calculate total price
        let totalPrice = 0;
        for (const cartItem of cartItems) {
            totalPrice += cartItem.price * cartItem.quantity;
        }

        // Create a customer record
        const customer = new Customer({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        });

        // Save the customer record to the database
        const savedCustomer = await customer.save();

        // Create an order record
        const order = new Order({
            customer_id: req.user.id, // Assuming you have user authentication and user ID is available in req.user.id
            totalPrice: totalPrice,
            date: new Date(),
            status: 'pending' // Assuming the initial status of the order is 'pending'
        });

        // Save the order record to the database
        const savedOrder = await order.save();

        // Save each cart item as an order item associated with the order
        for (const cartItem of cartItems) {
            const orderItem = new OrderItem({
                order_id: savedOrder._id,
                item_id: cartItem.item_id,
                quantity: cartItem.quantity,
                price: cartItem.price,
            });
            await orderItem.save();
        }

        // Clear the session cart after successful checkout
        req.session.cart = [];

        // Return a success message to the client
        res.status(200).json({ message: 'Checkout successful', orderId: savedOrder._id });
        
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// export controller functions
module.exports = {
    getAllChosenItems,
    processCheckout
}