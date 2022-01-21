const _ = require('lodash');
const faker = require('faker');
const JSSHA = require('jssha');
/*
 have to repeat function here cause getting error : "Instead change the require of
 /Users/daves/ra/projects/love-n-memes/utils/hash.mjs to a dynamic import() which
 is available in all CommonJS modules."
 Probably due to es5 / es6 syntax issues
 */
const getPasswordHash = (input) => {
  const shaObj = new JSSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(input);
  return shaObj.getHash('HEX');
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = 'Password123!';
    const passwordHash = getPasswordHash(password);
    const users = [];
    const userPurposes = [];
    /*
    creates a 1000 users with faker lib all with the same pw
    using the loop index as the id for each user so that i can
    create the through tables for purposes as well
    */
    for (let i = 1; i <= 1000; i += 1) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const userObj = {
        name: `${firstName} ${lastName}`,
        email: `${faker.internet.email(firstName, String(_.random(1000)))}`,
        password: passwordHash, // how
        location: 'Singapore',
        age: _.random(18, 50),
        bio: `${faker.random.words(5)}`,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const randNum = _.random(1, 2);
      for (let j = 1; j <= randNum; j += 1) {
        const purposeObj = {
          user_id: i,
          purpose_id: j,
          created_at: new Date(),
          updated_at: new Date(),
        };
        userPurposes.push(purposeObj);
      }

      users.push(userObj);
    }

    await queryInterface.bulkInsert('users', users);
    await queryInterface.bulkInsert('users_purposes', userPurposes);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('users_purposes', null, {});
  },
};
