export default function initUserModel(sequelize, DataTypes) {
  return sequelize.define('user', {
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
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    age: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    bio: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    genderId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'genders',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, { underscored: true });
}
