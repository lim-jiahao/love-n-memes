module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'age_min', {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 18,
    });

    await queryInterface.addColumn('users', 'age_max', {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 100,
    });

    await queryInterface.addColumn('users', 'swipe_everywhere', {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'age_min');
    await queryInterface.removeColumn('users', 'age_max');
    await queryInterface.removeColumn('users', 'swipe_everywhere');
  },
};
