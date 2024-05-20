'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderItem.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'item', // Name of the referenced model (assuming it's named 'Item')
        key: 'id' // Name of the referenced key in the referenced model
      },
      primaryKey: true
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};