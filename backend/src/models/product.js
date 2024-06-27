const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  const ProductSchema = sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      data_category: {
        type: DataTypes.STRING,
      },
      record_count: {
        type: DataTypes.INTEGER,
      },
      company_name: {
        type: DataTypes.STRING,
      },
      company_address: {
        type: DataTypes.STRING,
      },
      company_website: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return ProductSchema;
};
