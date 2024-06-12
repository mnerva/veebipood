'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        as: 'customer'
      });

      this.belongsToMany(models.Item, {
        foreignKey: 'orderId',
        through: 'OrderItems',
      })
    }
  }
  Order.init({
    totalPrice: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customers',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};