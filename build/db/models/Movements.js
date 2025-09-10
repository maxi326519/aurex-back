"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = void 0;
const model = (sequelize, DataTypes) => {
    sequelize.define("Movements", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM("ENTRADA", "SALIDA"),
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, { updatedAt: false, timestamps: false });
};
exports.model = model;
