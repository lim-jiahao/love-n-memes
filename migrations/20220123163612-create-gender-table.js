module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('genders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addColumn('users', 'gender_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'genders',
        key: 'id',
      },
    });

    await queryInterface.createTable('users_interests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      interest_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'genders',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users_interests');
    await queryInterface.removeColumn('users', 'gender_id');
    await queryInterface.dropTable('genders');
  },
};
