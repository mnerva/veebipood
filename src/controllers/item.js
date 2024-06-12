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
        const { quantity } = req.body;

        const item = await models.Item.findByPk(itemId);
        console.log(item)
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const price = item.price;

        const orderItem = {
            id: item.id,
            quantity: parseInt(quantity),
            price: item.price
        }      

        // Add the order item to the session cart
        req.session.cart = req.session.cart || [];
        if(req.session.cart.length > 0) {
            req.session.cart.forEach(item => {
                if(item.id === orderItem.id){
                    item.quantity += 1
                } else {
                    req.session.cart.push(orderItem);
                }
            })
        }  else {
            req.session.cart.push(orderItem);
        }
        


        
        console.log(req.session.cart)

        let totalPrice = 0
        req.session.cart.forEach(item => {
            totalPrice += item.price * item.quantity
        });

        console.log(totalPrice)

        res.status(200).json({ message: 'Item added to cart successfully' });
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