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
exports.disableStorage = exports.deleteStorage = exports.updateStorage = exports.getAllStorage = exports.createStorage = void 0;
const db_1 = require("../../db");
const createStorage = (storage) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si name existe
    if (!storage.rag)
        throw new Error("missing parameter 'rag'");
    if (!storage.site)
        throw new Error("missing parameter 'site'");
    if (!storage.positions)
        throw new Error("missing parameter 'positions'");
    if (!storage.currentCapacity)
        throw new Error("missing parameter 'currentCapacity'");
    if (!storage.totalCapacity)
        throw new Error("missing parameter 'totalCapacity'");
    // Creamos el Storage
    const newStorage = yield db_1.Storage.create(Object.assign({}, storage));
    return newStorage.dataValues;
});
exports.createStorage = createStorage;
const getAllStorage = () => __awaiter(void 0, void 0, void 0, function* () {
    // Obtener todos los Storage y sus usuarios asociados
    const storages = yield db_1.Storage.findAll();
    // Retornamos todos los storages
    return storages;
});
exports.getAllStorage = getAllStorage;
const updateStorage = (storage) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si name existe
    if (!storage.id)
        throw new Error("missing parameter 'id'");
    if (!storage.rag)
        throw new Error("missing parameter 'rag'");
    if (!storage.site)
        throw new Error("missing parameter 'site'");
    if (!storage.positions)
        throw new Error("missing parameter 'positions'");
    if (!storage.currentCapacity)
        throw new Error("missing parameter 'currentCapacity'");
    if (!storage.totalCapacity)
        throw new Error("missing parameter 'totalCapacity'");
    // Obtenermos el storage
    const currentStorage = yield db_1.Storage.findOne({ where: { id: storage.id } });
    // Verificamso que exista el storage
    if (!currentStorage)
        throw new Error();
    // Actualizar el nombre del Storage si es necesario
    yield (currentStorage === null || currentStorage === void 0 ? void 0 : currentStorage.update(Object.assign({}, storage)));
    return currentStorage.dataValues;
});
exports.updateStorage = updateStorage;
const deleteStorage = (storageId) => __awaiter(void 0, void 0, void 0, function* () {
    const storage = yield db_1.Storage.findOne({ where: { id: storageId } });
    if (!storage)
        throw new Error("Product not found");
    yield storage.destroy();
});
exports.deleteStorage = deleteStorage;
const disableStorage = (storageId) => __awaiter(void 0, void 0, void 0, function* () {
    const storage = yield db_1.Storage.findOne({ where: { id: storageId } });
    // Verificar el storage
    if (!storage)
        throw new Error("Storage not found");
    // Habilitar o desabilitar
    if (storage.disabled) {
        yield storage.update({ disabled: false });
    }
    else {
        yield storage.update({ disabled: true });
    }
});
exports.disableStorage = disableStorage;
