require('dotenv').config();

const { Sequelize } = require('sequelize');

const {
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE_USERNAME
} = process.env;

const databaseConfig = new Sequelize({
    database: DATABASE_NAME,
    dialect: 'mysql',
    host: DATABASE_HOST,
    password: DATABASE_PASSWORD,
    port: DATABASE_PORT,
    username: DATABASE_USERNAME
});

databaseConfig.sync({ force: true });

module.exports = databaseConfig;
