"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = void 0;
const model = (sequelize, DataTypes) => {
    sequelize.define("Storage", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        rag: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        site: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        positions: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currentCapacity: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        totalCapacity: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        disabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, { updatedAt: false, timestamps: false });
};
exports.model = model;
