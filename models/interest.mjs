export default function initInterestModel(sequelize, DataTypes) {
  return sequelize.define('interest', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
    tableName: 'genders',
  });
}
