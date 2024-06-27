const { faker } = require('@faker-js/faker');
const { Product } = require('../models');

const run = async () => {
  try {
    // Define the data to be inserted
    const productsData = [];
    for (let i = 0; i < 50; i += 1) {
      productsData.push({
        data_category: faker.commerce.productAdjective(),
        record_count: faker.number.int({ min: 1000, max: 9999 }),
        company_name: faker.company.name(),
        company_address: faker.location.streetAddress(true),
        company_website: faker.internet.url(),
      });
    }

    // Bulk insert into the Product table
    const insertedProducts = await Product.bulkCreate(productsData);
    console.log(
      `Bulk insert successful: ${insertedProducts.length} products inserted.`
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  run,
};
