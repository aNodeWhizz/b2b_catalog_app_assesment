// eslint-disable-next-line no-unused-vars
const sqlite = require('sqlite3');
const models = require('./models');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { productSeeder, userSeeder } = require('./seeds');

let server;

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

// Database connection happens here
models.sequelize
  .sync({ force: true }) // Added force: true to drop tables everytime and not persisting inside the sqlite database
  .then(async () => {
    logger.info('Connected to database');
    // Run the seeders to populate the data inside the table
    await userSeeder.run();
    await productSeeder.run();
    server = app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  })
  .catch((err) => {
    logger.error(err);
    exitHandler();
  });

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
