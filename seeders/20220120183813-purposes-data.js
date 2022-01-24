module.exports = {
  up: async (queryInterface, Sequelize) => {
    const purposes = [
      {
        name: 'Love',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Friendship',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const genders = [
      {
        name: 'Male',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Female',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('purposes', purposes);
    await queryInterface.bulkInsert('genders', genders);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('purposes', null);
    await queryInterface.bulkDelete('genders', null);
  },
};
