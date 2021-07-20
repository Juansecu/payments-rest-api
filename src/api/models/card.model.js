const { DataTypes } = require('sequelize');

const databaseConfig = require('../../config/database.config');

const CardModel = databaseConfig.define(
    'Card',
    {
        cardId: {
            primaryKey: true,
            type: DataTypes.UUIDV4
        },
        cardNumber: {
            allowNull: false,
            type: DataTypes.STRING(16)
        },
        expirationMonth: {
            allowNull: false,
            type: DataTypes.STRING(2)
        },
        expirationYear: {
            allowNull: false,
            type: DataTypes.STRING(4)
        },
        customerId: {
            allowNull: false,
            type: DataTypes.UUIDV4
        }
    },
    {
        createdAt: 'created_at',
        tableName: 'cards',
        underscored: true,
        updatedAt: 'updated_at'
    }
);

CardModel.sync({ force: true });

module.exports = CardModel;
