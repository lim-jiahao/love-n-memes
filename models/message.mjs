export default function initMessageModel(sequelize, DataTypes) {
  return sequelize.define('message', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    senderId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    matchId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'matches',
        key: 'id',
      },
    },
    body: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  }, { underscored: true });
}
