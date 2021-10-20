'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dataSensorDevice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  dataSensorDevice.init({
    temperature: DataTypes.FLOAT,
    humidity: DataTypes.FLOAT,
    timeStamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'dataSensorDevice',
  });
  return dataSensorDevice;
};