"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = void 0;
const model = (sequelize, DataTypes) => {
    sequelize.define("OrderItem", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    }, { updatedAt: false, timestamps: false });
};
exports.model = model;
