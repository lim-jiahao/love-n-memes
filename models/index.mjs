import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';

// import models
import initUserModel from './user.mjs';
import initMessageModel from './message.mjs';
import initMatchModel from './match.mjs';
import initPurposeModel from './purpose.mjs';
import initSwipeModel from './swipe.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // break apart the Heroku database url and rebuild the configs we need

  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// init models
db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Match = initMatchModel(sequelize, Sequelize.DataTypes);
db.Message = initMessageModel(sequelize, Sequelize.DataTypes);
db.Purpose = initPurposeModel(sequelize, Sequelize.DataTypes);
db.Swipe = initSwipeModel(sequelize, Sequelize.DataTypes);

// define user-purpose relationship
db.Purpose.belongsToMany(db.User, { through: 'users_purposes' });
db.User.belongsToMany(db.Purpose, { through: 'users_purposes' });

// define user-swipe relationship
db.User.hasMany(db.Swipe, {
  as: 'swipedOn',
  foreignKey: 'swiper_id',
});

db.User.hasMany(db.Swipe, {
  as: 'swipedBy',
  foreignKey: 'swipee_id',
});

db.Swipe.belongsTo(db.User, {
  as: 'swiper',
  foreignKey: 'swiper_id',
});

db.Swipe.belongsTo(db.User, {
  as: 'swipee',
  foreignKey: 'swipee_id',
});

// define user-match relationship
db.User.hasMany(db.Match, {
  as: 'matchedOn',
  foreignKey: 'matcher_id',
});

db.User.hasMany(db.Match, {
  as: 'matchedBy',
  foreignKey: 'matchee_id',
});

db.Match.belongsTo(db.User, {
  as: 'matcher',
  foreignKey: 'matcher_id',
});

db.Match.belongsTo(db.User, {
  as: 'matchee',
  foreignKey: 'matchee_id',
});

// define user-message relationship
db.Message.belongsTo(db.User);
db.User.hasMany(db.Message);

// define match-message relationship
db.Message.belongsTo(db.Match);
db.Match.hasMany(db.Message);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
