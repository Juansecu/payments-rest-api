const { DataTypes } = require('sequelize');
const uuid = require('uuid').v4;

const databaseConfig = require('../../config/database.config');

const CustomerModel = databaseConfig.define(
    'Customer',
    {
        customerId: {
            primaryKey: true,
            type: DataTypes.UUIDV4
        },
        firstName: {
            allowNull: false,
            type: DataTypes.STRING(45)
        },
        lastName: {
            allowNull: false,
            type: DataTypes.STRING(45)
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING(75)
        },
        address1: {
            allowNull: false,
            type: DataTypes.STRING(125)
        },
        address2: DataTypes.STRING(125),
        locality: {
            allowNull: false,
            type: DataTypes.STRING(25)
        },
        administrativeArea: {
            allowNull: false,
            type: DataTypes.STRING(4)
        },
        postalCode: {
            allowNull: false,
            type: DataTypes.STRING(7)
        },
        phoneNumber: {
            allowNull: false,
            type: DataTypes.STRING(15)
        },
        city: {
            allowNull: false,
            type: DataTypes.STRING(25)
        },
        country: {
            allowNull: false,
            type: DataTypes.STRING(25)
        }
    },
    {
        createdAt: 'created_at',
        tableName: 'customers',
        underscored: true,
        updatedAt: 'updated_at'
    }
);

CustomerModel.sync({ force: true });

module.exports = CustomerModel;
