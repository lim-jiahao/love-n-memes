export default function initGenderModel(sequelize, DataTypes) {
  return sequelize.define('gender', {
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
  }, { underscored: true });
}
