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

    queryInterface.bulkInsert('purposes', purposes);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('purposes', null);
  },
};
