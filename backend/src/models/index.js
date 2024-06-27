const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.database);
const db = {};

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach((file) => {
    // eslint-disable-next-line security/detect-non-literal-require, import/no-dynamic-require, global-require
    const modelDef = require(path.join(__dirname, file))(sequelize, DataTypes);
    const modelName = modelDef.name;
    db[modelName] = modelDef;
  });

// Optional: Add associations (if your models have relationships)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export sequelize and db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
