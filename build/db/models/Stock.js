"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = void 0;
const model = (sequelize, DataTypes) => {
    sequelize.define("Stock", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        enabled: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isFull: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, { updatedAt: false, timestamps: false });
};
exports.model = model;
