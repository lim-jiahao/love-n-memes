export default function initSwipeModel(sequelize, DataTypes) {
  return sequelize.define('swipe', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    swiperId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    swipeeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    swipedRight: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  }, { underscored: true });
}
