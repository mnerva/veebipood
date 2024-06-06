'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
 class OrderItem extends Model {
   static associate(models) {
     this.belongsTo(models.Order, {
       foreignKey: 'orderId',
     });
     this.belongsTo(models.Item, {
       foreignKey: 'itemId',
     });
   }
 }
  OrderItem.init({
    orderId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};