"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = void 0;
const model = (sequelize, DataTypes) => {
    sequelize.define("Reception", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        state: {
            type: DataTypes.ENUM("Pendiente", "Aprobado", "En revisión", "Completado"),
            allowNull: false,
        },
        sheetFile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        remittance: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { updatedAt: false, timestamps: false });
};
exports.model = model;
