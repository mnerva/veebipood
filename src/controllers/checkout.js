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


       // Debug logging to check incoming request body and session data
       console.log('Request body:', req.body);
       console.log('Cart items:', cartItems);


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
           customerId: customer.id, // Assuming customer ID is available after saving customer
           totalPrice: totalPrice,
           status: 'finished' // Assuming the initial status of the order is 'pending'
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


// export controller functions
module.exports = {
   getAllChosenItems,
   processCheckout
};
