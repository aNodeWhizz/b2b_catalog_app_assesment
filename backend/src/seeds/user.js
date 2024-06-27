const bcrypt = require('bcrypt');
const { User } = require('../models');

const run = async () => {
  try {
    // Define the data to be inserted
    const userData = [
      {
        username: 'admin',
        password: 'Admin@321',
      },
      {
        username: 'tester',
        password: 'Test@123',
      },
    ];

    const hashedUserData = await Promise.all(
      userData.map(async (ele) => {
        const passwordHash = await bcrypt.hash(ele.password, 10);
        return {
          username: ele.username,
          passwordHash,
        };
      })
    );

    // Bulk insert into the Product table
    const insertedUsers = await User.bulkCreate(hashedUserData);
    console.log(
      `Bulk insert successful: ${insertedUsers.length} users inserted.`
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  run,
};
