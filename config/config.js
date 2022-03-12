module.exports = {
  development: {
    username: process.env.USERNAME,
    password: null,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: 'postgres',
  },
};
