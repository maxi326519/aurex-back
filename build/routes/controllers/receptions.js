"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReception = exports.updateReception = exports.getAllReceptions = exports.createReception = void 0;
const db_1 = require("../../db");
const createReception = (data, productsFile, recipeFile, UserId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check parameters
    if (!data.date)
        throw new Error("missing parameter date");
    if (!data.state)
        throw new Error("missing parameter state");
    if (!UserId)
        throw new Error("UserId  not found");
    // Create Reception
    const newReception = yield db_1.Reception.create({
        date: data.date,
        state: data.state,
        sheetFile: productsFile.path,
        remittance: recipeFile.path,
    });
    // Bind to User
    newReception.setUser(UserId);
    return newReception.dataValues;
});
exports.createReception = createReception;
const getAllReceptions = (state) => __awaiter(void 0, void 0, void 0, function* () {
    const where = {};
    if (state)
        where.state = state;
    // Obtener todos los Receptions y sus usuarios asociados
    const receptions = yield db_1.Reception.findAll({ where });
    // Retornamos todos los receptions
    return receptions;
});
exports.getAllReceptions = getAllReceptions;
const updateReception = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificamos los parametros
    if (!data.date)
        throw new Error("Missing parameter name");
    if (!data.state)
        throw new Error("Missing parameter name");
    // Obtenermos el reception
    const currentReception = yield db_1.Reception.findByPk(data.id);
    // Verificamos que exista el reception
    if (!currentReception)
        throw new Error();
    // Actualizar el nombre del Reception si es necesario
    yield (currentReception === null || currentReception === void 0 ? void 0 : currentReception.update(Object.assign({}, data)));
    return currentReception.dataValues;
});
exports.updateReception = updateReception;
const deleteReception = (receptionId) => __awaiter(void 0, void 0, void 0, function* () {
    const reception = yield db_1.Reception.findOne({ where: { id: receptionId } });
    if (!reception)
        throw new Error("Reception not found");
    yield reception.destroy();
});
exports.deleteReception = deleteReception;
